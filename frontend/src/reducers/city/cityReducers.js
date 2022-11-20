import list from 'reducers/city/cityListReducers';
import form from 'reducers/city/cityFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
