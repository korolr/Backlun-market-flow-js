// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Home } from "../components/Home"
import { getBasket, updateBasket } from "../actions/basketActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"
type Props = {
  toUpdateBasket: (product: number, count: number) => void,
  login: boolean,
  toGetBasket: () => void,
  basket: any[],
}
class HomeContainer extends Component<Props> {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Home
          basket={basket}
          getBasket={toGetBasket}
          login={login}
          updateBasket={toUpdateBasket}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: State) => {
  return {
    basket: store.basket.data,
    login: store.login.isLogin,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch<State, Action>) => {
  return {
    toGetBasket: () => dispatch(getBasket()),
    toUpdateBasket: (product: string, count: number) =>
      dispatch(updateBasket(product, count)),
  }
}

const connector: Connector<HomeContainer, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(HomeContainer)
