import { INIT_FORM, CHANGE_FIELD, CLEAR_FORM, ATTACH_REQUEST, VALIDATION_ERROR, CLEAR_VALIDATION_ERROR } from '../actions/FormActions'


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
				[action.name] : {
					fields: {
						...action.initialFields
					},
					changed: false,
					id: action.id
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
						[action.field] : action.value
					}
				}
			}
		}
		case ATTACH_REQUEST: {
			return {
				...state,
				[action.form] : {
					...state[action.form],
					request: action.requestId
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
						[action.field] : action.errors
					}
				}
			}
		}
		case CLEAR_VALIDATION_ERROR: {
			const keys = Object.keys(state[action.form].errors).filter(obj => obj!=action.field)
			let newErrors = {}
			keys.forEach( key => {
				newErrors[key] = state[action.form].errors[key]
			})

			return {
				...state,
				[action.form] : {
					...state[action.form],
					errors: newErrors
				}
			}
		}
		case CLEAR_FORM: {
			if (state[action.name]) {
				const keys = Object.keys(state).filter(obj => obj!=action.name)
				let newState = {}
				keys.forEach( key => {
					newState[key] = state[key]
				})
				// console.log(newState);
				// delete newState[action.name]
				return newState
			}
			return state
		}
		default:
			return state;
	}

}

export default formReducer
