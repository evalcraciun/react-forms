import React from 'react';
import { connect } from 'react-redux';

import { acChangeField, validateField } from '../actions/FormActions';

class Submit extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (!this.props.onClick || !this.props.onClick.call(this, event)) {
      if (this.props.isLoading || this.props.isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }

  render() {
    return (
      <button className={this.props.className + (this.props.isDisabled || this.props.isLoading ? ' disabled' : '')} onClick={this.handleSubmit.bind(this)}>
        {this.props.label}
      </button>
    );
  }
}

Submit.propTypes = {
  formName: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const form = state.form[formName];
  const hasErrors = (form && form.errors && Object.keys(form.errors).filter(fieldKey => form.fields && form.fields[fieldKey] && form.fields[fieldKey].mounted).length);
  let label = ownProps.label || 'Submit';
  const isLoading = (form && form.loading);

  if (isLoading) {
    label = ownProps.labelLoading || 'Loading...';
  } else if (hasErrors && ownProps.labelDisabled) {
    label = ownProps.labelDisabled;
  }

  return {
    isDisabled: hasErrors,
    isLoading,
    label,
  };
};

export default connect(mapStateToProps)(Submit);
