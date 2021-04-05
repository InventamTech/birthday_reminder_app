import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER } from '../actions';

const INIT_STATE = {
	email: localStorage.getItem('email'),
	token: localStorage.getItem('token'),
	userName: localStorage.getItem('user_name'),
	imageUrl: localStorage.getItem('image_url'),
	loading: false,
	error: '',
};

export default (state = INIT_STATE, action) => {
	// console.log('Auth State: ', state);
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			const {
				token,
				email,
				userName,
				imageUrl
			} = action.payload;
			localStorage.setItem('email', email)
			localStorage.setItem('token', token)
			localStorage.setItem('user_name', userName)
			localStorage.setItem('image_url', imageUrl)
			return {
				...state,
				loading: false,
				email,
				userName,
				imageUrl,
				token,
				error: '',
			};
		case LOGOUT_USER:
			return {
				email: '',
				token: '',
				userName: '',
				imageUrl: '',
				loading: false,
				error: '',
			};
		default:
			return { ...state };
	}
};
