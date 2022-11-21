import list from 'reducers/service/serviceListReducers';
import form from 'reducers/service/serviceFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
