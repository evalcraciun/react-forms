'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FieldError = require('./FieldError');

var _FieldError2 = _interopRequireDefault(_FieldError);

var _FormActions = require('../actions/FormActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.form) {
        throw new Error('Field must be inside a Form');
      }
    }
  }, {
    key: 'onInputChanged',
    value: function onInputChanged(event) {
      console.log(event);
      var value = event.target.value;
      var field = event.target.name;

      this.props.changeField(field, value);
      this.props.validateField(field, value);
    }
  }, {
    key: 'onSelectChanged',
    value: function onSelectChanged(event) {
      var value = event.target.value;
      var field = event.target.name;

      this.props.changeField(field, value);
      this.props.validateField(field, value);
    }
  }, {
    key: 'onRadioChanged',
    value: function onRadioChanged(event) {
      var field = event.target.name;
      var value = document.querySelector('input[name="' + field + '"]:checked').value;

      this.props.changeField(field, value);
      this.props.validateField(field, value);
    }
  }, {
    key: 'onCheckboxChanged',
    value: function onCheckboxChanged(event) {
      var value = !!event.target.checked;
      var field = event.target.name;

      this.props.changeField(field, value);
      this.props.validateField(field, value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'luvago-react-form-field' },
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
              console.log(child);
              switch (child.props.type.toString().toLowerCase()) {
                case 'checkbox':
                  return _react2.default.cloneElement(child, {
                    onChange: _this2.onCheckboxChanged.bind(_this2)
                  });
                case 'radio':
                  return _react2.default.cloneElement(child, {
                    onChange: _this2.onRadioChanged.bind(_this2)
                  });
                case 'file': // TODO
                default:
                  return _react2.default.cloneElement(child, {
                    onChange: _this2.onInputChanged.bind(_this2)
                  });
              }
            }
          case 'select':
            {
              return _react2.default.cloneElement(child, {
                onChange: _this2.onSelectChanged.bind(_this2)
              });
            }
          case _FieldError2.default:
            {
              return _react2.default.cloneElement(child, {
                formName: _this2.props.formName
              });
            }
          default:
            return child;
        }
      });
    }
  }]);

  return Field;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var form = ownProps.form;
  var formName = ownProps.form.props.formName;
  var validators = ownProps.form.props.validators;

  return {
    form: form,
    validators: validators,
    formName: formName
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, getState) {
  var formName = getState.form.props.formName;
  var validators = getState.form.props.validators;

  return {
    validateField: function validateField(field, value) {
      if (validators[field] && validators[field].length > 0) {
        dispatch((0, _FormActions.validateField)(formName, field, value, validators[field]));
      }
    },
    changeField: function changeField(field, value) {
      dispatch((0, _FormActions.acChangeField)(formName, field, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Field);