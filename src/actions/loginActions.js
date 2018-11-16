// @flow
import { HTTP } from "../utils/api"
import type {
  RequestAction,
  SuccessAction,
  OutAction,
  FailAction,
} from "../reducers/login"
import type { State, RootDispatch } from "../reducers/index"
import type { Dispatch as ReduxDispatch } from "redux"
type DataErr = { response: { data: { message: string } } }
type Data = { data: { message: string, body: number } }

type Action = RequestAction | SuccessAction | OutAction | FailAction

type MyDispatch = ReduxDispatch<Action>

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
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.body,
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
