import React from 'react';
import { connect } from 'react-redux';

import Field from './Field';

import { initForm, acClearForm } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    if (this.props.onSubmit && !this.props.hasErrors) {
      return this.props.onSubmit(event, this.props.formData);
    }
    event.preventDefault();
    return false;
  }

  componentDidMount() {
    this.props.initForm(this.props.initialData || {});
  }

  componentWillUnmount() {
    this.props.clearForm();
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
  const initialData = ownProps.initialData || {};

  const hasErrors = (stateForm && stateForm.errors && Object.keys(stateForm.errors).length);
  const isLoading = (stateForm && stateForm.loading);

  const formData = stateForm ? stateForm.fields : initialData;

  return {
    hasErrors,
    isLoading,
    initialData,
    formData,
  }
};

const mapDispatchToProps = (dispatch, getState) => {
  const formName = getState.formName;
  return {
    initForm: (fields) => {
      dispatch(initForm(formName, fields))
    },
    clearForm: () => {
      dispatch(acClearForm(formName))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);