'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FormActions = require('../actions/FormActions');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {};

var formReducer = function formReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    // case "RESET_STATE": {
    // 	return {
    // 		...action.payload.form
    // 	}
    // }
    case _FormActions.INIT_FIELD:
      {
        var form = state[action.form] ? state[action.form] : {
          errors: {},
          fields: {},
          meta: {},
          changed: true,
          loading: false,
          submitting: false
        };
        var fields = state[action.form] && state[action.form].fields ? state[action.form].fields : {};

        return _extends({}, state, _defineProperty({}, action.form, _extends({}, form, {
          fields: _extends({}, fields, _defineProperty({}, action.field, {
            value: action.defaultValue,
            validated: false,
            meta: {}
          }))
        })));
      }
    case _FormActions.CHANGE_FIELD:
      {
        var _fields = state[action.form].fields;
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          changed: true,
          fields: _extends({}, _fields, _defineProperty({}, action.field, _extends({}, _fields[action.field], {
            value: action.value,
            validated: false
          })))
        })));
      }
    case _FormActions.ATTACH_META:
      {
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          meta: action.meta
        })));
      }
    case _FormActions.ATTACH_FIELD_META:
      {
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          fields: _extends({}, state[action.form].fields, _defineProperty({}, action.field, _extends({}, state[action.form].fields[action.field], {
            meta: action.meta
          })))
        })));
      }
    case _FormActions.VALIDATION_ERROR:
      {
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          errors: _extends({}, state[action.form].errors, _defineProperty({}, action.field, action.errors)),
          fields: _extends({}, state[action.form].fields, _defineProperty({}, action.field, _extends({}, state[action.form].fields[action.field], {
            validated: true
          })))
        })));
      }
    case _FormActions.SET_LOADING:
      {
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          loading: !!action.loading
        })));
      }
    case _FormActions.SET_SUBMITTING:
      {
        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          submitting: !!action.submitting
        })));
      }
    case _FormActions.CLEAR_VALIDATION_ERROR:
      {
        var newErrors = void 0;
        if (action.field in state[action.form].errors) {
          var _state$action$form$er = state[action.form].errors;
          var removed = _state$action$form$er[action.field];

          var _newErrors = _objectWithoutProperties(_state$action$form$er, [action.field]);
        } else {
          newErrors = state[action.form].errors;
        }

        return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
          errors: newErrors,
          fields: _extends({}, state[action.form].fields, _defineProperty({}, action.field, _extends({}, state[action.form].fields[action.field], {
            validated: true
          })))
        })));
      }
    case _FormActions.CLEAR_FORM:
      {
        if (state[action.name]) {
          var _removed = state[action.name];

          var newState = _objectWithoutProperties(state, [action.name]);

          return _extends({}, newState);
        }
        return state;
      }
    default:
      return state;
  }
};

exports.default = formReducer;