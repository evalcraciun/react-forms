'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateField = exports.initForm = exports.acInitField = exports.INIT_FIELD = exports.acSetMounted = exports.SET_MOUNTED = exports.acSetValidating = exports.SET_VALIDATING = exports.acSetSubmitting = exports.SET_SUBMITTING = exports.acSetLoading = exports.SET_LOADING = exports.acClearForm = exports.CLEAR_FORM = exports.acAttachFieldMeta = exports.ATTACH_FIELD_META = exports.acAttachMeta = exports.ATTACH_META = exports.acClearValidation = exports.CLEAR_VALIDATION_ERROR = exports.acValidationError = exports.VALIDATION_ERROR = exports.acInitForm = exports.INIT_FORM = exports.acChangeField = exports.CHANGE_FIELD = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_FIELD = exports.CHANGE_FIELD = 'CHANGE_FIELD';
var acChangeField = exports.acChangeField = function acChangeField(form, field, value) {
  return {
    type: CHANGE_FIELD,
    form: form,
    field: field,
    value: value
  };
};

var INIT_FORM = exports.INIT_FORM = 'INIT_FORM';
var acInitForm = exports.acInitForm = function acInitForm(form) {
  return {
    type: INIT_FORM,
    form: form
  };
};

var VALIDATION_ERROR = exports.VALIDATION_ERROR = 'VALIDATION_ERROR';
var acValidationError = exports.acValidationError = function acValidationError(form, field, errors) {
  return {
    type: VALIDATION_ERROR,
    form: form,
    field: field,
    errors: errors
  };
};

var CLEAR_VALIDATION_ERROR = exports.CLEAR_VALIDATION_ERROR = 'CLEAR_VALIDATION_ERROR';
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

var ATTACH_FIELD_META = exports.ATTACH_FIELD_META = 'ATTACH_FIELD_META';
var acAttachFieldMeta = exports.acAttachFieldMeta = function acAttachFieldMeta(form, field, meta) {
  return {
    type: ATTACH_FIELD_META,
    form: form,
    field: field,
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

var SET_SUBMITTING = exports.SET_SUBMITTING = 'SET_SUBMITTING';
var acSetSubmitting = exports.acSetSubmitting = function acSetSubmitting(form, submitting) {
  return {
    type: SET_SUBMITTING,
    form: form,
    submitting: submitting
  };
};

var SET_VALIDATING = exports.SET_VALIDATING = 'SET_VALIDATING';
var acSetValidating = exports.acSetValidating = function acSetValidating(form, field, validating) {
  return {
    type: SET_VALIDATING,
    form: form,
    field: field,
    validating: validating
  };
};

var SET_MOUNTED = exports.SET_MOUNTED = 'SET_MOUNTED';
var acSetMounted = exports.acSetMounted = function acSetMounted(form, field, mounted) {
  return {
    type: SET_MOUNTED,
    form: form,
    field: field,
    mounted: mounted
  };
};

var INIT_FIELD = exports.INIT_FIELD = 'INIT_FIELD';
var acInitField = exports.acInitField = function acInitField(form, field, defaultValue) {
  return {
    type: INIT_FIELD,
    form: form,
    field: field,
    defaultValue: defaultValue
  };
};

var initForm = exports.initForm = function initForm(name) {
  return function (dispatch, getState) {
    if (!getState().form[name]) {
      return dispatch(acInitForm(name));
    }
  };
};

var validateField = exports.validateField = function validateField(formName, fieldName, value, validators, affects) {
  return function (dispatch, getState) {
    var state = getState();
    var form = _lodash2.default.get(state, 'form[' + formName + ']', null);
    var errors = [];
    validators.forEach(function (func) {
      var error = func(value, form, fieldName);
      if (error) {
        errors.push(error);
      }
    });

    affects.forEach(function (affectedField) {
      dispatch(acSetValidating(formName, affectedField, true));
    });

    if (errors.length > 0) {
      return dispatch(acValidationError(formName, fieldName, errors));
    } else {
      return dispatch(acClearValidation(formName, fieldName));
    }
  };
};