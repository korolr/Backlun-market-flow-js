import { combineReducers } from "redux"
import { loginReducer } from "./login"

import { registrationReducer } from "./registration"
import { basketReducer } from "./basket"
export const rootReducer = combineReducers({
  login: loginReducer,

  registration: registrationReducer,
  basket: basketReducer,
})
