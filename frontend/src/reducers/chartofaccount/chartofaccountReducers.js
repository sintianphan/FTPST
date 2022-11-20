import list from 'reducers/chartofaccount/chartofaccountListReducers';
import form from 'reducers/chartofaccount/chartofaccountFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
