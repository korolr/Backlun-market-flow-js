// @flow

import React, { Component } from "react"
import { connect } from "react-redux"
import { Registration } from "../components/Registration"
import {
  registrationAction,
  registrationReq,
} from "../actions/registrationActions"

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

const mapStateToProps = store => {
  return {
    registration: store.registration,
    login: store.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toRegistration: (login, password, name, address) =>
      dispatch(registrationAction(login, password, name, address)),
    toRegistrationReq: () => dispatch(registrationReq()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer)
