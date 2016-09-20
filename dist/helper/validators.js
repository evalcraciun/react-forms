"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var v_required = exports.v_required = function v_required(value) {
  if (value == null || value.length == 0) {
    return {
      text: "Field is required.",
      key: "required"
    };
  }
  return false;
};

var v_minlength = exports.v_minlength = function v_minlength(len) {
  return function (value) {
    if (value == null || value.length < len) {
      return {
        text: "Field should be at least " + len + " characters long.",
        key: "minlength",
        values: {
          minlength: len
        }
      };
    }
    return false;
  };
};

var v_maxlength = exports.v_maxlength = function v_maxlength(len) {
  return function (value) {
    if (value == null || value.length > len) {
      return {
        key: "maxlength",
        values: {
          maxlength: len
        }
      };
    }
    return false;
  };
};

var v_noWhitespace = exports.v_noWhitespace = function v_noWhitespace(value) {
  var re = /^\s+$/i;
  if (re.test(value)) {
    return {
      text: "only whitespace is not allowed",
      key: "whitespace"
    };
  }
  return false;
};

var v_noWrappingWhitespace = exports.v_noWrappingWhitespace = function v_noWrappingWhitespace(value) {
  var re = /^(\s+.*|\s+|.*\s+)$/i;
  if (re.test(value)) {
    return {
      text: "start or ending whitespace",
      key: "wrappingWhitespace"
    };
  }
  return false;
};

var v_isNumeric = exports.v_isNumeric = function v_isNumeric(value) {
  var re = /^\d*$/i;
  if (!re.test(value)) {
    return {
      key: "numeric"
    };
  }
  return false;
};

var v_isEmail = exports.v_isEmail = function v_isEmail(value) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(value)) {
    return {
      text: "Not a valid email address!",
      key: "email"
    };
  }
  return false;
};

var v_phone = exports.v_phone = function v_phone(value) {
  var re = /^\+\d*$/i;
  if (value != null && value.length > 0 && !re.test(value)) {
    return {
      text: "Not a valid number (e.g. +491577123456 )",
      key: "phone"
    };
  }
  return false;
};

var v_password = exports.v_password = function v_password(value) {
  return false;
};