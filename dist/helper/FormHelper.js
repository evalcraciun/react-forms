'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldValue = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFieldValue = exports.getFieldValue = function getFieldValue(state, formName, fieldName, defaultValue) {
  return _lodash2.default.get(state, 'form[' + formName + '].fields[' + fieldName + '].value', defaultValue);
};