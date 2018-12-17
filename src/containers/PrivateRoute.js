// @flow
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"

type PrivateRouteProps = {
  component: any,
  isAuth: boolean,
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuth, ...rest } = props

  return (
    <Route
      {...rest}
      render={(routeProps: mixed) =>
        isAuth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (state: State) => {
  return {
    isAuth: state.login.isLogin,
  }
}

const connector: Connector<{}, PrivateRouteProps> = connect(
  mapStateToProps,
  {}
)

export default connector(PrivateRoute)
