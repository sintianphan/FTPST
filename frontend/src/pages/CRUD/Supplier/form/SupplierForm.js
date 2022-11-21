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

import supplierFields from 'pages/CRUD/Supplier/helpers/supplierFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import CitySelectItem from 'pages/CRUD/City/helpers/CitySelectItem';

import StateSelectItem from 'pages/CRUD/State/helpers/StateSelectItem';

import CountrySelectItem from 'pages/CRUD/Country/helpers/CountrySelectItem';

const SupplierForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(supplierFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(supplierFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(supplierFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Supplier'
  : 'Add Supplier';
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
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'code'}
          schema={supplierFields}

            autoFocus

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'name'}
          schema={supplierFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'address1'}
          schema={supplierFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'address2'}
          schema={supplierFields}

        />
      </Grid>

      <Grid item>
        <CitySelectItem
        name={'city'}
        schema={supplierFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <StateSelectItem
        name={'state'}
        schema={supplierFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <CountrySelectItem
        name={'country'}
        schema={supplierFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'postcode'}
          schema={supplierFields}

        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
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
  }
  export default SupplierForm;
