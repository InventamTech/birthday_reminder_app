import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import dashboard from './dashboard/reducers';
import friends from './friend/reducers';
const reducers = combineReducers({
	authUser,
	dashboard,
	friends
});

export default reducers;
