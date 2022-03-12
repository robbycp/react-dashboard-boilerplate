import { getCurrentUser } from 'app/lib/firebase-auth';
import type { User } from 'firebase/auth';
import { call, delay, put } from 'redux-saga/effects';

import { authCheckSuccess, authCheckFailed, authUserSet } from '../slices/authSlice';

export function* authCheckSaga() {
  try {
    yield delay(2000)
    const user: User = yield call(getCurrentUser)

    if (user?.uid) {
      yield put(authUserSet({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
      }))
    }
    yield put(authCheckSuccess());
  } catch (error) {
    yield put(authCheckFailed())
  }
}
