export const CHANGE_FIELD = 'CHANGE_FIELD';
export const acChangeField = (form, field, value) => {
  return {
    type: CHANGE_FIELD,
    form,
    field,
    value,
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

export const SET_VALIDATING = 'SET_VALIDATING';
export const acSetValidating = (form, field, validating) => {
  return {
    type: SET_VALIDATING,
    form,
    field,
    validating,
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
    const errors = [];
    validators.forEach(func => {
      const error = func(value, form, fieldName);
      if (error) {
        errors.push(error);
      }
    });

    affects.forEach(affectedField => {
      dispatch(acSetValidating(formName, affectedField, true));
    });

    if (errors.length > 0) {
      return dispatch(acValidationError(formName, fieldName, errors));
    } else {
      return dispatch(acClearValidation(formName, fieldName));
    }
  };
};
