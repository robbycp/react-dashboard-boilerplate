import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */
import {appStartCheck} from 'app/redux/slices/appSlice';
import {authCheck} from 'app/redux/slices/authSlice';
/* ------------- Sagas ------------- */
import {appStartCheckSaga} from 'app/redux/sagas/appSaga';
import {authCheckSaga} from 'app/redux/sagas/authSaga';
/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(appStartCheck, appStartCheckSaga),
    takeLatest(authCheck, authCheckSaga),
  ]);
}
