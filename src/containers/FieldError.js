import React from 'react';
import { connect } from 'react-redux';

class FieldError extends React.Component {
  render() {
    if (!this.props.errors.length) {
      return <span>{this.props.children}</span>;
    }

    if (typeof this.props.renderFunc === 'function') {
      return <span>{this.props.renderFunc(this.props.errors)}</span>;
    }

    const classes = ['validationFieldError'];

    if (this.props.className) {
      classes.push(...this.props.className.split(' '));
    }

    return (
      <span className={classes.join(' ')}>
        <span>{this.props.errors.map(error => error.text).join(' ')}</span>
      </span>
    );
  }
}

FieldError.propTypes = {
  className: React.PropTypes.any,
  errors: React.PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.formName;
  const fieldName = ownProps.fieldName;
  const formState = state.form[formName];

  let errors = [];
  if (formState && formState.errors && Object.keys(formState.errors).length) {
    errors = formState.errors[fieldName] || [];
  }

  return {
    errors,
  };
};

FieldError.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FieldError);
