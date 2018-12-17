// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Header } from "../components/Header"
import { logOut } from "../actions/loginActions"
import { getBasket } from "../actions/basketActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"

type Props = {
  toLoginOut: () => void,
  login: boolean,
  basket: any[],
}
class HeaderContainer extends Component<Props> {
  componentWillReceiveProps() {}
  render() {
    const { toLoginOut, login, basket } = this.props
    return <Header loginOut={toLoginOut} isLogin={login} basket={basket} />
  }
}

const mapStateToProps = (store: State) => {
  return {
    login: store.login.isLogin,
    basket: store.basket.data,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch<State, Action>) => {
  return {
    toLoginOut: () => dispatch(logOut()),
    toGetBasket: () => dispatch(getBasket()),
  }
}

const connector: Connector<HeaderContainer, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(HeaderContainer)
