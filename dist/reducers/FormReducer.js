'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _FormActions = require('../actions/FormActions');

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
					id: action.id
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
		case _FormActions.ATTACH_REQUEST:
			{
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					request: action.requestId
				})));
			}
		case _FormActions.VALIDATION_ERROR:
			{
				return _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
					errors: _extends({}, state[action.form].errors, _defineProperty({}, action.field, action.errors))
				})));
			}
		case _FormActions.CLEAR_VALIDATION_ERROR:
			{
				var _ret = function () {
					var keys = Object.keys(state[action.form].errors).filter(function (obj) {
						return obj != action.field;
					});
					var newErrors = {};
					keys.forEach(function (key) {
						newErrors[key] = state[action.form].errors[key];
					});

					return {
						v: _extends({}, state, _defineProperty({}, action.form, _extends({}, state[action.form], {
							errors: newErrors
						})))
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		case _FormActions.CLEAR_FORM:
			{
				if (state[action.name]) {
					var _ret2 = function () {
						var keys = Object.keys(state).filter(function (obj) {
							return obj != action.name;
						});
						var newState = {};
						keys.forEach(function (key) {
							newState[key] = state[key];
						});
						// console.log(newState);
						// delete newState[action.name]
						return {
							v: newState
						};
					}();

					if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
				}
				return state;
			}
		default:
			return state;
	}
};

exports.default = formReducer;