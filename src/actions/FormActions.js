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
export const acInitForm = (name, initialFields) => {
  return {
    type: INIT_FORM,
    name,
    initialFields
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

export const initForm = (name, initialFields, id) => {
  return (dispatch, getState) => {
    if ((!getState().form[name]) || (!getState().form[name].changed) || (getState().form[name].id!=id)) {
      return dispatch(acInitForm(name, initialFields, id))
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
      if ((getState().form[form].errors) && (getState().form[form].errors[field])) {
        return dispatch(acClearValidation(form, field))
      }
    }
  }
};
