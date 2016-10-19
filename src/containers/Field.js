import React from 'react';
import { connect } from 'react-redux';

import FieldError from './FieldError';

import { acChangeField, validateField, acClearValidation, acInitField } from '../actions/FormActions';
import _ from 'lodash';

const elementTypesOnChangeValidation = ['select'];

class Field extends React.Component {
  getFieldValue(key) {
    return _.isObject(this.props.fieldValue) ? _.get(this.props.fieldValue, key, '') : this.props.fieldValue;
  }

  componentDidMount() {
    if (!this.props.isInitialized && this.props.isReady !== false) {
      this.props.initField(this.props.formName, this.props.fieldName, this.props.defaultValue);
    }
  }

  componentWillReceiveProps(nextProps) {
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

  injectChild(element) {
    const elementType = element.type;

    const keyName = _.get(element, 'props.name', null);
    const isObjValue = _.isObject(this.props.fieldValue) && this.props.fieldValue.constructor === Object;

    const errorClassName = this.props.errorClassName || 'has-error';

    // set the initial value depending on whether the fields value is an object or not
    let initialValue = null;
    if (isObjValue && !keyName) {
      initialValue = null;
      console.warn('missing input name for a value structure that is an object');
    } else {
      initialValue = isObjValue ? this.props.fieldValue[keyName] : this.props.fieldValue;
    }

    const cloneProps = {};
    cloneProps.value = initialValue || '';

    let processFunc = (event, value) => value;

    const processFuncAttrs = ['processFunc', 'data-processFunc'];

    processFuncAttrs.forEach(attr => {
      const func = _.get(element.props, attr, null);

      if (typeof func == 'function') {
        processFunc = func;
        return false;
      }
    });

    cloneProps.onChange = (event, value) => {
      if (typeof value === 'undefined') {
        value = event.target.value;
      }

      this.changeField(keyName, processFunc(event, value));
      if (elementType in elementTypesOnChangeValidation) {
        this.validateField();
      }
    };

    if (this.props.validateTrigger) {
      this.props.validateTrigger.forEach(trigger => {
        cloneProps[trigger] = () => {
          this.validateField();
        };
      });
    }

    if (this.props.clearErrorTrigger) {
      this.props.clearErrorTrigger.forEach(trigger => {
        cloneProps[trigger] = () => {
          this.clearValidation();
        };
      });
    }

    const classes = [];

    if (element.props.className) {
      classes.push(...element.props.className.split(' '));
    }

    if (this.props.hasErrors) {
      classes.push(errorClassName);
    }

    cloneProps.className = classes.join(' ');

    return React.cloneElement(element, {
      ...cloneProps,
    });
  }

  changeField(key, value) {
    let promise;
    if (typeof value === 'function') {
      value
        .then(value => {
          let newValue;

          if (key) {
            newValue = {
              ...this.props.fieldValue,
              [key]: value,
            };
          } else {
            newValue = value;
          }

          const formName = this.props.formName;
          const fieldName = this.props.fieldName;
          this.props.changeField(formName, fieldName, newValue);
        });
    } else {
      const formName = this.props.formName;
      const fieldName = this.props.fieldName;

      let newValue;

      if (key) {
        newValue = {
          ...this.props.fieldValue,
          [key]: value,
        };
      } else {
        newValue = value;
      }

      this.props.changeField(formName, fieldName, newValue);
    }
  }

  validateField() {
    this.props.validateField(
      this.props.formName,
      this.props.fieldName,
      this.props.fieldValue,
      this.props.validators,
      this.props.affectsFields
    );
  }

  clearValidation() {
    if (this.props.hasErrors) {
      this.props.clearValidation(
        this.props.formName,
        this.props.fieldName
      );
    }
  }

  clearErrors() {
    const formName = this.props.formName;
    const fieldName = this.props.fieldName;

    if (this.props.hasErrors) {
      this.props.clearValidation(formName, fieldName);
    }
  }

  render() {
    const errorClassName = _.get(this, 'props.errorClassName', 'has-error');
    const classes = ['formField', ...this.props.className.split(' ')];

    if (this.props.hasErrors) {
      classes.push(errorClassName);
    }

    return (
      <div className={classes.join(' ')}>
        {React.Children.map(this.props.children, child => this.injectChild(child))}
      </div>
    );
  }
}

Field.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  processFunc: React.PropTypes.func,
  validators: React.PropTypes.array,
  validateTrigger: React.PropTypes.any,
  clearErrorTrigger: React.PropTypes.any,
  affectsFields: React.PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const fieldName = ownProps.fieldName;
  const isReady = ownProps.isReady;
  const fieldValue = _.get(state, `form.${formName}.fields.${fieldName}.value`);

  const fieldErrors = (state.form[formName] &&
    state.form[formName].errors &&
    state.form[formName].errors[fieldName] &&
    state.form[formName].errors[fieldName].length) ? state.form[formName].errors[fieldName] : [];

  const hasErrors = fieldErrors.length;
  const defaultValue = typeof ownProps.defaultValue === 'undefined' ? null : ownProps.defaultValue;

  const validateTrigger = typeof ownProps.validateTrigger !== 'undefined' && typeof ownProps.validateTrigger === 'string' ?
    [ownProps.validateTrigger] :
    (ownProps.validateTrigger || ['onBlur']);

  const clearErrorTrigger = typeof ownProps.clearErrorTrigger !== 'undefined' && typeof ownProps.clearErrorTrigger === 'string' ?
    [ownProps.clearErrorTrigger] :
    (ownProps.clearErrorTrigger || ['onFocus']);

  const isValidated = _.get(state, `form.${formName}.fields.${fieldName}.validated`, false);
  const isSubmitting = _.get(state, `form.${formName}.submitting`, false);
  const shouldValidate = _.get(state, `form.${formName}.fields.${fieldName}.shouldValidate`, false);
  const isInitialized = _.get(state, `form.${formName}.fields.${fieldName}.initialized`, false);

  return {
    validators: ownProps.validators,
    affectsFields: ownProps.affectsFields,
    validateTrigger,
    clearErrorTrigger,
    fieldName,
    defaultValue,
    fieldValue,
    fieldErrors,
    hasErrors,
    isReady,
    isValidated,
    shouldValidate,
    isSubmitting,
    isInitialized,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initField: (form, field, defaultValue) => {
      dispatch(acInitField(form, field, defaultValue));
    },
    validateField: (form, field, value, validators = [], affects = []) => {
      // console.log(form, field, value, validators);
      dispatch(validateField(form, field, value, validators, affects));
    },
    changeField: (form, field, value) => {
      dispatch(acChangeField(form, field, value));
    },
    clearValidation: (form, field) => {
      dispatch(acClearValidation(form, field));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
