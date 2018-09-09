import React, { Component } from "react"
import { connect } from "react-redux"
import { Header } from "../components/Header"
import { logOut } from "../actions/loginActions"
import { getBasket } from "../actions/basketActions"

class HeadContainer extends Component {
  componentWillReceiveProps() {}
  render() {
    const { toLoginOut, login, basket } = this.props
    return (
      <Header
        loginOut={toLoginOut}
        isLogin={login.isLogin}
        basket={basket.data}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    login: store.login,
    basket: store.basket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toLoginOut: () => dispatch(logOut()),
    toGetBasket: () => dispatch(getBasket()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadContainer)
