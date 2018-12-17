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
  registration: (
    login: string,
    password: string,
    name: string,
    adress: string
  ) => void,
  error: string,
  success: boolean,
  isLogin: boolean,
  regReq: () => void,
}

type State = {
  login: string,
  password: string,
  name: string,
  adress: string,
}

export class Registration extends React.Component<Props, State> {
  state = {
    login: "",
    password: "",
    name: "",
    adress: "",
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

  onNameChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    let target = event.target
    if (target instanceof HTMLInputElement) {
      this.setState({ name: target.value })
    }
  }

  onAddressChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    let target = event.target
    if (target instanceof HTMLInputElement) {
      this.setState({ adress: target.value })
    }
  }

  handleSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.props.registration(
      this.state.login,
      this.state.password,
      this.state.name,
      this.state.adress
    )
    this.setState({ password: "" })
    event.preventDefault()
  }

  componentDidUpdate() {
    if (this.props.success) {
      history.push(`/login`)
    }
  }

  componentDidMount() {
    if (this.props.isLogin) {
      history.push(`/`)
    }
    this.props.regReq()
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

            <FormGroup controlId="formHorizontalName">
              <Col sm={1}>Name</Col>
              <Col sm={3}>
                <FormControl
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onNameChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAddress">
              <Col sm={1}>Address</Col>
              <Col sm={3}>
                <FormControl
                  placeholder="Adddres"
                  value={this.state.adress}
                  onChange={this.onAddressChange}
                />
              </Col>
            </FormGroup>

            {this.props.error ? (
              <h3 style={{ color: "red" }}>{this.props.error}</h3>
            ) : null}
            {this.state.password &&
            this.state.login &&
            this.state.adress &&
            this.state.name ? (
              <FormGroup>
                <Col smOffset={1} sm={3}>
                  <Button type="submit">Регистрация</Button>
                </Col>
              </FormGroup>
            ) : null}
          </Form>
        </Row>
      </Grid>
    )
  }
}

export default Registration
