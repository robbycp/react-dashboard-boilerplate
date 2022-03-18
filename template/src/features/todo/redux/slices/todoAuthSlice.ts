import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/redux';
import type { TodoUser } from '../../apiTodo'

export interface TodoAuthState {
  me: {
    data?: TodoUser;
    isAuthenticated: boolean;
    status: StatusLoad;
  }
  statusLogin: StatusLoad;
  statusRegister: StatusLoad;
}
export interface TodoUserRegister {
  name: string,
  email: string,
  age: number,
  password: string,
}

const initialState: TodoAuthState = {
  me: {
    data: undefined,
    isAuthenticated: false,
    status: 'idle',
  },
  statusLogin: 'idle',
  statusRegister: 'idle',
};

export const authSlice = createSlice({
  name: 'todoAuth',
  initialState,
  reducers: {
    todoAuthSet: (state, action: PayloadAction<TodoUser>) => {
      state.me.data = action.payload
      state.me.isAuthenticated = !!action.payload
    },
    todoAuthRegister: (state, action: PayloadAction<TodoUserRegister>) => {
      state.statusRegister = 'loading'
    },
    todoAuthRegisterFailed: (state) => {
      state.statusRegister = 'failed'
    },
    todoAuthRegisterSuccess: (state) => {
      state.statusRegister = 'idle'
    },
    todoAuthLogin: (state, action: PayloadAction<{ email: string, password: string }>) => {
      state.statusLogin = 'loading'
    },
    todoAuthLoginFailed: (state) => {
      state.statusLogin = 'failed'
    },
    todoAuthLoginSuccess: (state) => {
      state.statusLogin = 'idle'
    },
    todoAuthLogout: (state) => {
      state.statusLogin = 'loading'
    },
    todoAuthLogoutFailed: (state) => {
      state.statusLogin = 'failed'
    },
    todoAuthLogoutSuccess: (state) => {
      state.statusLogin = 'idle'
      state.me.data = undefined
      state.me.isAuthenticated = false
    },
    todoAuthMe: (state) => {
      state.me.status = 'loading'
    },
    todoAuthMeFailed: (state) => {
      state.me.status = 'failed'
      state.me.data = undefined
      state.me.isAuthenticated = false
    },
    todoAuthMeSuccess: (state) => {
      state.me.status = 'idle'
    },
  },
});

export const {
  todoAuthSet,
  todoAuthRegister,
  todoAuthRegisterFailed,
  todoAuthRegisterSuccess,
  todoAuthLogin,
  todoAuthLoginFailed,
  todoAuthLoginSuccess,
  todoAuthLogout,
  todoAuthLogoutFailed,
  todoAuthLogoutSuccess,
  todoAuthMe,
  todoAuthMeFailed,
  todoAuthMeSuccess,
} = authSlice.actions;

/** Selector function */
export const selectTodoAuthState = (state: RootState) => ({
  isAuthenticated: state.todoAuth.me.isAuthenticated,
  status: state.todoAuth.me.status,
});
export const selectTodoAuthLoginState = (state: RootState) => state.todoAuth.statusLogin
export const selectTodoAuthRegisterState = (state: RootState) => state.todoAuth.statusRegister

export default authSlice.reducer;
