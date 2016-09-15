'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _FormActions = require('../actions/FormActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      console.log(event);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.initForm(this.props.formFields);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.clearForm();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'luvago-react-form', onSubmit: this.handleSubmit.bind(this) },
        this.renderChildren(this.props)
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(props) {
      var _this2 = this;

      return _react2.default.Children.map(props.children, function (child) {
        if (child.type === _Field2.default) {
          return _react2.default.cloneElement(child, {
            form: _this2
          });
        } else {
          return child;
        }
      });
    }
  }]);

  return Form;
}(_react2.default.Component);

Form.propTypes = {
  formName: _react2.default.PropTypes.string,
  formFields: _react2.default.PropTypes.object,
  formErrors: _react2.default.PropTypes.object
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formName = ownProps.formName;
  var stateForm = state.form[formName];
  var initialData = ownProps.initialData || {};

  var formFields = _extends({}, initialData);

  var formErrors = {};

  if (stateForm) {
    formFields = stateForm.fields || {};
    formErrors = stateForm.errors || {};
  }

  // traverse all children
  var children = _react2.default.Children.toArray(ownProps.children);
  while (children.length) {
    var child = children.pop();

    if (child.type === _Field2.default) {
      formFields[child.props.name] = child.props.value;
    } else {
      if (child.props.children) {
        children.push.apply(children, _toConsumableArray(_react2.default.Children.toArray(child.props.children)));
      }
    }
  }

  return {
    formName: formName,
    formFields: formFields,
    formErrors: formErrors
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, getState) {
  var formName = getState.formName;
  return {
    initForm: function initForm(fields) {
      dispatch((0, _FormActions.initForm)(formName, fields));
    },
    clearForm: function clearForm() {
      dispatch((0, _FormActions.acClearForm)(formName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Form);