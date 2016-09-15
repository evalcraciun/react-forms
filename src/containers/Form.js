import React from 'react';
import { connect } from 'react-redux';

import Field from './Field';

import { initForm, acClearForm } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    console.log(event);
  }

  componentDidMount() {
    console.log(this.props.initialData);
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

  let errors = {};
  let fields = {
    ...initialData,
  };

  if (stateForm) {
    errors = stateForm.errors || {};
    fields = stateForm.fields || {};
  }

  return {
    fields,
    errors,
  }
};

const mapDispatchToProps = (dispatch, getState) => {
  const formName = getState.formName;
  return {
    initForm: (fields) => {
      console.log(formName, fields);
      dispatch(initForm(formName, fields))
    },
    clearForm: () => {
      dispatch(acClearForm(formName))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);