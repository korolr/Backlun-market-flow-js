// @flow
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import PrivateRoute from "../containers/PrivateRoute"
import LoginContainer from "../containers/LoginContainer"
import HeaderContainer from "../containers/HeaderContainer"
import RegistrationContainer from "../containers/RegistrationContainer"
import BasketContainer from "../containers/BasketContainer"
import HomeContainer from "../containers/HomeContainer"
import ProductContainer from "../containers/ProductContainer"
import CategoryContainer from "../containers/CategoryContainer"

type Props = {}

class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <PrivateRoute path="/basket" component={BasketContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/product/:number" component={ProductContainer} />
          <Route path="/cat/:number" component={CategoryContainer} />
          <Route exact path="/registration" component={RegistrationContainer} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
