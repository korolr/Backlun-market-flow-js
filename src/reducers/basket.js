// @flow
export type BasketState = { data: Array<mixed>, error: string }

export type RequestAction = { type: "BASKET_REQUEST" }
export type SuccessAction = { type: "BASKET_SUCCESS", payload: Array<mixed> }
export type ClearAction = { type: "BASKET_CLEAR" }
export type FailAction = { type: "BASKET_FAIL", payload: string }

export type ActionBasket =
  | RequestAction
  | SuccessAction
  | ClearAction
  | FailAction

const initialState: BasketState = {
  data: [],
  error: "",
}

export function basketReducer(
  state: BasketState = initialState,
  action: ActionBasket
): BasketState {
  switch (action.type) {
    case "BASKET_REQUEST":
      return { ...state, token: null, error: "" }
    case "BASKET_SUCCESS":
      return {
        ...state,
        data: action.payload,
      }
    case "BASKET_FAIL":
      return { ...state, token: null, error: action.payload }
    case "BASKET_CLEAR":
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
