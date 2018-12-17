// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Registration } from "../components/Registration"
import {
  registrationAction,
  registrationReq,
} from "../actions/registrationActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"
type Props = {
  toRegistration: (
    login: string,
    password: string,
    name: string,
    address: string
  ) => void,
  error: string,
  success: boolean,
  login: boolean,
  toRegistrationReq: () => void,
}

class RegistrationContainer extends Component<Props> {
  render() {
    const {
      toRegistration,
      error,
      success,
      login,
      toRegistrationReq,
    } = this.props
    return (
      <div>
        <Registration
          registration={toRegistration}
          error={error}
          isLogin={login}
          success={success}
          regReq={toRegistrationReq}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: State) => {
  return {
    success: store.registration.success,
    error: store.registration.error,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch<State, Action>) => {
  return {
    toRegistration: (
      login: string,
      password: string,
      name: string,
      address: string
    ) => dispatch(registrationAction(login, password, name, address)),
    toRegistrationReq: () => dispatch(registrationReq()),
  }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(RegistrationContainer)
