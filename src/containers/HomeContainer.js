import React, { Component } from "react"
import { connect } from "react-redux"
import { Home } from "../components/Home"
import { getBasket, updateBasket } from "../actions/basketActions"

class HomeContainer extends Component {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Home
          basket={basket}
          getBasket={toGetBasket}
          login={login.isLogin}
          updateBasket={toUpdateBasket}
        />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    basket: store.basket.data,
    login: store.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toGetBasket: () => dispatch(getBasket()),
    toUpdateBasket: (product, count) => dispatch(updateBasket(product, count)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
