import { combineReducers } from 'redux';
import alert from './alert';
import product from './product';
import auth from './auth';


export default combineReducers({
  alert,
  product,
  auth
});