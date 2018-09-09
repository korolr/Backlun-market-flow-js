import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { HTTP } from "../utils/api"

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount() {
    let self = this
    HTTP.get(`api/get/categories`).then(function(response) {
      self.setState({ data: response.data.body })
    })
  }
  render() {
    const { loginOut, isLogin, basket } = this.props
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Магазин</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title="Категории" id="basic-nav-dropdown">
              {this.state.data.map(item => {
                return (
                  <MenuItem eventKey={3}>
                    {" "}
                    <Link to={`/cat/${item.ID}`} style={{ color: "#77778c" }}>
                      {item.Name}
                    </Link>
                  </MenuItem>
                )
              })}
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {isLogin ? (
              <React.Fragment>
                <NavItem eventKey={3} href="#">
                  <Link to="/basket" style={{ color: "#77778c" }}>
                    Корзина ({basket.length})
                  </Link>
                </NavItem>
                <NavItem eventKey={3} href="#" onClick={() => loginOut()}>
                  Выйти
                </NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem eventKey={3} href="#">
                  <Link to="/registration" style={{ color: "#77778c" }}>
                    Регистрация
                  </Link>
                </NavItem>
                <NavItem eventKey={3} href="#">
                  <Link to="/login" style={{ color: "#77778c" }}>
                    Войти
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Navbar>
      </div>
    )
  }
}

Header.propTypes = {
  loginOut: PropTypes.func.isRequired,
}

export default Header
