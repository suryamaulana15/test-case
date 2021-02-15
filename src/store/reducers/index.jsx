import { combineReducers } from 'redux';
import alert from './alert';
import product from './product';

export default combineReducers({
  alert,
  product
});