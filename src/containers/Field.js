import React from 'react';
import { connect } from 'react-redux';

import FieldError from './FieldError';

import { acChangeField, validateField } from '../actions/FormActions';

class Field extends React.Component {
  componentDidMount() {
    if (!this.props.form) {
      throw new Error('Field must be inside a Form');
    }
  }

  onInputChanged(event) {
    console.log(event);
    const value = event.target.value;
    const field = event.target.name;

    this.props.changeField(field, value);
    this.props.validateField(field, value);
  }

  onSelectChanged(event) {
    const value = event.target.value;
    const field = event.target.name;

    this.props.changeField(field, value);
    this.props.validateField(field, value);
  }

  onRadioChanged(event) {
    const field = event.target.name;
    const value = document.querySelector(`input[name="${field}"]:checked`).value;

    this.props.changeField(field, value);
    this.props.validateField(field, value);
  }

  onCheckboxChanged(event) {
    const value = !!event.target.checked;
    const field = event.target.name;

    this.props.changeField(field, value);
    this.props.validateField(field, value);
  }

  render() {
    return (
      <div className="luvago-react-form-field">
        {this.renderChildren(this.props)}
      </div>
    )
  }

  /**
   * Binds Eventhandlers and props to native HTML elements
   *
   * @param props
   * @returns {*}
   */
  renderChildren(props) {
    return React.Children.map(props.children, child => {
      switch (child.type) {
        case 'input': {
          console.log(child);
          switch (child.props.type.toString().toLowerCase()) {
            case 'checkbox':
              return React.cloneElement(child, {
                onChange: this.onCheckboxChanged.bind(this)
              });
            case 'radio':
              return React.cloneElement(child, {
                onChange: this.onRadioChanged.bind(this)
              });
            case 'file': // TODO
            default:
              return React.cloneElement(child, {
                onChange: this.onInputChanged.bind(this)
              });
          }
        }
        case 'select': {
          return React.cloneElement(child, {
            onChange: this.onSelectChanged.bind(this)
          });
        }
        case FieldError: {
          return React.cloneElement(child, {
            formName: this.props.formName,
          });
        }
        default:
          return child;
      }
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const form = ownProps.form;
  const formName = ownProps.form.props.formName;
  const validators = ownProps.form.props.validators;

  return {
    form,
    validators,
    formName,
  }
};

const mapDispatchToProps = (dispatch, getState) => {
  const formName = getState.form.props.formName;
  const validators = getState.form.props.validators;

  return {
    validateField: (field, value) => {
      if (validators[field] && validators[field].length > 0) {
        dispatch(validateField(formName, field, value, validators[field]))
      }
    },
    changeField: (field, value) => {
      dispatch(acChangeField(formName, field, value))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);