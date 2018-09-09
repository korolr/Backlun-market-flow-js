import { HTTP } from "../utils/api"

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGIN_OUT = "LOGIN_OUT"

export function loginAction(login, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
    })

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
      .then(function(response) {
        if (response.data.message === "Success") {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.body,
          })
        }
      })
      .catch(function(err) {
        if (err.response.data.message === "Incorrect login or password") {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Ошибка при вводе пароля",
          })
        } else {
          dispatch({
            type: LOGIN_FAIL,
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function logOut() {
  return {
    type: LOGIN_OUT,
  }
}

export function loginReq() {
  return {
    type: LOGIN_REQUEST,
  }
}

export function logOut403(err, dispatch) {
  if (err.response.data.message === "Incorrect token") {
    return dispatch({
      type: LOGIN_OUT,
    })
  }
}
