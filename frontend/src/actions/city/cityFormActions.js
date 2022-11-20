import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CITY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CITY_FORM_FIND_STARTED',
      });

      axios.get(`/city/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CITY_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CITY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/city'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CITY_FORM_CREATE_STARTED',
      });

      axios.post('/city', { data: values }).then((res) => {
        dispatch({
          type: 'CITY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'City created' });
        dispatch(push('/admin/city'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CITY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CITY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/city/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CITY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'City updated' });
        dispatch(push('/admin/city'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CITY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
