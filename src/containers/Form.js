import React from 'react';
import { connect } from 'react-redux';

import Field from './Field';

import { initForm, acClearForm } from '../actions/FormActions';

class Form extends React.Component {
  handleSubmit(event) {
    console.log(event);
  }

  componentDidMount() {
    this.props.initForm(this.props.formFields);
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  render() {
    return (
      <form className="luvago-react-form" onSubmit={this.handleSubmit.bind(this)}>
        {this.renderChildren(this.props)}
      </form>
    )
  }

  renderChildren(props) {
    return React.Children.map(props.children, child => {
      if (child.type === Field) {
        return React.cloneElement(child, {
          form: this,
        });
      } else {
        return child;
      }
    });
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

  let formFields = {
    ...initialData,
  };

  let formErrors = {};

  if (stateForm) {
    formFields = stateForm.fields || {};
    formErrors = stateForm.errors || {};
  }

  // traverse all children
  let children = React.Children.toArray(ownProps.children);
  while (children.length) {
    const child = children.pop();

    if (child.type === Field) {
      formFields[child.props.name] = child.props.value;
    } else {
      if (child.props.children) {
        children.push(...React.Children.toArray(child.props.children));
      }
    }
  }

  return {
    formName,
    formFields,
    formErrors,
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