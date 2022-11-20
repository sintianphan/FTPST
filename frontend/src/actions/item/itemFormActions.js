import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ITEM_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ITEM_FORM_FIND_STARTED',
      });

      axios.get(`/item/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ITEM_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEM_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/item'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ITEM_FORM_CREATE_STARTED',
      });

      axios.post('/item', { data: values }).then((res) => {
        dispatch({
          type: 'ITEM_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Item created' });
        dispatch(push('/admin/item'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEM_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ITEM_FORM_UPDATE_STARTED',
      });

      await axios.put(`/item/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ITEM_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Item updated' });
        dispatch(push('/admin/item'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEM_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
