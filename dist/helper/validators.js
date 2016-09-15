"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var v_required = exports.v_required = function v_required(value) {
  if (value.length == 0) {
    return {
      text: "Field is required.",
      key: "required"
    };
  }
  return false;
};

var v_minlength = exports.v_minlength = function v_minlength(len) {
  return function (value) {
    if (value.length < len) {
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

var v_isNumeric = exports.v_isNumeric = function v_isNumeric(value) {
  return {
    text: "Validator not implemented yet!"
  };
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
  if (!re.test(value)) {
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