import React from 'react';
import { connect } from 'react-redux';

import { acChangeField, validateField } from '../actions/FormActions';

class FieldError extends React.Component {
  componentDidMount() {
    if (!this.props.formName) {
      throw new Error('FieldError must be inside a Form');
    }
  }
  render() {
    return (<span>{this.props.errors.join(' ')}</span>);
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

export default connect(mapStateToProps)(FieldError);