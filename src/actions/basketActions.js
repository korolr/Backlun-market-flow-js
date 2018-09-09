import { HTTP } from "../utils/api"

import { logOut403 } from "./loginActions"

export const BASKET_REQUEST = "BASKET_REQUEST"
export const BASKET_SUCCESS = "BASKET_SUCCESS"
export const BASKET_FAIL = "BASKET_FAIL"
export const BASKET_CLEAR = "BASKET_CLEAR"

export function getBasket() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
    })

    HTTP.get(
      `api/get/backet`,
      {
        params: {
          token: state.login.token,
        },
      },
      {}
    )
      .then(function(response) {
        if (response.data.body !== null) {
          dispatch({
            type: BASKET_SUCCESS,
            payload: response.data.body,
          })
        }
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function updateBasket(product, count) {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
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
      .then(function(response) {
        if (response.data.message === "Success") {
          HTTP.get(
            `api/get/backet`,
            {
              params: {
                token: state.login.token,
              },
            },
            {}
          ).then(function(response) {
            if (response.data.body !== null) {
              dispatch({
                type: BASKET_SUCCESS,
                payload: response.data.body,
              })
            }
          })
        }
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function buyBasket() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: BASKET_REQUEST,
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
          type: BASKET_SUCCESS,
          payload: [],
        })
      })
      .catch(function(err) {
        logOut403(err, dispatch)
        dispatch({
          type: BASKET_FAIL,
          payload: "Ошибка сервера",
        })
      })
  }
}

export function clearBasket() {
  return {
    type: BASKET_CLEAR,
    payload: [],
  }
}
