// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Product } from "../components/Product"
import { getBasket, updateBasket } from "../actions/basketActions"
import type { State } from "../reducers/index"
import type { Connector } from "react-redux"
import type { Dispatch as ReduxDispatch } from "redux"
import type { Action } from "../reducers"

type Props = {
  toUpdateBasket: (product: number, count: number) => void,
  toGetBasket: () => void,
  login: boolean,
  basket: any[],
  match: {
    params: {
      number: number,
    },
  },
}
class ProductContainer extends Component<Props> {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Product
          basket={basket}
          getBasket={toGetBasket}
          login={login}
          updateBasket={toUpdateBasket}
          id={this.props.match.params.number}
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

const connector: Connector<ProductContainer, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(ProductContainer)
