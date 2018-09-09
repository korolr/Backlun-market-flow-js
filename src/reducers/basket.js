import {
  BASKET_REQUEST,
  BASKET_SUCCESS,
  BASKET_FAIL,
  BASKET_CLEAR,
} from "../actions/basketActions"

const initialState = {
  data: [],
  error: "",
}

export function basketReducer(state = initialState, action) {
  switch (action.type) {
    case BASKET_REQUEST:
      return { ...state, token: null, error: "" }

    case BASKET_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case BASKET_FAIL:
      return { ...state, token: null, error: action.payload }
    case BASKET_CLEAR:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
