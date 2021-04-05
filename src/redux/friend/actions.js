import { ADD_FRIEND, ADD_FRIEND_SUCCESS, ADD_FRIEND_ERROR, GET_FRIEND, GET_FRIEND_SUCCESS, GET_FRIEND_ERROR, DELETE_FRIEND, DELETE_FRIEND_SUCCESS, DELETE_FRIEND_ERROR, SELECT_FRIEND, EDIT_FRIEND, EDIT_FRIEND_SUCCESS, EDIT_FRIEND_ERROR } from '../actions';

export const getFriend = () => ({
	type: GET_FRIEND,
	payload: {},
});
export const getFriendSuccess = (friendList) => ({
	type: GET_FRIEND_SUCCESS,
	payload: { friendList },
});
export const getFriendError = (error) => ({
	type: GET_FRIEND_ERROR,
	payload: { error },
});
export const addFriend = (friend) => ({
	type: ADD_FRIEND,
	payload: { friend },
});
export const addFriendSuccess = (friend) => ({
	type: ADD_FRIEND_SUCCESS,
	payload: { friend },
});
export const addFriendError = (text) => ({
	type: ADD_FRIEND_ERROR,
	payload: { text },
});
export const deleteFriend = (id) => ({
	type: DELETE_FRIEND,
	payload: { id },
});
export const deleteFriendSuccess = (id) => ({
	type: DELETE_FRIEND_SUCCESS,
	payload: { id },
});
export const deleteFriendError = (text) => ({
	type: DELETE_FRIEND_ERROR,
	payload: { text },
});
export const editFriend = (friend, id) => ({
	type: EDIT_FRIEND,
	payload: { friend, id },
});
export const editFriendSuccess = (friend, id) => ({
	type: EDIT_FRIEND_SUCCESS,
	payload: { friend, id },
});
export const editFriendError = (text) => ({
	type: EDIT_FRIEND_ERROR,
	payload: { text },
});
export const selectFriend = (friend) => ({
	type: SELECT_FRIEND,
	payload: friend,
});