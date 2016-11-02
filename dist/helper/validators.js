'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.v_maxImageDimensions = exports.v_minImageDimensions = exports.v_fileSize = exports.v_testRegex = exports.v_mustBeChecked = exports.v_dependOnField = exports.v_mustEqualField = exports.v_password = exports.v_phone = exports.v_isEmail = exports.v_isNumeric = exports.v_noWrappingWhitespace = exports.v_noWhitespace = exports.v_maxlength = exports.v_minlength = exports.v_required = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v_required = exports.v_required = function v_required(value) {
  if (value == null || value.length == 0) {
    return {
      text: 'Field is required.',
      key: 'required'
    };
  }
  return false;
};

var v_minlength = exports.v_minlength = function v_minlength(len) {
  return function (value) {
    if (value == null || value.length < len) {
      return {
        text: 'Field should be at least ' + len + ' characters long.',
        key: 'minlength',
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
        key: 'maxlength',
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
      text: 'only whitespace is not allowed',
      key: 'whitespace'
    };
  }
  return false;
};

var v_noWrappingWhitespace = exports.v_noWrappingWhitespace = function v_noWrappingWhitespace(value) {
  var re = /^(\s+.*|\s+|.*\s+)$/i;
  if (re.test(value)) {
    return {
      text: 'start or ending whitespace',
      key: 'wrappingWhitespace'
    };
  }
  return false;
};

var v_isNumeric = exports.v_isNumeric = function v_isNumeric(value) {
  var re = /^\d*$/i;
  if (!re.test(value)) {
    return {
      key: 'numeric'
    };
  }
  return false;
};

var v_isEmail = exports.v_isEmail = function v_isEmail(value) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(value)) {
    return {
      text: 'Not a valid email address!',
      key: 'email'
    };
  }
  return false;
};

var v_phone = exports.v_phone = function v_phone(value) {
  var re = /^\+\d*$/i;
  if (value != null && value.length > 0 && !re.test(value)) {
    return {
      text: 'Not a valid number (e.g. +491577123456 )',
      key: 'phone'
    };
  }
  return false;
};

var v_password = exports.v_password = function v_password(value) {
  return false;
};

var v_mustEqualField = exports.v_mustEqualField = function v_mustEqualField(targetFieldName) {
  return function (value, form) {
    if (form && form.fields && form.fields[targetFieldName]) {
      var targetValue = form.fields[targetFieldName].value;

      return targetValue !== value ? {
        text: 'Fields are not matching',
        key: 'notEqual'
      } : false;
    }

    return false;
  };
};

var v_dependOnField = exports.v_dependOnField = function v_dependOnField(targetFieldName) {
  return function (value, form) {
    if (form && form.fields && form.fields[targetFieldName]) {
      var targetValue = form.fields[targetFieldName].value;

      if (targetValue == null || !targetValue.length) {
        return value != null && value.length ? {
          text: 'Field must be empty',
          key: 'mustBeEmpty'
        } : false;
      }
    }

    return v_required(value);
  };
};

var v_mustBeChecked = exports.v_mustBeChecked = function v_mustBeChecked(value) {
  return value !== true ? {
    text: 'Must be checked',
    key: 'notChecked'
  } : false;
};

var v_testRegex = exports.v_testRegex = function v_testRegex(regexString) {
  var regexFlags = arguments.length <= 1 || arguments[1] === undefined ? 'g' : arguments[1];

  var regex = void 0;
  try {
    regex = new RegExp(regexString, regexFlags);
  } catch (e) {
    console.error('invalid regular expression for validation', regexString, e);
  }

  return function (value) {
    if (!regex) {
      // this is terrible from a ux perspective
      return {
        text: 'Field has invalid validation',
        key: 'invalidValidation'
      };
    }

    return !regex.test(value) ? {
      text: 'Invalid Value',
      key: 'regexFailed'
    } : false;
  };
};

var v_fileSize = exports.v_fileSize = function v_fileSize(fileSizeKb) {
  return function (value, form, field, meta) {
    if (meta) {
      return meta.size / 1000 > fileSizeKb ? {
        text: 'Upload is too big',
        key: 'fileuploadSize'
      } : false;
    }
    return false;
  };
};

var v_minImageDimensions = exports.v_minImageDimensions = function v_minImageDimensions(width, height) {
  return function (value) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.src = value;
      image.onload = function () {
        if (image.width < width || image.height < height) {
          resolve({
            text: 'Image Dimensions too small, min allowed {width} x {height}',
            key: 'fileuploadImageMinDimensions',
            values: {
              width: width,
              height: height
            }
          });
        } else {
          resolve(false);
        }
      };
    });
  };
};

var v_maxImageDimensions = exports.v_maxImageDimensions = function v_maxImageDimensions(width, height) {
  return function (value) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.src = value;
      image.onload = function () {
        if (image.width > width || image.height > height) {
          resolve({
            text: 'Image Dimensions too big, max allowed {width} x {height}',
            key: 'fileuploadImageMaxDimensions',
            values: {
              width: width,
              height: height
            }
          });
        } else {
          resolve(false);
        }
      };
    });
  };
};