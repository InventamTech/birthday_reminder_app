/* AUTH */
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

// Dashboard

export const ADD_MODAL_OPEN = 'ADD_MODAL_OPEN'
export const ADD_MODAL_CLOSE = 'ADD_MODAL_CLOSE'
export const SEARCHING = 'SEARCHING'

// friend

export const GET_FRIEND = 'GET_FRIEND'
export const GET_FRIEND_SUCCESS = 'GET_FRIEND_SUCCESS'
export const GET_FRIEND_ERROR = 'GET_FRIEND_ERROR'

export const ADD_FRIEND = 'ADD_FRIEND'
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS'
export const ADD_FRIEND_ERROR = 'ADD_FRIEND_ERROR'
export const BULK_ADD_FRIEND = 'BULK_ADD_FRIEND'
export const BULK_ADD_FRIEND_SUCCESS = 'BULK_ADD_FRIEND_SUCCESS'
export const BULK_ADD_FRIEND_ERROR = 'BULK_ADD_FRIEND_ERROR'

export const EDIT_FRIEND = 'EDIT_FRIEND'
export const EDIT_FRIEND_SUCCESS = 'EDIT_FRIEND_SUCCESS'
export const EDIT_FRIEND_ERROR = 'EDIT_FRIEND_ERROR'

export const SELECT_FRIEND = 'SELECT_FRIEND'

export const DELETE_FRIEND = 'DELETE_FRIEND'
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS'
export const DELETE_FRIEND_ERROR = 'DELETE_FRIEND_ERROR'


export * from './auth/actions'
export * from './dashboard/actions'
export * from './friend/actions'