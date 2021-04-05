import {
	GET_FRIEND, GET_FRIEND_SUCCESS,
	GET_FRIEND_ERROR,
	ADD_FRIEND,
	ADD_FRIEND_SUCCESS,
	ADD_FRIEND_ERROR,
	DELETE_FRIEND,
	DELETE_FRIEND_SUCCESS,
	DELETE_FRIEND_ERROR,
	EDIT_FRIEND,
	EDIT_FRIEND_SUCCESS,
	EDIT_FRIEND_ERROR,
	SELECT_FRIEND,
	BULK_ADD_FRIEND,
	BULK_ADD_FRIEND_SUCCESS,
	BULK_ADD_FRIEND_ERROR
} from '../actions';

const INIT_STATE = {
	loading: false,
	friendList: [],
	error: undefined,
	addFriendLoading: false,
	actionLoader: undefined,
	selectedFriend: undefined
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_FRIEND:
			return { ...state, loading: true };
		case GET_FRIEND_SUCCESS:
			return {
				...state,
				loading: false,
				friendList: [
					...action.payload.friendList
				],
				error: undefined
			};
		case GET_FRIEND_ERROR:
			return { ...state, loading: false, error: action.payload.error };
		case ADD_FRIEND:
			console.log('ADD_FRIEND,called')
			return { ...state, addFriendLoading: true };
		case ADD_FRIEND_SUCCESS:
			return {
				...state, addFriendLoading: false, friendList: [
					...state.friendList,
					...[{
						_id: action.payload.friend.id,
						email: action.payload.friend.email,
						name: action.payload.friend.name,
						dob: action.payload.friend.dob,
						userId: ''
					}]
				],
			};
		case ADD_FRIEND_ERROR:
			return { ...state, addFriendLoading: false, error: action.payload.error };
		case DELETE_FRIEND:
			console.log('DELETE_FRIEND,called')
			return { ...state, actionLoader: action.payload.id };
		case DELETE_FRIEND_SUCCESS:
			const oldFriends = state.friendList
			const newFriends = oldFriends.filter((item) => {
				return item._id !== action.payload.id
			})
			return {
				...state, actionLoader: undefined, friendList: newFriends
			};
		case DELETE_FRIEND_ERROR:
			return { ...state, actionLoader: undefined, error: action.payload.text };
		case SELECT_FRIEND:
			return { ...state, selectedFriend: action.payload };
		case EDIT_FRIEND:
			return { ...state, addFriendLoading: true };
		case EDIT_FRIEND_SUCCESS:
			const indexOFUpdatedFriend = state.friendList.findIndex((item) => item._id === action.payload.id)
			const oldFriendList = state.friendList
			oldFriendList[indexOFUpdatedFriend] = {
				...oldFriendList[indexOFUpdatedFriend],
				...action.payload.friend
			}
			return {
				...state,
				addFriendLoading: false,
				selectedFriend: undefined,
				friendList: [...oldFriendList]
			};
		case EDIT_FRIEND_ERROR:
			return {
				...state,
				addFriendLoading: false,
				error: action.payload.text,
				selectedFriend: undefined
			};
		case BULK_ADD_FRIEND:
			return { ...state, addFriendLoading: true };
		case BULK_ADD_FRIEND_SUCCESS:
			return {
				...state,
				addFriendLoading: false,
				selectedFriend: undefined,
			};
		case BULK_ADD_FRIEND_ERROR:
			return {
				...state,
				addFriendLoading: false,
				error: action.payload.text,
				selectedFriend: undefined
			};
		default:
			return { ...state };
	}
};
