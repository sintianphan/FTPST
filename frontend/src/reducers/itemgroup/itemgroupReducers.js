import list from 'reducers/itemgroup/itemgroupListReducers';
import form from 'reducers/itemgroup/itemgroupFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
