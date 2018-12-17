// @flow

import { combineReducers } from "redux"
import { loginReducer } from "./login"
import { registrationReducer } from "./registration"
import { basketReducer } from "./basket"
import type { BasketState, ActionBasket } from "./basket"
import type { LoginState, ActionLogin } from "./login"
import type { RegistrationState, ActionRegistration } from "./registration"
import type { Dispatch as ReduxDispatch } from "redux"

export type State = {
  login: LoginState,
  registration: RegistrationState,
  basket: BasketState,
}

export const rootReducer = combineReducers<{}, State>({
  login: loginReducer,
  registration: registrationReducer,
  basket: basketReducer,
})

export type Action = ActionBasket | ActionLogin | ActionRegistration
export type RootDispatch = ReduxDispatch<State, Action>
