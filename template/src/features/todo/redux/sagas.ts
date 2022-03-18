import {takeLatest} from 'redux-saga/effects';

/* ------------- Types ------------- */
import {
  todoAuthLogin,
  todoAuthLogout,
  todoAuthRegister,
  todoAuthMe,
} from './slices/todoAuthSlice';
/* ------------- Sagas ------------- */
import {
  todoAuthLoginSaga,
  todoAuthLogoutSaga,
  todoAuthMeSaga,
  todoAuthRegisterSaga,
} from './saga/todoAuthSaga';
/* ------------- Connect Types To Sagas ------------- */

const sagas = [
  takeLatest(todoAuthLogin, todoAuthLoginSaga),
  takeLatest(todoAuthLogout, todoAuthLogoutSaga),
  takeLatest(todoAuthRegister, todoAuthRegisterSaga),
  takeLatest(todoAuthMe, todoAuthMeSaga),
]

export default sagas