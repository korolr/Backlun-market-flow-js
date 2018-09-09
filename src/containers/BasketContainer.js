import React, { Component } from "react"
import { connect } from "react-redux"
import { Basket } from "../components/Basket"
import { updateBasket, buyBasket, clearBasket } from "../actions/basketActions"

class BasketContainer extends Component {
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

const mapStateToProps = store => {
  return {
    basket: store.basket.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toUpdateBasket: (product, count) => dispatch(updateBasket(product, count)),
    toBuyBasket: () => dispatch(buyBasket()),
    toClearBasket: () => dispatch(clearBasket()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketContainer)
