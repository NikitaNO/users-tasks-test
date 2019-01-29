import { call, takeEvery, put } from 'redux-saga/effects';
import {
  GET_USERS_PENDING,
  GET_USERS_FULFILLED,
  GET_USERS_REJECTED,
} from '../modules/users';
import { listUsers } from '../../services/users';

export function* watchUsers() {
  yield takeEvery(GET_USERS_PENDING, function* () {
    try {
      const userList = yield call(listUsers);

      yield put({
        type: GET_USERS_FULFILLED,
        payload: userList
      });
    } catch (err) {
      yield put({
        type: GET_USERS_REJECTED
      });
    }
  });
}
