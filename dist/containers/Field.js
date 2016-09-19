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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_React$Component) {
  _inherits(Field, _React$Component);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));
  }

  _createClass(Field, [{
    key: 'getFieldValue',
    value: function getFieldValue(key) {
      return _lodash2.default.isObject(this.props.fieldValue) ? _lodash2.default.get(this.props.fieldValue, key, '') : this.props.fieldValue;
    }
  }, {
    key: 'render',
    value: function render() {
      var classNames = ['formField'];

      if (this.props.hasErrors) {
        classNames.push('hasErrors');
      }

      if (this.props.className) {
        classNames.push.apply(classNames, _toConsumableArray(_lodash2.default.isArray(this.props.className) ? this.props.className : this.props.className.split(' ')));
      }

      return _react2.default.createElement(
        'div',
        { className: classNames.join(' ') },
        this.renderChildren(this.props)
      );
    }

    /**
     * Binds Eventhandlers and props to native HTML elements
     *
     * @param props
     * @returns {*}
     */

  }, {
    key: 'renderChildren',
    value: function renderChildren(props) {
      var _this2 = this;

      return _react2.default.Children.map(props.children, function (child) {
        switch (child.type) {
          case 'input':
            {
              switch (child.props.type.toString().toLowerCase()) {
                case 'checkbox':
                  return _react2.default.cloneElement(child, {
                    onChange: function onChange(event) {
                      var value = !!event.target.checked;
                      var field = event.target.name;

                      _this2.changeField(field, value);
                      _this2.validateField();
                      _this2.clearErrors();
                    },
                    checked: _this2.getFieldValue(_lodash2.default.get(child, 'props.name', null))
                  });
                case 'radio':
                  return _react2.default.cloneElement(child, {
                    onChange: function onChange(event) {
                      var field = event.target.name;
                      var value = document.querySelector('input[name="' + field + '"]:checked').value;

                      _this2.changeField(field, value);
                      _this2.validateField();
                      _this2.clearErrors();
                    },
                    checked: _this2.getFieldValue(_lodash2.default.get(child, 'props.name', null))
                  });
                default:
                  return _react2.default.cloneElement(child, {
                    onChange: function onChange(event) {
                      var value = event.target.value;
                      var field = event.target.name;

                      _this2.changeField(field, value);
                      _this2.clearErrors();
                    },
                    onBlur: function onBlur(event) {
                      _this2.validateField();
                    },
                    value: _this2.getFieldValue(_lodash2.default.get(child, 'props.name', null))
                  });
              }
            }
          case 'select':
            {
              return _react2.default.cloneElement(child, {
                onChange: function onChange(event) {
                  var value = event.target.value;
                  var field = event.target.name;

                  _this2.changeField(field, value);
                  _this2.validateField();
                  _this2.clearErrors();
                },
                selected: _this2.getFieldValue(_lodash2.default.get(child, 'props.name', null))
              });
            }
          default:
            return _react2.default.cloneElement(child, {
              onChange: function onChange(event, value) {
                var field = event.target.name;

                _this2.changeField(field, value);
                _this2.validateField();
                _this2.clearErrors();
              },
              value: _this2.getFieldValue(_lodash2.default.get(child, 'props.name', null))
            });

            return child;
        }
      });
    }
  }, {
    key: 'changeField',
    value: function changeField(key, value) {
      var newValue = void 0;

      if (key) {
        newValue = _extends({}, this.props.fieldValue);

        _lodash2.default.set(newValue, key, value);
      } else {
        newValue = value;
      }

      var formName = this.props.formName;
      var fieldName = this.props.fieldName;
      this.props.changeField(formName, fieldName, newValue);
    }
  }, {
    key: 'validateField',
    value: function validateField() {
      var formName = this.props.formName;
      var fieldName = this.props.fieldName;
      var validators = this.props.validators;
      this.props.validateField(formName, fieldName, this.props.fieldValue, validators);
    }
  }, {
    key: 'clearErrors',
    value: function clearErrors() {
      var formName = this.props.formName;
      var fieldName = this.props.fieldName;

      if (this.props.hasErrors) {
        this.props.clearValidation(formName, fieldName);
      }
    }
  }]);

  return Field;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formName = ownProps.formName;
  var fieldName = ownProps.fieldName;
  var fieldValue = '';

  if (state.form[formName] && state.form[formName].fields && state.form[formName].fields[ownProps.fieldName]) {
    fieldValue = state.form[formName].fields[ownProps.fieldName];
  }

  var fieldErrors = state.form[formName] && state.form[formName].errors && state.form[formName].errors[fieldName] && state.form[formName].errors[fieldName].length ? state.form[formName].errors[fieldName] : [];

  var hasErrors = fieldErrors.length;

  return {
    validators: ownProps.validators,
    fieldName: fieldName,
    fieldValue: fieldValue,
    fieldErrors: fieldErrors,
    hasErrors: hasErrors
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    validateField: function validateField(form, field, value) {
      var validators = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

      //console.log(form, field, value, validators);
      if (validators.length) {
        dispatch((0, _FormActions.validateField)(form, field, value, validators));
      }
    },
    changeField: function changeField(form, field, value) {
      //console.log(form, field, value);
      dispatch((0, _FormActions.acChangeField)(form, field, value));
    },
    clearValidation: function clearValidation(form, field) {
      dispatch((0, _FormActions.acClearValidation)(form, field));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Field);