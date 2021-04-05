import axios from 'axios';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { getHeader } from '../../api';
import { ADD_FRIEND, DELETE_FRIEND, EDIT_FRIEND, GET_FRIEND } from '../actions';
import { closeModal } from '../dashboard/actions';
import { addFriendError, addFriendSuccess, deleteFriendError, deleteFriendSuccess, editFriendError, editFriendSuccess, getFriendError, getFriendSuccess, selectFriend } from './actions';

export function* watchGetFriends() {
	yield takeEvery(GET_FRIEND, getFriend);
}

function* getFriend() {
	try {
		const friendListResponse = yield axios.get('/friend', getHeader())
		console.log('friendListResponse : ', friendListResponse)
		const {
			data: { friends }
		} = friendListResponse
		yield put(getFriendSuccess(friends));
	} catch (error) {
		const message =
			(error.response && error.response.data.message) || 'Something went wrong!';
		console.log('error while login:', error);
		yield put(getFriendError(message));
	}
}

export function* watchAddFriends() {
	yield takeEvery(ADD_FRIEND, addFriend);
}

function* addFriend({ payload }) {
	const {
		friend: {
			name,
			email,
			dob,
		}
	} = payload
	try {
		console.log(`inside addFriend, ${JSON.stringify({
			name,
			email,
			dob,
		})}`)
		const addFriendResponse = yield axios.post('/friend', {
			name,
			email,
			dob,
		}, getHeader())
		console.log('addFriendResponse : ', addFriendResponse)
		const {
			data: {
				friend
			}
		} = addFriendResponse
		console.log('addFriendResponse : ', friend)
		yield put(addFriendSuccess(friend));
		yield put(closeModal());
	} catch (error) {
		const message =
			(error.response && error.response.data.message) || 'Something went wrong!';
		console.log('error while add friend:', error);
		yield put(addFriendError(message));
	}
}

export function* watchDeleteFriends() {
	yield takeEvery(DELETE_FRIEND, deleteFriend);
}

function* deleteFriend({ payload }) {
	const {
		id
	} = payload
	try {
		const addFriendResponse = yield axios.delete(`/friend/${id}`, getHeader())
		console.log('delete friend:', addFriendResponse.data)
		yield put(deleteFriendSuccess(id));
	} catch (error) {
		const message =
			(error.response && error.response.data.message) || 'Something went wrong!';
		console.log('error while delete friend:', error);
		yield put(deleteFriendError(message));
	}
}

export function* watchEditFriend() {
	yield takeEvery(EDIT_FRIEND, updateFriend);
}

function* updateFriend({ payload }) {
	const {
		id,
		friend: {
			name, email, dob
		}
	} = payload
	try {
		const editFriendResponse = yield axios.post(`/friend/${id}`, {
			name, email, dob
		}, getHeader())
		console.log('edit friend:', editFriendResponse.data)
		yield put(editFriendSuccess({ name, email, dob }, id));
		yield put(closeModal());
		yield put(selectFriend(undefined));
	} catch (error) {
		const message =
			(error.response && error.response.data.message) || 'Something went wrong!';
		console.log('error while delete friend:', error);
		yield put(editFriendError(message));
	}
}
export default function* rootSaga() {
	yield all([
		fork(watchGetFriends),
		fork(watchAddFriends),
		fork(watchDeleteFriends),
		fork(watchEditFriend),
	]);
}
