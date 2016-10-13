import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import Field from './Field';

import { initForm, acClearForm, acSetSubmitting, acSetLoading } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    this.props.setSubmitting(true);
    event.preventDefault();
    return false;
  }

  componentDidMount() {
    if (!this.props.step || this.props.step == 1) {
      this.props.initForm(this.props.formName);
    }
  }

  componentWillUnmount() {
    if (!this.props.step) {
      this.props.clearForm();
    }
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

        if (allFieldsValidated) {
          // no errors, all fields validated, call submit
          this.props.setSubmitting(false);

          if (this.props.onSubmit) {
            this.props.onSubmit(nextProps.formValues);
          } else {
            console.warn("luvago-react-forms: No onSubmit Callback defined");
            console.log("form values:", nextProps.formValues);
          }
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
  shouldBeLoading: React.PropTypes.bool,
  onFinishLoading: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const shouldBeLoading = ownProps.shouldBeLoading;

  const stateForm = state.form[formName];
  const formFields = stateForm ? stateForm.fields : {};
  const formValues = _.mapValues(formFields, field => field.value);

  const hasErrors = (stateForm && stateForm.errors && Object.keys(stateForm.errors).length);
  const isLoading = (stateForm && stateForm.loading);
  const isSubmitting = (stateForm && stateForm.submitting);

  return {
    hasErrors,
    shouldBeLoading,
    isLoading,
    isSubmitting,
    formFields,
    formValues,
  }
};

const mapDispatchToProps = (dispatch, getState) => {
  const formName = getState.formName;
  return {
    initForm: (formName) => {
      dispatch(initForm(formName))
    },
    setLoading: (bool) => {
      dispatch(acSetLoading(formName, bool));
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
