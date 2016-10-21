'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FieldError = require('./FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

var _FormActions = require('../actions/FormActions');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
  }

  _createClass(Field, [{
    key: 'getFieldValue',
    value: function getFieldValue(key) {
      return _lodash2.default.isObject(this.props.fieldValue) ? _lodash2.default.get(this.props.fieldValue, key, '') : this.props.fieldValue;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.isInitialized) {
        if (this.props.isReady !== false) {
          this.props.initField(this.props.formName, this.props.fieldName, this.props.defaultValue);
        }
      } else {
        this.props.setMounted(this.props.formName, this.props.fieldName, true);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.setMounted(this.props.formName, this.props.fieldName, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isSubmitting && !nextProps.isValidated) {
        this.validateField();
      }

      if (!nextProps.isInitialized && nextProps.isReady !== false) {
        this.props.initField(nextProps.formName, nextProps.fieldName, nextProps.defaultValue);
      }

      if (!this.props.shouldValidate && nextProps.shouldValidate) {
        this.validateField();
      }
    }
  }, {
    key: 'injectChild',
    value: function injectChild(element) {
      var _this2 = this;

      var elementType = element.type;

      var keyName = _lodash2.default.get(element, 'props.name', null);
      var isObjValue = _lodash2.default.isObject(this.props.fieldValue) && this.props.fieldValue.constructor === Object;

      var errorClassName = this.props.errorClassName || 'has-error';

      // set the initial value depending on whether the fields value is an object or not
      var initialValue = null;
      if (isObjValue && !keyName) {
        initialValue = null;
        console.warn('missing input name for a value structure that is an object');
      } else {
        initialValue = isObjValue ? this.props.fieldValue[keyName] : this.props.fieldValue;
      }

      var cloneProps = {};
      cloneProps.value = initialValue || '';

      var processFunc = function processFunc(event, value) {
        return value;
      };

      var processFuncAttrs = ['processFunc', 'data-processFunc'];

      processFuncAttrs.forEach(function (attr) {
        var func = _lodash2.default.get(element.props, attr, null);

        if (typeof func == 'function') {
          processFunc = func;
          return false;
        }
      });

      cloneProps.onChange = function (event, value) {
        if (typeof value === 'undefined') {
          value = event.target.value;
        }

        _this2.changeField(keyName, processFunc(event, value));

        // fixme: oh god
        setTimeout(function () {
          _this2.validateField();
        }, 0);
      };

      if (this.props.validateTrigger) {
        this.props.validateTrigger.forEach(function (trigger) {
          cloneProps[trigger] = function () {
            _this2.validateField();
          };
        });
      }

      if (this.props.clearErrorTrigger) {
        this.props.clearErrorTrigger.forEach(function (trigger) {
          cloneProps[trigger] = function () {
            _this2.clearValidation();
          };
        });
      }

      var classes = [];

      if (element.props.className) {
        classes.push.apply(classes, _toConsumableArray(element.props.className.split(' ')));
      }

      if (this.props.hasErrors) {
        classes.push(errorClassName);
      }

      cloneProps.className = classes.join(' ');

      return _react2.default.cloneElement(element, _extends({}, cloneProps));
    }
  }, {
    key: 'changeField',
    value: function changeField(key, value) {
      var _this3 = this;

      var promise = void 0;
      if (typeof value === 'function') {
        value.then(function (value) {
          var newValue = void 0;

          if (key) {
            newValue = _extends({}, _this3.props.fieldValue, _defineProperty({}, key, value));
          } else {
            newValue = value;
          }

          var formName = _this3.props.formName;
          var fieldName = _this3.props.fieldName;
          _this3.props.changeField(formName, fieldName, newValue);
        });
      } else {
        var formName = this.props.formName;
        var fieldName = this.props.fieldName;

        var newValue = void 0;

        if (key) {
          newValue = _extends({}, this.props.fieldValue, _defineProperty({}, key, value));
        } else {
          newValue = value;
        }

        this.props.changeField(formName, fieldName, newValue);
      }
    }
  }, {
    key: 'validateField',
    value: function validateField() {
      this.props.validateField(this.props.formName, this.props.fieldName, this.props.fieldValue, this.props.validators, this.props.affectsFields);
    }
  }, {
    key: 'clearValidation',
    value: function clearValidation() {
      if (this.props.hasErrors) {
        this.props.clearValidation(this.props.formName, this.props.fieldName);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var errorClassName = _lodash2.default.get(this, 'props.errorClassName', 'has-error');
      var className = this.props.className || '';
      var classes = ['formField'].concat(_toConsumableArray(className.split(' ')));

      if (this.props.hasErrors) {
        classes.push(errorClassName);
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.Children.map(this.props.children, function (child) {
          return _this4.injectChild(child);
        })
      );
    }
  }]);

  return Field;
}(_react2.default.Component);

