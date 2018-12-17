// @flow
import { HTTP } from "../utils/api"

import type {
  RequestAction,
  SuccessAction,
  FailAction,
} from "../reducers/registration"
import type { State } from "../reducers/index"
import type { Dispatch as ReduxDispatch } from "redux"
type DataErr = { response: { data: { message: string } } }
type Data = { data: { message: string, body: number } }

type Action = RequestAction | SuccessAction | FailAction

export type MyDispatch = ReduxDispatch<State, Action>

export function registrationAction(
  login: string,
  password: string,
  name: string,
  address: string
) {
  return (dispatch: MyDispatch, getState: () => State): void => {
    dispatch({
      type: "REGISTRATION_REQUEST",
    })

    HTTP.post(
      `/api/auth/registration`,
      {},
      {
        params: {
          login: login,
          password: password,
          name: name,
          address: address,
        },
      }
    )
      .then(function(response: Data) {
        if (response.data.message === "Success") {
          return dispatch({
            type: "REGISTRATION_SUCCESS",
          })
        }
      })
      .catch(function(err: DataErr) {
        if (err.response.data.message === "User with this login is exists") {
          return dispatch({
            type: "REGISTRATION_FAIL",
            payload: "Такой пользователь уже есть",
          })
        } else if (err.response.data.message === "Incorrect data") {
          return dispatch({
            type: "REGISTRATION_FAIL",
            payload: "Не правильные данные",
          })
        } else {
          return dispatch({
            type: "REGISTRATION_FAIL",
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function registrationReq() {
  return {
    type: "REGISTRATION_REQUEST",
  }
}
