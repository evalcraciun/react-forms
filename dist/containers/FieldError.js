'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldError = function (_React$Component) {
  _inherits(FieldError, _React$Component);

  function FieldError() {
    _classCallCheck(this, FieldError);

    return _possibleConstructorReturn(this, (FieldError.__proto__ || Object.getPrototypeOf(FieldError)).apply(this, arguments));
  }

  _createClass(FieldError, [{
    key: 'render',
    value: function render() {
      var classes = ['validationFieldError'];

      if (this.props.className) {
        classes.push.apply(classes, _toConsumableArray(this.props.className.split(' ')));
      }

      if (!this.props.errors.length) {
        return _react2.default.createElement('span', null);
      }

      return _react2.default.createElement(
        'span',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'span',
          null,
          this.props.errors.join(' ')
        )
      );
    }
  }]);

  return FieldError;
}(_react2.default.Component);

FieldError.propTypes = {
  className: _react2.default.PropTypes.any,
  errors: _react2.default.PropTypes.array
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var errors = [];
  var formName = ownProps.formName;
  var fieldName = ownProps.fieldName;
  var formState = state.form[formName];

  if (formState && formState.errors && Object.keys(formState.errors).length) {
    var fieldErrors = formState.errors[fieldName];

    if (fieldErrors) {
      errors = fieldErrors.map(function (fieldError) {
        return fieldError.text;
      });
    }
  }

  return {
    errors: errors
  };
};

FieldError.propTypes = {
  fieldName: _react2.default.PropTypes.string.isRequired,
  formName: _react2.default.PropTypes.string.isRequired
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FieldError);