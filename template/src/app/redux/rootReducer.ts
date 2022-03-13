import {combineReducers} from 'redux';

import counterReducer from 'features/counter/counterSlice';
import appReducer from './slices/appSlice'
import authReducer from './slices/authSlice'
import snackbarReducer from './slices/snackbarSlice'

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  counter: counterReducer,
  snackbar: snackbarReducer,
})

export default rootReducers;
