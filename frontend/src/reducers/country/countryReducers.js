import list from 'reducers/country/countryListReducers';
import form from 'reducers/country/countryFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
