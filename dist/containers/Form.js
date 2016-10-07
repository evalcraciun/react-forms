'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _FormActions = require('../actions/FormActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      this.props.setSubmitting(true);
      event.preventDefault();
      return false;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.step || this.props.step == 1) {
        this.props.initForm(this.props.formName);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.props.step) {
        this.props.clearForm();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isSubmitting) {
        // can't submit when there's errors
        //console.log("hasErrors?", !!nextProps.hasErrors);
        if (!nextProps.hasErrors) {
          var allFieldsValidated = true;

          // can't submit when there's unvalidated fields
          Object.keys(nextProps.formFields).forEach(function (fieldName) {
            var field = nextProps.formFields[fieldName];
            if (!field.validated) {
              allFieldsValidated = false;
            }
          });

          if (allFieldsValidated) {
            // no errors, all fields validated, call submit
            this.props.setSubmitting(false);
            this.props.onSubmit(nextProps.formValues);
          }
        } else {
          this.props.setSubmitting(false);
        }
      }

      if (!!nextProps.shouldBeLoading !== nextProps.isLoading) {
        this.props.setLoading(nextProps.shouldBeLoading);

        if (this.props.onFinishLoading) {
          this.props.onFinishLoading();
        }
      }

      /*if (this.props.onSubmit && !this.props.hasErrors) {
       return this.props.onSubmit(event, this.props.formData);
       }
      */
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { className: 'luvago-react-form', onSubmit: this.handleSubmit.bind(this) },
        this.props.children
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

Form.propTypes = {
  formName: _react2.default.PropTypes.string.isRequired,
  shouldBeLoading: _react2.default.PropTypes.bool,
  onFinishLoading: _react2.default.PropTypes.func,
  onSubmit: _react2.default.PropTypes.func
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formName = ownProps.formName;
  var shouldBeLoading = ownProps.shouldBeLoading;

  var stateForm = state.form[formName];
  var formFields = stateForm ? stateForm.fields : {};
  var formValues = _lodash2.default.mapValues(formFields, function (field) {
    return field.value;
  });

  var hasErrors = stateForm && stateForm.errors && Object.keys(stateForm.errors).length;
  var isLoading = stateForm && stateForm.loading;
  var isSubmitting = stateForm && stateForm.submitting;

  return {
    hasErrors: hasErrors,
    shouldBeLoading: shouldBeLoading,
    isLoading: isLoading,
    isSubmitting: isSubmitting,
    formFields: formFields,
    formValues: formValues
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, getState) {
  var formName = getState.formName;
  return {
    initForm: function initForm(formName) {
      dispatch((0, _FormActions.initForm)(formName));
    },
    setLoading: function setLoading(bool) {
      dispatch((0, _FormActions.acSetLoading)(formName, bool));
    },
    setSubmitting: function setSubmitting(bool) {
      dispatch((0, _FormActions.acSetSubmitting)(formName, bool));
    },
    clearForm: function clearForm() {
      dispatch((0, _FormActions.acClearForm)(formName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Form);