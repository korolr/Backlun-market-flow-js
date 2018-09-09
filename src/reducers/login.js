import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_OUT,
} from "../actions/loginActions"

const initialState = {
  token: null,
  error: "",
  isLogin: false,
}

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, token: null, error: "", isLogin: false }

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      }
    case LOGIN_OUT:
      return { ...state, token: null, error: "", isLogin: false }
    case LOGIN_FAIL:
      return { ...state, token: null, error: action.payload, isLogin: false }

    default:
      return state
  }
}
