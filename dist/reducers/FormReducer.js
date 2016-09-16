'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FormActions = require('../actions/FormActions');

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
		case _FormActions.INIT_FORM:
			{
				return _extends({}, state, _defineProperty({}, action.name, {
					fields: _extends({}, action.initialFields),
					changed: false,
					loading: false
				}));
			}
		case _FormActions.CHANGE_FIELD:
			{
				var fields = state[action.form].fields;
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					changed: true,
					fields: _extends({}, fields, _defineProperty({}, action.field, action.value))
				})));
			}
		case _FormActions.ATTACH_META:
			{
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					meta: action.meta
				})));
			}
		case _FormActions.VALIDATION_ERROR:
			{
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					errors: _extends({}, state[action.form].errors, _defineProperty({}, action.field, action.errors))
				})));
			}
		case _FormActions.SET_LOADING:
			{
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					loading: !!action.loading
				})));
			}
		case _FormActions.CLEAR_VALIDATION_ERROR:
			{
				var _state$action$form$er = state[action.form].errors;
				var removed = _state$action$form$er[action.field];

				var newErrors = _objectWithoutProperties(_state$action$form$er, [action.field]);

				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					errors: newErrors
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