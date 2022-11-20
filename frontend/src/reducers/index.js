import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import customer from 'reducers/customer/customerReducers';

import item from 'reducers/item/itemReducers';

import chartofaccount from 'reducers/chartofaccount/chartofaccountReducers';

import supplier from 'reducers/supplier/supplierReducers';

import service from 'reducers/service/serviceReducers';

import state from 'reducers/state/stateReducers';

import country from 'reducers/country/countryReducers';

import city from 'reducers/city/cityReducers';

import itemgroup from 'reducers/itemgroup/itemgroupReducers';

import salesorder from 'reducers/salesorder/salesorderReducers';

import salesorderdetails from 'reducers/salesorderdetails/salesorderdetailsReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    customer,

    item,

    chartofaccount,

    supplier,

    service,

    state,

    country,

    city,

    itemgroup,

    salesorder,

    salesorderdetails,
  });
