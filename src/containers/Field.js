import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { acChangeField, validateField, acSetValidateState, acInitField, acSetMounted } from '../actions/FormActions';

class Field extends React.Component {
  getFieldValue(key) {
    return _.isObject(this.props.fieldValue) ? _.get(this.props.fieldValue, key, '') : this.props.fieldValue;
  }

  componentDidMount() {
    if (!this.props.isInitialized) {
      if (this.props.isReady !== false) {
        this.props.initField(this.props.formName, this.props.fieldName, this.props.defaultValue);
      }
    } else {
      this.props.setMounted(this.props.formName, this.props.fieldName, true);
    }
  }

  componentWillUnmount() {
    this.props.setMounted(this.props.formName, this.props.fieldName, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmitting && nextProps.validation !== 'VALIDATED' && nextProps.validation !== 'RUNNING') {
      this.validateField();
    }

    if (!nextProps.isInitialized && nextProps.isReady !== false) {
      this.props.initField(nextProps.formName, nextProps.fieldName, nextProps.defaultValue);
    }

    if (this.props.validation !== 'PENDING' && nextProps.validation === 'PENDING') {
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
      initialValue = this.props.fieldValue;
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

    cloneProps.onChange = (event, value, meta) => {
      if (typeof value === 'undefined') {
        value = event.target.value;
      }

      this.changeField(keyName, processFunc(event, value), meta);

      // fixme: oh god
      setTimeout(() => {
        this.validateField();
      }, 0)
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

    cloneProps['data-errors'] = this.props.fieldErrors;
    cloneProps.className = classes.join(' ');

    return React.cloneElement(element, {
      ...cloneProps,
    });
  }

  changeField(key, value, meta) {
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
          this.props.changeField(formName, fieldName, newValue, meta);
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

      this.props.changeField(formName, fieldName, newValue, meta);
    }
  }

  validateField() {
    this.props.validateField(
      this.props.formName,
      this.props.fieldName,
      this.props.fieldValue,
      this.props.fieldMeta,
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

  render() {
    const errorClassName = _.get(this, 'props.errorClassName', 'has-error');
    const className = this.props.className || '';
    const classes = ['formField', ...className.split(' ')];

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
  validation: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const fieldName = ownProps.fieldName;
  const isReady = ownProps.isReady;
  const fieldValue = _.get(state, `form["${formName}"].fields["${fieldName}"].value`);
  const fieldMeta = _.get(state, `form["${formName}"].fields["${fieldName}"].meta`);

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

  const validation = _.get(state, `form["${formName}"].fields["${fieldName}"].validation`, 'UNKNOWN');
  const isInitialized = _.get(state, `form["${formName}"].fields["${fieldName}"].initialized`, false);
  const isSubmitting = _.get(state, `form["${formName}"].submitting`, false);

  return {
    validators: ownProps.validators,
    affectsFields: ownProps.affectsFields,
    validateTrigger,
    clearErrorTrigger,
    fieldName,
    defaultValue,
    fieldValue,
    fieldMeta,
    fieldErrors,
    hasErrors,
    isReady,
    validation,
    isInitialized,
    isSubmitting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initField: (form, field, defaultValue) => {
      dispatch(acInitField(form, field, defaultValue));
    },
    validateField: (form, field, value, meta, validators = [], affects = []) => {
      // console.log(form, field, value, validators);
      dispatch(validateField(form, field, value, meta, validators, affects));
    },
    changeField: (form, field, value, meta) => {
      dispatch(acChangeField(form, field, value, meta));
    },
    clearValidation: (form, field) => {
      dispatch(acSetValidateState(form, field, 'UNKNOWN'));
    },
    setMounted: (form, field, mounted) => {
      dispatch(acSetMounted(form, field, mounted));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
