import { HTTP } from "../utils/api"

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST"
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS"
export const REGISTRATION_FAIL = "REGISTRATION_FAIL"

export function registrationAction(login, password, name, address) {
  return dispatch => {
    dispatch({
      type: REGISTRATION_REQUEST,
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
      .then(function(response) {
        if (response.data.message === "Success") {
          dispatch({
            type: REGISTRATION_SUCCESS,
          })
        }
      })
      .catch(function(err) {
        if (err.response.data.message === "User with this login is exists") {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Такой пользователь уже есть",
          })
        } else if (err.response.data.message === "Incorrect data") {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Не правильные данные",
          })
        } else {
          dispatch({
            type: REGISTRATION_FAIL,
            payload: "Ошибка сервера",
          })
        }
      })
  }
}

export function registrationReq() {
  return {
    type: REGISTRATION_REQUEST,
  }
}
