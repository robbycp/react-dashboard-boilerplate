import {combineReducers} from 'redux';

import appReducer from './slices/appSlice'
import authReducer from './slices/authSlice'
import snackbarReducer from './slices/snackbarSlice'

import counterReducer from 'features/counter/counterSlice';
import todoReducers from 'features/todo/redux/reducers';

const rootReducers = combineReducers({
  ...todoReducers,
  app: appReducer,
  auth: authReducer,
  counter: counterReducer,
  snackbar: snackbarReducer,
})

export default rootReducers;
