import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import account from './account';
import finance from './finance';

export default combineReducers({
  alert,
  auth,
  account,
  finance
});