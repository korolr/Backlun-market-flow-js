import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "../actions/registrationActions"

const initialState = {
  success: false,
  error: "",
}

export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return { ...state, error: "", success: false }

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
      }
    case REGISTRATION_FAIL:
      return { ...state, error: action.payload, success: false }

    default:
      return state
  }
}
