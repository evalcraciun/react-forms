'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FormActions = require('../actions/FormActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Submit = function (_React$Component) {
  _inherits(Submit, _React$Component);

  function Submit() {
    _classCallCheck(this, Submit);

    var _this = _possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Submit, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      if (this.props.isLoading || this.props.isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { className: this.props.className + (this.props.isDisabled || this.props.isLoading ? ' disabled' : ''), onClick: this.handleSubmit },
        this.props.label
      );
    }
  }]);

  return Submit;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formName = ownProps.formName;
  var form = state.form[formName];
  var hasErrors = form && form.errors && Object.keys(form.errors).length;

  var label = ownProps.label || 'Submit';
  var isLoading = form && form.loading;

  if (isLoading) {
    label = ownProps.labelLoading || 'Loading...';
  } else if (hasErrors && ownProps.labelDisabled) {
    label = ownProps.labelDisabled;
  }

  return {
    isDisabled: hasErrors,
    isLoading: isLoading,
    label: label
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Submit);