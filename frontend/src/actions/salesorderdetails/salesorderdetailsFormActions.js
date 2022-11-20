import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SALESORDERDETAILS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESORDERDETAILS_FORM_FIND_STARTED',
      });

      axios.get(`/salesorderdetails/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'SALESORDERDETAILS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDERDETAILS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/salesorderdetails'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESORDERDETAILS_FORM_CREATE_STARTED',
      });

      axios.post('/salesorderdetails', { data: values }).then((res) => {
        dispatch({
          type: 'SALESORDERDETAILS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Salesorderdetails created' });
        dispatch(push('/admin/salesorderdetails'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDERDETAILS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SALESORDERDETAILS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/salesorderdetails/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'SALESORDERDETAILS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Salesorderdetails updated' });
        dispatch(push('/admin/salesorderdetails'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDERDETAILS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
