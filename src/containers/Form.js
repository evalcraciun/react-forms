import React from 'react';
import { connect } from 'react-redux';

import Field from './Field';

import { initForm, acClearForm } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    if (this.props.handleSubmit && !this.props.hasErrors) {
      return this.props.handleSubmit(event);
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
  formName: React.PropTypes.string,
  formFields: React.PropTypes.object,
  formErrors: React.PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;

  const stateForm = state.form[formName];
  const initialData = ownProps.initialData || {};

  const hasErrors = (stateForm && stateForm.errors && Object.keys(stateForm.errors).length);
  const isLoading = (stateForm && stateForm.loading);

  return {
    hasErrors,
    isLoading,
    initialData,
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