import list from 'reducers/supplier/supplierListReducers';
import form from 'reducers/supplier/supplierFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
