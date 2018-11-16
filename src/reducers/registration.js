// @flow

export type RegistrationState = { success: boolean, error: string }

export type RequestAction = { type: "REGISTRATION_REQUEST" }
export type SuccessAction = {
  type: "REGISTRATION_SUCCESS",
}
export type FailAction = { type: "REGISTRATION_FAIL", payload: string }

export type ActionRegistration = RequestAction | SuccessAction | FailAction

const initialState: RegistrationState = {
  success: false,
  error: "",
}

export function registrationReducer(
  state: RegistrationState = initialState,
  action: ActionRegistration
): RegistrationState {
  switch (action.type) {
    case "REGISTRATION_REQUEST":
      return { ...state, error: "", success: false }
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        success: true,
      }
    case "REGISTRATION_FAIL":
      return { ...state, error: action.payload, success: false }
    default:
      return state
  }
}
