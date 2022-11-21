import list from 'reducers/state/stateListReducers';
import form from 'reducers/state/stateFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
