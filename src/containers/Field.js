import React from 'react';
import { connect } from 'react-redux';

import FieldError from './FieldError';

import { acChangeField, validateField, acClearValidation } from '../actions/FormActions';
import _ from 'lodash';

class Field extends React.Component {
  constructor() {
    super();
  }

  getFieldValue(key) {
    return _.isObject(this.props.fieldValue) ? _.get(this.props.fieldValue, key, '') : this.props.fieldValue;
  }

  render() {
    let classNames = ['formField'];

    if (this.props.hasErrors) {
      classNames.push('hasErrors');
    }

    if (this.props.className) {
      classNames.push(...(_.isArray(this.props.className) ?
        this.props.className :
        this.props.className.split(' ')))
    }

    return (
      <div className={classNames.join(' ')}>
        {this.renderChildren(this.props)}
      </div>
    )
  }

  /**
   * Binds Eventhandlers and props to native HTML elements
   *
   * @param props
   * @returns {*}
   */
  renderChildren(props) {
    return React.Children.map(props.children, child => {
      switch (child.type) {
        case 'input': {
          switch (child.props.type.toString().toLowerCase()) {
            case 'checkbox':
              return React.cloneElement(child, {
                onChange: (event) => {
                  const value = !!event.target.checked;
                  const field = event.target.name;

                  this.changeField(field, value);
                  this.validateField();
                  this.clearErrors();
                },
                checked: this.getFieldValue(_.get(child, 'props.name', null))
              });
            case 'radio':
              return React.cloneElement(child, {
                onChange: (event) => {
                  const field = event.target.name;
                  const value = document.querySelector(`input[name="${field}"]:checked`).value;

                  this.changeField(field, value);
                  this.validateField();
                  this.clearErrors();
                },
                checked: this.getFieldValue(_.get(child, 'props.name', null))
              });
            default:
              return React.cloneElement(child, {
                onChange: (event) => {
                  const value = event.target.value;
                  const field = event.target.name;

                  this.changeField(field, value);
                  this.clearErrors();
                },
                onBlur: (event) => {
                  this.validateField();
                },
                value: this.getFieldValue(_.get(child, 'props.name', null))
              });
          }
        }
        case 'select': {
          return React.cloneElement(child, {
            onChange: (event) => {
              const value = event.target.value;
              const field = event.target.name;

              this.changeField(field, value);
              this.validateField();
              this.clearErrors();
            },
            selected: this.getFieldValue(_.get(child, 'props.name', null))
          });
        }
        default:
          return React.cloneElement(child, {
            onChange: (event, value) => {
              const field = event.target.name;

              this.changeField(field, value);
              this.validateField();
              this.clearErrors();
            },
            value: this.getFieldValue(_.get(child, 'props.name', null))
          });

          return child;
      }
    });
  }

  changeField(key, value) {
    let newValue;

    if (key) {
      newValue = {
        ...this.props.fieldValue,
      };

      _.set(newValue, key, value);
    } else {
      newValue = value;
    }

    const formName = this.props.formName;
    const fieldName = this.props.fieldName;
    this.props.changeField(formName, fieldName, newValue);
  }

  validateField() {
    const formName = this.props.formName;
    const fieldName = this.props.fieldName;
    const validators = this.props.validators;
    this.props.validateField(formName, fieldName, this.props.fieldValue, validators);
  }

  clearErrors() {
    const formName = this.props.formName;
    const fieldName = this.props.fieldName;

    if (this.props.hasErrors) {
      this.props.clearValidation(formName, fieldName);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const fieldName = ownProps.fieldName;
  let fieldValue = '';

  if (state.form[formName] &&
    state.form[formName].fields &&
    state.form[formName].fields[ownProps.fieldName]) {
    fieldValue = state.form[formName].fields[ownProps.fieldName];
  }

  const fieldErrors = (state.form[formName] &&
    state.form[formName].errors &&
    state.form[formName].errors[fieldName] &&
    state.form[formName].errors[fieldName].length) ? state.form[formName].errors[fieldName] : [];

  const hasErrors = fieldErrors.length;

  return {
    validators: ownProps.validators,
    fieldName,
    fieldValue,
    fieldErrors,
    hasErrors,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateField: (form, field, value, validators = []) => {
      //console.log(form, field, value, validators);
      if (validators.length) {
        dispatch(validateField(form, field, value, validators));
      }
    },
    changeField: (form, field, value) => {
      //console.log(form, field, value);
      dispatch(acChangeField(form, field, value));
    },
    clearValidation: (form, field) => {
      dispatch(acClearValidation(form, field));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);