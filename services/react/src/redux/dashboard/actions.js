import { ADD_MODAL_CLOSE, ADD_MODAL_OPEN, SEARCHING } from '../actions';

export const openModal = () => ({
	type: ADD_MODAL_OPEN,
	payload: {},
});
export const closeModal = () => ({
	type: ADD_MODAL_CLOSE,
	payload: {},
});
export const searchTable = (text) => ({
	type: SEARCHING,
	payload: { text },
});