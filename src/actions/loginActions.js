// @flow
import { HTTP } from "../utils/api"
import type {
  RequestAction,
  SuccessAction,
  OutAction,
  FailAction,
} from "../reducers/login"
import type { State } from "../reducers/index"
import type { Dispatch as ReduxDispatch } from "redux"
type DataErr = { response: { data: { message: string } } }
type Data = { data: { message: string, body: string } }

type Action = RequestAction | SuccessAction | FailAction | OutAction

export type MyDispatch = ReduxDispatch<State, Action>

export function loginAction(login: string, password: string) {
  return (dispatch: MyDispatch, getState: () => State): void => {
    dispatch({ type: "LOGIN_REQUEST" })

    HTTP.post(
      `api/auth/login`,
      {},
      {
        params: {
          login: login,
          password: password,
        },
      }
    )
      .then(function(response: Data) {
        if (response.data.message === "Success") {
          var data: string = response.data.body
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: data,
          })
        }
      })
      .catch(function(err: DataErr) {
        if (err.response.data.message === "Incorrect login or password") {
          dispatch({
            type: "LOGIN_FAIL",
            payload: "Ошибка при вводе пароля",
          })
        } else {
          dispatch({
            type: "LOGIN_FAIL",
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function logOut() {
  return {
    type: "LOGIN_OUT",
  }
}

export function loginReq() {
  return {
    type: "LOGIN_REQUEST",
  }
}

export function logOut403(err: DataErr, dispatch: Function) {
  if (err.response.data.message === "Incorrect token") {
    return dispatch({
      type: "LOGIN_OUT",
    })
  }
}
