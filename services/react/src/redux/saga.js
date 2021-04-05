import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import friendSagas from './friend/saga';

export default function* rootSaga() {
	yield all([
		authSagas(),
		friendSagas()
	]);
}
