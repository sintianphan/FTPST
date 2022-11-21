import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CHARTOFACCOUNT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CHARTOFACCOUNT_FORM_FIND_STARTED',
      });

      axios.get(`/chartofaccount/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'CHARTOFACCOUNT_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CHARTOFACCOUNT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/chartofaccount'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CHARTOFACCOUNT_FORM_CREATE_STARTED',
      });

      axios.post('/chartofaccount', { data: values }).then(res => {
        dispatch({
          type: 'CHARTOFACCOUNT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Chartofaccount created' });
        dispatch(push('/admin/chartofaccount'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CHARTOFACCOUNT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'CHARTOFACCOUNT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/chartofaccount/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'CHARTOFACCOUNT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Chartofaccount updated' });
        dispatch(push('/admin/chartofaccount'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CHARTOFACCOUNT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
