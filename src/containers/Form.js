import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Field from './Field';

import { initForm, acClearForm, acSetSubmitting } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    this.props.setSubmitting(true);
    event.preventDefault();
    return false;
  }

  componentDidMount() {
    this.props.initForm();
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmitting) {
      // can't submit when there's errors
      //console.log("hasErrors?", !!nextProps.hasErrors);
      if (!nextProps.hasErrors) {
        let allFieldsValidated = true;

        // can't submit when there's unvalidated fields
        Object.keys(nextProps.formFields).forEach(fieldName => {
          const field = nextProps.formFields[fieldName];
          if (!field.validated) {
            allFieldsValidated = false;
          }
        });

        //console.log("validated fields?", allFieldsValidated);

        if (allFieldsValidated) {
          // no errors, all fields validated, call submit
          this.props.setSubmitting(false);
          this.props.onSubmit(nextProps.formValues);
        }

      }
    }
    /*if (this.props.onSubmit && !this.props.hasErrors) {
     return this.props.onSubmit(event, this.props.formData);
     }
*/
   }

  render() {
    return (
      <form className="luvago-react-form" onSubmit={this.handleSubmit.bind(this)}>
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  formName: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;

  const stateForm = state.form[formName];
  const formFields = stateForm ? stateForm.fields : {};
  const formValues = _.mapValues(formFields, field => field.value);

  const hasErrors = (stateForm && stateForm.errors && Object.keys(stateForm.errors).length);
  const isLoading = (stateForm && stateForm.loading);
  const isSubmitting = (stateForm && stateForm.submitting);

  return {
    hasErrors,
    isLoading,
    isSubmitting,
    formFields,
    formValues,
  }
};

const mapDispatchToProps = (dispatch, getState) => {
  const formName = getState.formName;
  return {
    initForm: () => {
      dispatch(initForm(formName))
    },
    setSubmitting: (bool) => {
      dispatch(acSetSubmitting(formName, bool))
    },
    clearForm: () => {
      dispatch(acClearForm(formName))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);