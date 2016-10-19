import _ from 'lodash';

export const getFieldValue = (state, formName, fieldName, defaultValue) =>
  _.get(state, `form[${formName}].fields[${fieldName}].value`, defaultValue);
