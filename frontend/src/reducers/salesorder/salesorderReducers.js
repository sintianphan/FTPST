import list from 'reducers/salesorder/salesorderListReducers';
import form from 'reducers/salesorder/salesorderFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
