import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */
import {appStartCheck} from 'app/redux/slices/appSlice';
import {authCheck} from 'app/redux/slices/authSlice';
/* ------------- Sagas ------------- */
import {appStartCheckSaga} from 'app/redux/sagas/appSaga';
import {authCheckSaga} from 'app/redux/sagas/authSaga';
/* ------------- Feature Sagas ------------- */
import todoSagas from 'features/todo/redux/sagas'
/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    ...todoSagas,
    takeLatest(appStartCheck, appStartCheckSaga),
    takeLatest(authCheck, authCheckSaga),
  ]);
}
