import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signinGoogle, signoutGoogle } from 'app/lib/firebase-auth';
import { RootState } from 'app/redux';

export interface AuthUser {
  uid: string,
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string
}
export interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
  user?: AuthUser;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  user: undefined,
};

export const authSigninGoogle = createAsyncThunk(
  'auth/signinGoogle',
  async () => {
    const response = await signinGoogle();
    return {
      uid: response.user.uid,
      displayName: response.user.displayName,
      email: response.user.email,
      emailVerified: response.user.emailVerified,
      photoURL: response.user.photoURL,
    }
  },
);

export const authSignoutGoogle = createAsyncThunk(
  'auth/signoutGoogle',
  async () => {
    await signoutGoogle();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.status = 'loading'
    },
    authCheckFailed: (state) => {
      state.status = 'failed'
    },
    authCheckSuccess: (state) => {
      state.status = 'idle'
    },
    authUserSet: (state, action: PayloadAction<AuthUser>) => {
      const user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified,
        photoURL: action.payload.photoURL,
      }
      state.user = user?.uid ? user : undefined;
      state.isAuthenticated = !!user?.uid;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSigninGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authSignoutGoogle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authSigninGoogle.fulfilled, (state, action) => {
        state.status = 'idle';
        const user = action.payload?.uid ? {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          email: action.payload.email,
          emailVerified: action.payload.emailVerified,
          photoURL: action.payload.photoURL,
        } : undefined
        state.isAuthenticated = !!user
        state.user = user
      })
      .addCase(authSignoutGoogle.fulfilled, (state) => {
        state.status = 'idle';
        state.user = undefined
        state.isAuthenticated = false
      });
  },
});

export const {
  authCheck,
  authCheckFailed,
  authCheckSuccess,
  authUserSet,
} = authSlice.actions;

/** Selector function */
export const selectAuthState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

export default authSlice.reducer;
