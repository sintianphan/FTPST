import list from 'reducers/item/itemListReducers';
import form from 'reducers/item/itemFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
