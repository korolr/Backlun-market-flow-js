// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Basket } from "../components/Basket"
import { updateBasket, buyBasket, clearBasket } from "../actions/basketActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"

type Props = {
  toUpdateBasket: (product: number, count: number) => void,
  toBuyBasket: () => void,
  toClearBasket: () => void,
  basket: any[],
}
class BasketContainer extends Component<Props> {
  render() {
    const { toUpdateBasket, toBuyBasket, basket, toClearBasket } = this.props
    return (
      <div>
        <Basket
          updateBasket={toUpdateBasket}
          basket={basket}
          buyBasket={toBuyBasket}
          clearBasket={toClearBasket}
        />
      </div>
    )
  }
}

const mapStateToProps = (store: State) => {
  return {
    basket: store.basket.data,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch<State, Action>) => {
  return {
    toUpdateBasket: (product: string, count: number) =>
      dispatch(updateBasket(product, count)),
    toBuyBasket: () => dispatch(buyBasket()),
    toClearBasket: () => dispatch(clearBasket()),
  }
}

const connector: Connector<BasketContainer, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(BasketContainer)
