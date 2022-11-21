import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'COUNTRY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'COUNTRY_FORM_FIND_STARTED',
      });

      axios.get(`/country/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'COUNTRY_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COUNTRY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/country'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'COUNTRY_FORM_CREATE_STARTED',
      });

      axios.post('/country', { data: values }).then(res => {
        dispatch({
          type: 'COUNTRY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Country created' });
        dispatch(push('/admin/country'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COUNTRY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'COUNTRY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/country/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'COUNTRY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Country updated' });
        dispatch(push('/admin/country'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COUNTRY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
