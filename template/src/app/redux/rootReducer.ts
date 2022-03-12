import {combineReducers} from 'redux';

import counterReducer from 'features/counter/counterSlice';
import appReducer from './slices/appSlice'
import authReducer from './slices/authSlice'

const rootReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  counter: counterReducer,
})

export default rootReducers;
