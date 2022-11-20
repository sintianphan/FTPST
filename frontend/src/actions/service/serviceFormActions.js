import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SERVICE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SERVICE_FORM_FIND_STARTED',
      });

      axios.get(`/service/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'SERVICE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SERVICE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/service'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SERVICE_FORM_CREATE_STARTED',
      });

      axios.post('/service', { data: values }).then((res) => {
        dispatch({
          type: 'SERVICE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Service created' });
        dispatch(push('/admin/service'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SERVICE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SERVICE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/service/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'SERVICE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Service updated' });
        dispatch(push('/admin/service'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SERVICE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
