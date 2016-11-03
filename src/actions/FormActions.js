import _ from 'lodash';

export const CHANGE_FIELD = 'CHANGE_FIELD';
export const acChangeField = (form, field, value, meta) => {
  return {
    type: CHANGE_FIELD,
    form,
    field,
    value,
    meta,
  };
};

export const INIT_FORM = 'INIT_FORM';
export const acInitForm = (form) => {
  return {
    type: INIT_FORM,
    form,
  };
};

export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const acValidationError = (form, field, errors) => {
  return {
    type: VALIDATION_ERROR,
    form,
    field,
    errors,
  };
};

export const CLEAR_VALIDATION_ERROR = 'CLEAR_VALIDATION_ERROR';
export const acClearValidation = (form, field) => {
  return {
    type: CLEAR_VALIDATION_ERROR,
    form,
    field,
  };
};

export const ATTACH_META = 'ATTACH_META';
export const acAttachMeta = (form, meta) => {
  return {
    type: ATTACH_META,
    form,
    meta,
  };
};

export const ATTACH_FIELD_META = 'ATTACH_FIELD_META';
export const acAttachFieldMeta = (form, field, meta) => {
  return {
    type: ATTACH_FIELD_META,
    form,
    field,
    meta,
  };
};


export const CLEAR_FORM = 'CLEAR_FORM';
export const acClearForm = (name) => {
  return {
    type: CLEAR_FORM,
    name,
  };
};

export const SET_LOADING = 'SET_LOADING';
export const acSetLoading = (form, loading) => {
  return {
    type: SET_LOADING,
    form,
    loading,
  };
};

export const SET_SUBMITTING = 'SET_SUBMITTING';
export const acSetSubmitting = (form, submitting) => {
  return {
    type: SET_SUBMITTING,
    form,
    submitting,
  };
};
export const SET_VALIDATE_STATE = 'SET_VALIDATE_STATE';
export const acSetValidateState = (form, field, state) => {
  return {
    type: SET_VALIDATE_STATE,
    form,
    field,
    state,
  };
};

export const SET_MOUNTED = 'SET_MOUNTED';
export const acSetMounted = (form, field, mounted) => {
  return {
    type: SET_MOUNTED,
    form,
    field,
    mounted,
  };
};

export const INIT_FIELD = 'INIT_FIELD';
export const acInitField = (form, field, defaultValue) => {
  return {
    type: INIT_FIELD,
    form,
    field,
    defaultValue,
  };
};

export const initForm = (name) => {
  return (dispatch, getState) => {
    if (!getState().form[name]) {
      return dispatch(acInitForm(name));
    }
  };
};

export const validateField = (formName, fieldName, value, validators, affects) => {
  return (dispatch, getState) => {
    const state = getState();
    const form = _.get(state, `form[${formName}]`, null);
    const fieldErrors = _.get(state, `form[${formName}].errors[${fieldName}]`);
    const fieldValidation = _.get(state, `form[${formName}].fields[${fieldName}].validation`);

    const isSubmitting = form && form.submitting;

    const errors = [];

    validators.forEach(func => {
      const error = func(value, form, fieldName);
      if (error !== false) {
        errors.push(error);
      }
    });

    affects.forEach(affectedFieldName => {
      const affectedFieldValidation = _.get(state, `form[${formName}].fields[${fieldName}].validation`, 'UNKNOWN');
      if (!isSubmitting && affectedFieldValidation !== 'PENDING') {
        dispatch(acSetValidateState(formName, affectedFieldName, 'PENDING'));
      }
    });

    if (errors.length) {
      dispatch(acValidationError(formName, fieldName, errors));
    } else if (fieldErrors) {
      dispatch(acClearValidation(formName, fieldName));
    } else if (fieldValidation !== 'VALIDATED') {
      dispatch(acSetValidateState(formName, fieldName, 'VALIDATED'));
    }
  };
};
