export const CHANGE_FIELD = "CHANGE_FIELD";
export const acChangeField = (form, field, value) => {
  return {
    type: CHANGE_FIELD,
    form,
    field,
    value
  }
};

export const INIT_FORM = 'INIT_FORM';
export const acInitForm = (form) => {
  return {
    type: INIT_FORM,
    form
  }
};

export const VALIDATION_ERROR = "VALIDATION_ERROR";
export const acValidationError = (form, field, errors) => {
  return {
    type: VALIDATION_ERROR,
    form,
    field,
    errors
  }
};

export const CLEAR_VALIDATION_ERROR = "CLEAR_VALIDATION_ERROR";
export const acClearValidation = (form, field) => {
  return {
    type: CLEAR_VALIDATION_ERROR,
    form,
    field
  }
};

export const ATTACH_META = 'ATTACH_META';
export const acAttachMeta = (form, meta) => {
  return {
    type: ATTACH_META,
    form,
    meta,
  }
};

export const ATTACH_FIELD_META = 'ATTACH_FIELD_META';
export const acAttachFieldMeta = (form, field, meta) => {
  return {
    type: ATTACH_FIELD_META,
    form,
    field,
    meta,
  }
};


export const CLEAR_FORM = 'CLEAR_FORM';
export const acClearForm = (name) => {
  return {
    type: CLEAR_FORM,
    name
  }
};

export const SET_LOADING = 'SET_LOADING';
export const acSetLoading = (form, loading) => {
  return {
    type: SET_LOADING,
    form,
    loading,
  }
};

export const SET_SUBMITTING = 'SET_SUBMITTING';
export const acSetSubmitting = (form, submitting) => {
  return {
    type: SET_SUBMITTING,
    form,
    submitting,
  }
}

export const INIT_FIELD = 'INIT_FIELD';
export const acInitField = (form, field, defaultValue) => {
  return {
    type: INIT_FIELD,
    form,
    field,
    defaultValue
  }
}

export const initForm = (name) => {
  return (dispatch, getState) => {
    if (!getState().form[name]) {
      return dispatch(acInitForm(name))
    }
  }
};

export const validateField = (form, field, value, validators) => {
  return (dispatch, getState) => {
    let errors = [];
    validators.forEach( func => {
      const error = func(value);
      if (error) {
        errors.push(error)
      }
    });
    if (errors.length>0) {
      return dispatch(acValidationError(form, field, errors))
    } else {
      return dispatch(acClearValidation(form, field));
    }
  }
};
