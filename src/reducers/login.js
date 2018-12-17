// @flow

export type LoginState = { token: ?string, error: string, isLogin: boolean }

export type RequestAction = { type: "LOGIN_REQUEST" }
export type SuccessAction = { type: "LOGIN_SUCCESS", payload: string }
export type OutAction = { type: "LOGIN_OUT" }
export type FailAction = { type: "LOGIN_FAIL", payload: string }

export type ActionLogin = RequestAction | SuccessAction | OutAction | FailAction

const initialState: LoginState = {
  token: null,
  error: "",
  isLogin: false,
}

export function loginReducer(
  state: LoginState = initialState,
  action: ActionLogin
): LoginState {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, token: null, error: "", isLogin: false }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      }
    case "LOGIN_OUT":
      return { ...state, token: null, error: "", isLogin: false }
    case "LOGIN_FAIL":
      return { ...state, token: null, error: action.payload, isLogin: false }
    default:
      return state
  }
}
