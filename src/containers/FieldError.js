import React from 'react';
import { connect } from 'react-redux';

import { acChangeField, validateField } from '../actions/FormActions';

class FieldError extends React.Component {
  render() {
    const classes = ['validationFieldError'];
    
    if (this.props.className) {
      classes.push(...this.props.className.split(' '));
    }

    return (
      <span className={classes.join(' ')}>
        {this.props.errors.join(' ')}
      </span>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let errors = [];
  const formName = ownProps.formName;
  const fieldName = ownProps.fieldName;
  const formState = state.form[formName];

  if (formState && formState.errors && Object.keys(formState.errors).length) {
    const fieldErrors = formState.errors[fieldName];

    if (fieldErrors) {
      errors = fieldErrors.map(fieldError => fieldError.text);
    }
  }

  return {
    errors,
  }
};

FieldError.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FieldError);
