// @flow
import React from "react"
import {
  Grid,
  Row,
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
} from "react-bootstrap"
import history from "../history"

type Props = {
  login: (a: string, b: string) => void,
  getBasket: Function,
  isLogin: boolean,
  error: boolean,
  loginReq: () => void,
}

type State = {
  login: string,
  password: string,
}

export class Login extends React.Component<Props, State> {
  state = {
    login: "",
    password: "",
  }

  onLoginChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    let target = event.target
    if (target instanceof HTMLInputElement) {
      this.setState({ login: target.value })
    }
  }

  onPasswordChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    let target = event.target
    if (target instanceof HTMLInputElement) {
      this.setState({ password: target.value })
    }
  }

  handleSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.props.login(this.state.login, this.state.password)
    this.setState({ password: "" })
    event.preventDefault()
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      history.push(`/`)
    }
  }

  componentDidMount() {
    if (this.props.isLogin) {
      history.push(`/`)
    }
    this.props.loginReq()
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalLogin">
              <Col sm={1}>Login</Col>
              <Col sm={3}>
                <FormControl
                  placeholder="Login"
                  value={this.state.login}
                  onChange={this.onLoginChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col sm={1}>Password</Col>
              <Col sm={3}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </Col>
            </FormGroup>

            {this.props.error ? (
              <h3 style={{ color: "red" }}>{this.props.error}</h3>
            ) : null}
            {this.state.password && this.state.login ? (
              <FormGroup>
                <Col smOffset={1} sm={3}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            ) : null}
          </Form>
        </Row>
      </Grid>
    )
  }
}

export default Login
