import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SUPPLIER_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SUPPLIER_FORM_FIND_STARTED',
      });

      axios.get(`/supplier/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'SUPPLIER_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SUPPLIER_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/supplier'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SUPPLIER_FORM_CREATE_STARTED',
      });

      axios.post('/supplier', { data: values }).then((res) => {
        dispatch({
          type: 'SUPPLIER_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Supplier created' });
        dispatch(push('/admin/supplier'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SUPPLIER_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SUPPLIER_FORM_UPDATE_STARTED',
      });

      await axios.put(`/supplier/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'SUPPLIER_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Supplier updated' });
        dispatch(push('/admin/supplier'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SUPPLIER_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
