import list from 'reducers/salesorderdetails/salesorderdetailsListReducers';
import form from 'reducers/salesorderdetails/salesorderdetailsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
