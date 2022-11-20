import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'STATE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'STATE_FORM_FIND_STARTED',
      });

      axios.get(`/state/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'STATE_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'STATE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/state'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'STATE_FORM_CREATE_STARTED',
      });

      axios.post('/state', { data: values }).then((res) => {
        dispatch({
          type: 'STATE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'State created' });
        dispatch(push('/admin/state'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'STATE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'STATE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/state/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'STATE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'State updated' });
        dispatch(push('/admin/state'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'STATE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
