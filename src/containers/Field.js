import React from 'react';
import { connect } from 'react-redux';

import FieldError from './FieldError';

import { acChangeField, validateField, acClearValidation } from '../actions/FormActions';
import _ from 'lodash';

const elementTypesOnChangeValidation = ['select'];

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
        {React.Children.map(this.props.children, child => this.injectChild(child))}
      </div>
    )
  }

  injectChild(element) {
    const elementType = element.type;

    const keyName = _.get(element, 'props.name', null);
    const isObjValue = _.isObject(this.props.fieldValue);

    // set the initial value depending on whether the fields value is an object or not
    let initialValue = null;
    if (isObjValue && !keyName) {
      initialValue = null;
      console.warn('missing input name for a value structure that is an object');
    } else {
      initialValue = isObjValue ? this.props.fieldValue[keyName] : this.props.fieldValue;
    }

    let cloneProps = {};
    cloneProps.value = initialValue;

    if (elementType in elementTypesOnChangeValidation) {
      cloneProps.onChange = (event, value) => {
        if (typeof value === 'undefined') {
          value = event.target.value;
        }

        this.changeField(event.target.name, value);
        this.validateField();
      };
    } else {
      cloneProps.onChange = (event, value) => {
        if (typeof value === 'undefined') {
          value = event.target.value;
        }

        this.changeField(event.target.name, value);
      };
      cloneProps.onBlur = () => {
        this.validateField();
      }
    }

    return React.cloneElement(element, {
      ...cloneProps,
    })
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
    this.props.validateField(
      this.props.formName,
      this.props.fieldName,
      this.props.fieldValue,
      this.props.validators
    );
  }

  clearErrors() {
    const formName = this.props.formName;
    const fieldName = this.props.fieldName;

    if (this.props.hasErrors) {
      this.props.clearValidation(formName, fieldName);
    }
  }
}

Field.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
};

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
