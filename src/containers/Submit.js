import React from 'react';
import { connect } from 'react-redux';

import { acChangeField, validateField } from '../actions/FormActions';

class Submit extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (this.props.isLoading || this.props.isDisabled) {
      return false;
    }
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.handleSubmit}>
        {this.renderLabel()}
      </button>
    );
  }

  renderLabel() {
    if (this.props.isLoading) {
      return this.props.labelLoading;
    } else if (this.props.isDisabled) {
      return this.props.labelDisabled;
    } else {
      return this.props.label;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const form = state.form[formName];
  const hasErrors = (form && form.errors && Object.keys(form.errors).length);

  const label = ownProps.label || 'Send';
  const labelLoading = ownProps.labelLoading || 'Loading...';
  const labelDisabled = ownProps.labelDisabled || label;

  const isLoading = (form && form.loading);

  return {
    isDisabled: hasErrors,
    isLoading,
    label,
    labelLoading,
    labelDisabled,
  };
};

export default connect(mapStateToProps)(Submit);