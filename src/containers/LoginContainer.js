// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Login } from "../components/Login"
import { loginAction, loginReq } from "../actions/loginActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"
type Props = {
  toLogin: (product: string, count: string) => void,
  login: boolean,
  toLoginReq: () => void,
  error: string,
}
class LoginContainer extends Component<Props> {
  render() {
    const { toLogin, login, toLoginReq, error } = this.props
    return (
      <div>
        <Login
          login={toLogin}
          error={error}
          isLogin={login}
          loginReq={toLoginReq}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: State) => {
  return {
    error: store.login.error,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch<State, Action>) => {
  return {
    toLogin: (email: string, password: string) =>
      dispatch(loginAction(email, password)),
    toLoginReq: () => dispatch(loginReq()),
  }
}

const connector: Connector<LoginContainer, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(LoginContainer)
