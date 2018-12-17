// @flow
import { HTTP } from "../utils/api"

import { logOut403 } from "./loginActions"
import type {
  RequestAction,
  SuccessAction,
  ClearAction,
  FailAction,
} from "../reducers/basket"
import type { State } from "../reducers/index"
import type { Dispatch as ReduxDispatch } from "redux"
type DataErr = { response: { data: { message: string } } }
type Data = { data: { body: Array<mixed> } }
type DataMess = { data: { message: string, body: number } }

type Action = RequestAction | SuccessAction | ClearAction | FailAction

type MyDispatch = ReduxDispatch<State, Action>

export function getBasket() {
  return (dispatch: MyDispatch, getState: () => State): void => {
    const state = getState()
    dispatch({
      type: "BASKET_REQUEST",
    })

    HTTP.get(`api/get/backet`, {
      params: {
        token: state.login.token,
      },
    })
      .then(function(response: Data) {
        var data: Array<mixed> = response.data.body
        dispatch({
          type: "BASKET_SUCCESS",
          payload: data,
        })
      })
      .catch(function(err: DataErr) {
        logOut403(err, dispatch)
        dispatch({
          type: "BASKET_FAIL",
          payload: "Ошибка сервера",
        })
      })
  }
}

export function updateBasket(product: string, count: number) {
  return (dispatch: MyDispatch, getState: () => State): void => {
    const state = getState()
    dispatch({
      type: "BASKET_REQUEST",
    })

    HTTP.post(
      `api/market/products`,
      {},
      {
        params: {
          token: state.login.token,
          product: product,
          count: count,
        },
      }
    )
      .then(function(response: DataMess) {
        if (response.data.message === "Success") {
          HTTP.get(`api/get/backet`, {
            params: {
              token: state.login.token,
            },
          }).then(function(response: Data) {
            var data: Array<mixed> = response.data.body
            dispatch({
              type: "BASKET_SUCCESS",
              payload: data,
            })
          })
        }
      })
      .catch(function(err: DataErr) {
        logOut403(err, dispatch)
        dispatch({
          type: "BASKET_FAIL",
          payload: "Ошибка сервера",
        })
      })
  }
}

export function buyBasket() {
  return (dispatch: MyDispatch, getState: () => State): void => {
    const state = getState()
    dispatch({
      type: "BASKET_REQUEST",
    })

    HTTP.post(
      `api/market/pay`,
      {},
      {
        params: {
          token: state.login.token,
        },
      }
    )
      .then(function(response) {
        dispatch({
          type: "BASKET_SUCCESS",
          payload: [],
        })
      })
      .catch(function(err: DataErr) {
        logOut403(err, dispatch)
        dispatch({
          type: "BASKET_FAIL",
          payload: "Ошибка сервера",
        })
      })
  }
}

export function clearBasket() {
  return {
    type: "BASKET_CLEAR",
    payload: [],
  }
}
