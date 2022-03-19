import { call, fork, getContext, put } from 'redux-saga/effects';

import type { TodoUser } from 'features/todo/services/apiTodo';

import {
  todoAuthRegisterFailed,
  todoAuthRegisterSuccess,
  todoAuthLoginFailed,
  todoAuthLoginSuccess,
  todoAuthLogoutFailed,
  todoAuthLogoutSuccess,
  todoAuthMeFailed,
  todoAuthMeSuccess,
  todoAuthLogout,
  todoAuthSet,
} from '../slices/todoAuthSlice';
import type { TodoUserRegister } from '../slices/todoAuthSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootContext } from 'app/redux/rootContext';
import { ContextNameTodo } from '../contexts';

export function* todoAuthRegisterSaga(action: PayloadAction<TodoUserRegister>) {
  try {
    const apiTodo: RootContext[ContextNameTodo.API_TODO] = yield getContext(ContextNameTodo.API_TODO);
    const data = JSON.stringify(action.payload)
    console.log('data', data)
    const user = yield call(apiTodo.todoUserRegister, { data })
    console.log('user', user)
    yield fork(todoAuthStoreSaga, user.data)
    console.log('success store')
    yield put(todoAuthRegisterSuccess());
  } catch (error) {
    console.log('error', error)
    yield put(todoAuthRegisterFailed())
  }
}

export function* todoAuthLoginSaga(action: PayloadAction<{ email: string, password: string }>) {
  try {
    const apiTodo: RootContext[ContextNameTodo.API_TODO] = yield getContext(ContextNameTodo.API_TODO);
    const user = yield call(apiTodo.todoUserLogin, { data: JSON.stringify(action.payload) })
    console.log('user', user)
    yield fork(todoAuthStoreSaga, user.data)
    console.log('success store')
    yield put(todoAuthLoginSuccess());
  } catch (error) {
    yield put(todoAuthLoginFailed())
  }
}

export function* todoAuthLogoutSaga() {
  try {
    const apiTodo: RootContext[ContextNameTodo.API_TODO] = yield getContext(ContextNameTodo.API_TODO);
    yield call(apiTodo.todoUserLogout)
    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, '{}')
    yield put(todoAuthLogoutSuccess());
  } catch (error) {
    yield put(todoAuthLogoutFailed())
  }
}

export function* todoAuthMeSaga() {
  try {
    const apiTodo: RootContext[ContextNameTodo.API_TODO] = yield getContext(ContextNameTodo.API_TODO);
    const user = yield call(apiTodo.todoUserMe)
    if (user) {
      yield fork(todoAuthStoreSaga, {
        user: user.data
      })
      yield put(todoAuthMeSuccess());
    } else {
      yield put(todoAuthLogout())
    }
  } catch (error) {
    yield put(todoAuthMeFailed())
  }
}

export function* todoAuthStoreSaga(data: { user: TodoUser, token?: string }) {
  try {
    if (data.token) {
      console.log('start todoAuthStoreSagar', process.env.REACT_APP_TOKEN_KEY)
      const tokensString = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
      console.log('tokensString', tokensString)
      const tokens = JSON.parse(tokensString) || {}
      console.log('tokens', tokens)
      const storedTokens = JSON.stringify({
        ...tokens,
        todo: data.token,
      })
      console.log('storedTokens', storedTokens)
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, storedTokens)
      console.log('success store')
    }
    yield put(todoAuthSet(data.user))
    console.log('todo auth set')
  } catch (error) {
    console.error(error)
  }
}
