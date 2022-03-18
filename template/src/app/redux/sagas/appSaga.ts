import {RootContextName, RootContext} from 'app/redux/rootContext';
import {getContext, put, take} from 'redux-saga/effects';

import { appStartCheckFailed, appStartCheckSuccess } from '../slices/appSlice';
import { authCheck, authCheckSuccess } from '../slices/authSlice';

export function* appStartCheckSaga() {
  try {
    const conextConstant: RootContext[RootContextName.CONSTANT] = yield getContext(
      RootContextName.CONSTANT,
    );
    console.log('app start conextConstant', conextConstant)
    yield put(authCheck())
    yield take(authCheckSuccess().type)
    yield put(appStartCheckSuccess())
  } catch (error) {
    put(appStartCheckFailed())
  }
}
