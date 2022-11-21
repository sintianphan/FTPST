import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'SALESORDER_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESORDER_FORM_FIND_STARTED',
      });

      axios.get(`/salesorder/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'SALESORDER_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDER_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/salesorder'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'SALESORDER_FORM_CREATE_STARTED',
      });

      axios.post('/salesorder', { data: values }).then(res => {
        dispatch({
          type: 'SALESORDER_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Salesorder created' });
        dispatch(push('/admin/salesorder'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDER_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'SALESORDER_FORM_UPDATE_STARTED',
      });

      await axios.put(`/salesorder/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'SALESORDER_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Salesorder updated' });
        dispatch(push('/admin/salesorder'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'SALESORDER_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
