import React, { Component } from "react"
import { connect } from "react-redux"
import { Category } from "../components/Category"
import { getBasket, updateBasket } from "../actions/basketActions"

class CategoryContainer extends Component {
  componentDidMount() {}
  render() {
    const { basket, toGetBasket, login, toUpdateBasket } = this.props
    return (
      <div>
        <Category
          basket={basket}
          getBasket={toGetBasket}
          login={login.isLogin}
          updateBasket={toUpdateBasket}
          id={this.props.match.params.number}
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
)(CategoryContainer)
