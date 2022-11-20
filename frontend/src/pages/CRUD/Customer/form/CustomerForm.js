import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import customerFields from 'pages/CRUD/Customer/helpers/customerFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import CitySelectItem from 'pages/CRUD/City/helpers/CitySelectItem';

import StateSelectItem from 'pages/CRUD/State/helpers/StateSelectItem';

import CountrySelectItem from 'pages/CRUD/Country/helpers/CountrySelectItem';

const CustomerForm = (props) => {
  const {
    isEditing,
    isProfile,
    findLoading,
    saveLoading,
    record,
    onSubmit,
    onCancel,
    modal,
  } = props;

  const iniValues = () => {
    return IniValues(customerFields, record || {});
  };

  const formValidations = () => {
    return FormValidations(customerFields, record || {});
  };

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(customerFields, values || {});
    onSubmit(id, data);
  };

  const title = () => {
    if (isProfile) {
      return 'Edit My Profile';
    }

    return isEditing ? 'Edit Customer' : 'Add Customer';
  };

  const renderForm = () => (
    <Widget title={<h4>{title()}</h4>} collapse close>
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={3} direction='column'>
              <Grid item>
                <InputFormItem
                  name={'code'}
                  schema={customerFields}
                  autoFocus
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'name'} schema={customerFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'address1'} schema={customerFields} />
              </Grid>

              <Grid item>
                <InputFormItem name={'address2'} schema={customerFields} />
              </Grid>

              <Grid item>
                <CitySelectItem
                  name={'city'}
                  schema={customerFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <StateSelectItem
                  name={'state'}
                  schema={customerFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <CountrySelectItem
                  name={'country'}
                  schema={customerFields}
                  showCreate={!modal}
                  form={form}
                />
              </Grid>

              <Grid item>
                <InputFormItem name={'Postcode'} schema={customerFields} />
              </Grid>
            </Grid>
            <Grid container spacing={3} mt={2}>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={form.handleSubmit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={form.handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => onCancel()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Widget>
  );
  if (findLoading) {
    return <Loader />;
  }
  if (isEditing && !record) {
    return <Loader />;
  }
  return renderForm();
};
export default CustomerForm;
