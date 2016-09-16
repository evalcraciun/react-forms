"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_FIELD = exports.CHANGE_FIELD = "CHANGE_FIELD";
var acChangeField = exports.acChangeField = function acChangeField(form, field, value) {
  return {
    type: CHANGE_FIELD,
    form: form,
    field: field,
    value: value
  };
};

var INIT_FORM = exports.INIT_FORM = 'INIT_FORM';
var acInitForm = exports.acInitForm = function acInitForm(name, initialFields) {
  return {
    type: INIT_FORM,
    name: name,
    initialFields: initialFields
  };
};

var VALIDATION_ERROR = exports.VALIDATION_ERROR = "VALIDATION_ERROR";
var acValidationError = exports.acValidationError = function acValidationError(form, field, errors) {
  return {
    type: VALIDATION_ERROR,
    form: form,
    field: field,
    errors: errors
  };
};

var CLEAR_VALIDATION_ERROR = exports.CLEAR_VALIDATION_ERROR = "CLEAR_VALIDATION_ERROR";
var acClearValidation = exports.acClearValidation = function acClearValidation(form, field) {
  return {
    type: CLEAR_VALIDATION_ERROR,
    form: form,
    field: field
  };
};

var ATTACH_META = exports.ATTACH_META = 'ATTACH_META';
var acAttachMeta = exports.acAttachMeta = function acAttachMeta(form, meta) {
  return {
    type: ATTACH_META,
    form: form,
    meta: meta
  };
};

var CLEAR_FORM = exports.CLEAR_FORM = 'CLEAR_FORM';
var acClearForm = exports.acClearForm = function acClearForm(name) {
  return {
    type: CLEAR_FORM,
    name: name
  };
};

var SET_LOADING = exports.SET_LOADING = 'SET_LOADING';
var acSetLoading = exports.acSetLoading = function acSetLoading(form, loading) {
  return {
    type: SET_LOADING,
    form: form,
    loading: loading
  };
};

var initForm = exports.initForm = function initForm(name, initialFields, id) {
  return function (dispatch, getState) {
    if (!getState().form[name] || !getState().form[name].changed || getState().form[name].id != id) {
      return dispatch(acInitForm(name, initialFields, id));
    }
  };
};

var validateField = exports.validateField = function validateField(form, field, value, validators) {
  return function (dispatch, getState) {
    var errors = [];
    validators.forEach(function (func) {
      var error = func(value);
      if (error) {
        errors.push(error);
      }
    });
    if (errors.length > 0) {
      return dispatch(acValidationError(form, field, errors));
    } else {
      if (getState().form[form].errors && getState().form[form].errors[field]) {
        return dispatch(acClearValidation(form, field));
      }
    }
  };
};