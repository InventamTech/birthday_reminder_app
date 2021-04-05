import { ADD_MODAL_CLOSE, ADD_MODAL_OPEN, SEARCHING } from '../actions';

const INIT_STATE = {
	modal: false,
	searchText: undefined,
};

export default (state = INIT_STATE, action) => {
	// console.log('Auth State: ', state);
	switch (action.type) {
		case ADD_MODAL_OPEN:
			return { ...state, modal: true };
		case ADD_MODAL_CLOSE:
			return { ...state, modal: false };
		case SEARCHING:
			return { ...state, searchText: action.payload.text };
		default:
			return { ...state };
	}
};
