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
import PropTypes from "prop-types"
import history from "../history"

export class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = { login: "", password: "", name: "", address: "" }
  }

  onLoginChange = event => {
    this.setState({ login: event.target.value })
  }

  onPasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value })
  }

  handleSubmit = event => {
    this.props.registration(
      this.state.login,
      this.state.password,
      this.state.name,
      this.state.address
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
                  value={this.state.address}
                  onChange={this.onAddressChange}
                />
              </Col>
            </FormGroup>

            {this.props.error ? (
              <h3 style={{ color: "red" }}>{this.props.error}</h3>
            ) : null}
            {this.state.password &&
            this.state.login &&
            this.state.address &&
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

Registration.propTypes = {
  registration: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
}

export default Registration
