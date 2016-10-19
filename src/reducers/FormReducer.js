import { INIT_FORM, INIT_FIELD, CHANGE_FIELD, CLEAR_FORM, ATTACH_META, ATTACH_FIELD_META, VALIDATION_ERROR, SET_LOADING, SET_SUBMITTING, SET_VALIDATING, CLEAR_VALIDATION_ERROR } from '../actions/FormActions'

const initialState = {}

const formReducer = (state = initialState, action) => {
	switch (action.type) {
		// case "RESET_STATE": {
		// 	return {
		// 		...action.payload.form
		// 	}
		// }
    case INIT_FORM: {
      return {
        ...state,
        [action.form] : {
          errors: {},
          fields: {},
          meta: {},
          changed: true,
          loading: false,
          submitting: false,
        }
      };
    }
    case INIT_FIELD: {
      const form = state[action.form] ? state[action.form] : {
        errors: {},
        fields: {},
        meta: {},
        changed: true,
        loading: false,
        submitting: false,
      };
      const fields = state[action.form] && state[action.form].fields ? state[action.form].fields : {};

      return {
        ...state,
        [action.form] : {
          ...form,
          fields: {
            ...fields,
            [action.field]: {
              value: action.defaultValue,
              initialized: true,
              validated: false,
							shouldValidate: false,
              meta: {},
            }
          }
        }
      }
    }
		case CHANGE_FIELD: {
			let fields = state[action.form].fields
			return {
				...state,
				[action.form] : {
					...state[action.form],
					changed : true,
					fields: {
						...fields,
						[action.field] : {
              ...fields[action.field],
              value: action.value,
              validated: false,
            }
					}
				}
			}
		}
		case ATTACH_META: {
			return {
				...state,
				[action.form] : {
					...state[action.form],
					meta: action.meta
				}
			}
		}
    case ATTACH_FIELD_META: {
      return {
        ...state,
        [action.form] : {
          ...state[action.form],
          fields: {
            ...state[action.form].fields,
            [action.field]: {
              ...state[action.form].fields[action.field],
              meta: action.meta
            }
          }
        }
      }
    }
		case VALIDATION_ERROR: {
			return {
				...state,
				[action.form] : {
					...state[action.form],
					errors: {
						...state[action.form].errors,
						[action.field] : action.errors,
					},
          fields: {
            ...state[action.form].fields,
            [action.field]: {
              ...state[action.form].fields[action.field],
              validated: true,
							shouldValidate: false
            }
          }
				}
			}
		}
    case SET_LOADING: {
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          loading: !!action.loading,
        }
      }
    }
    case SET_SUBMITTING: {
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          submitting: !!action.submitting,
        }
      }
    }
		case SET_VALIDATING: {
			return {
				...state,
				[action.form] : {
					...state[action.form],
          fields: {
            ...state[action.form].fields,
            [action.field]: {
              ...state[action.form].fields[action.field],
              shouldValidate: !!action.validating
            }
          }
				}
			}
		}
		case CLEAR_VALIDATION_ERROR: {
		  let newErrors = {};
		  if (state[action.form] && state[action.form].errors) {
				if (action.field in state[action.form].errors) {
				  let { [action.field]: removed, ...rest} = state[action.form].errors;
					newErrors = rest;
	      } else {
	        newErrors = state[action.form].errors;
				}
      }

		  return {
				...state,
				[action.form] : {
					...state[action.form],
					errors: newErrors,
          fields: {
            ...state[action.form].fields,
            [action.field]: {
              ...state[action.form].fields[action.field],
              validated: true,
							shouldValidate: false
            }
          }
				}
			}
		}
		case CLEAR_FORM: {
			if (state[action.name]) {
			  const { [action.name]: removed, ...newState } = state;
				return {
          ...newState
        }
			}
			return state
		}
		default:
			return state;
	}

}

export default formReducer