Field.propTypes = {
  fieldName: _react2.default.PropTypes.string.isRequired,
  formName: _react2.default.PropTypes.string.isRequired,
  processFunc: _react2.default.PropTypes.func,
  validators: _react2.default.PropTypes.array,
  validateTrigger: _react2.default.PropTypes.any,
  clearErrorTrigger: _react2.default.PropTypes.any,
  affectsFields: _react2.default.PropTypes.array
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formName = ownProps.formName;
  var fieldName = ownProps.fieldName;
  var isReady = ownProps.isReady;
  var fieldValue = _lodash2.default.get(state, 'form.' + formName + '.fields.' + fieldName + '.value');

  var fieldErrors = state.form[formName] && state.form[formName].errors && state.form[formName].errors[fieldName] && state.form[formName].errors[fieldName].length ? state.form[formName].errors[fieldName] : [];

  var hasErrors = fieldErrors.length;
  var defaultValue = typeof ownProps.defaultValue === 'undefined' ? null : ownProps.defaultValue;

  var validateTrigger = typeof ownProps.validateTrigger !== 'undefined' && typeof ownProps.validateTrigger === 'string' ? [ownProps.validateTrigger] : ownProps.validateTrigger || ['onBlur'];

  var clearErrorTrigger = typeof ownProps.clearErrorTrigger !== 'undefined' && typeof ownProps.clearErrorTrigger === 'string' ? [ownProps.clearErrorTrigger] : ownProps.clearErrorTrigger || ['onFocus'];

  var isValidated = _lodash2.default.get(state, 'form.' + formName + '.fields.' + fieldName + '.validated', false);
  var isSubmitting = _lodash2.default.get(state, 'form.' + formName + '.submitting', false);
  var shouldValidate = _lodash2.default.get(state, 'form.' + formName + '.fields.' + fieldName + '.shouldValidate', false);
  var isInitialized = _lodash2.default.get(state, 'form.' + formName + '.fields.' + fieldName + '.initialized', false);

  return {
    validators: ownProps.validators,
    affectsFields: ownProps.affectsFields,
    validateTrigger: validateTrigger,
    clearErrorTrigger: clearErrorTrigger,
    fieldName: fieldName,
    defaultValue: defaultValue,
    fieldValue: fieldValue,
    fieldErrors: fieldErrors,
    hasErrors: hasErrors,
    isReady: isReady,
    isValidated: isValidated,
    shouldValidate: shouldValidate,
    isSubmitting: isSubmitting,
    isInitialized: isInitialized
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initField: function initField(form, field, defaultValue) {
      dispatch((0, _FormActions.acInitField)(form, field, defaultValue));
    },
    validateField: function validateField(form, field, value) {
      var validators = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
      var affects = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

      // console.log(form, field, value, validators);
      dispatch((0, _FormActions.validateField)(form, field, value, validators, affects));
    },
    changeField: function changeField(form, field, value) {
      dispatch((0, _FormActions.acChangeField)(form, field, value));
    },
    clearValidation: function clearValidation(form, field) {
      dispatch((0, _FormActions.acClearValidation)(form, field));
    },
    setMounted: function setMounted(form, field, mounted) {
      dispatch((0, _FormActions.acSetMounted)(form, field, mounted));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Field);