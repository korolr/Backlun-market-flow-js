// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Registration } from "../components/Registration"
import {
  registrationAction,
  registrationReq,
} from "../actions/registrationActions"
import type { State, RootDispatch } from "../reducers/index"
import type {
  Connector,
  MapDispatchToProps,
  MapStateToProps,
} from "react-redux"

type StateProps = {
  b: number,
  d: number,
  toRegistration: (string, string, string, string) => void,
}

class RegistrationContainer extends Component {
  render() {
    const {
      toRegistration,
      registration,
      login,
      toRegistrationReq,
    } = this.props
    return (
      <div>
        <Registration
          registration={toRegistration}
          error={registration.error}
          isLogin={login.isLogin}
          success={registration.success}
          regReq={toRegistrationReq}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: State) => {
  return {
    registration: store.registration,
    login: store.login,
  }
}

const mapDispatchToProps = (dispatch: RootDispatch) => {
  return {
    toRegistration: (login, password, name, address) =>
      dispatch(registrationAction(login, password, name, address)),
    toRegistrationReq: () => dispatch(registrationReq()),
  }
}

const connector: Connector<{}, StateProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(RegistrationContainer)
