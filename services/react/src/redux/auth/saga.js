import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { getHeader } from '../../api';
import { LOGIN_USER, LOGOUT_USER } from '../actions';
import { loginUserError, loginUserSuccess } from './actions';

export function* watchLoginUser() {
	yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

function* loginWithEmailPassword({ payload }) {
	const { user: { token,
		email,
		userName,
		imageUrl }, history } = payload;
	try {
		const loginResponse = yield axios.post('/login', {
			email: email,
			googleToken: token,
			imageUrl: imageUrl,
			name: userName
		}, getHeader())
		console.log('loginResponse : ', loginResponse)
		const {
			data
		} = loginResponse
		const {
			token: backToken,
			email: newEmail,
			imageUrl: newimageUrl,
			name: newname,
		} = data
		localStorage.setItem('back_token', backToken);
		localStorage.setItem('token', token);
		localStorage.setItem('email', newEmail);
		localStorage.setItem('name', newname);
		localStorage.setItem('image_url', newimageUrl)
		yield put(loginUserSuccess({ token, email, userName, imageUrl }));
		history.push('/');
	} catch (error) {
		const message =
			(error.response && error.response.data.message) || 'Something went wrong!';
		console.log('error while login:', error);
		yield put(loginUserError(message));
	}
}

export function* watchLogoutUser() {
	yield takeEvery(LOGOUT_USER, logout);
}

function logout({ payload }) {
	const { history } = payload;
	try {
		localStorage.clear();
		history.push('/auth');
	} catch (error) { }
}

export default function* rootSaga() {
	yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
