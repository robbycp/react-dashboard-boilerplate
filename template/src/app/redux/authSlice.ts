import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { signinGoogle, signoutGoogle } from 'app/lib/firebase-auth';
import { RootState } from 'app/store';

export interface AuthUser {
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
    return response;
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
    authUserSet: (state, action: PayloadAction<{ user: AuthUser, isAuth: boolean }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuth;
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
      .addCase(authSigninGoogle.fulfilled, (state, payload) => {
        state.status = 'idle';
      })
      .addCase(authSignoutGoogle.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const { authUserSet } = authSlice.actions;

export const selectAuthState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

export default authSlice.reducer;
