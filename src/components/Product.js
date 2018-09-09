import { HTTP } from "../utils/api"
import React from "react"
import { Grid, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], basket: [] }
  }
  componentDidMount() {
    if (this.props.login) {
      this.props.getBasket()
    }
    let self = this
    HTTP.get(`/api/get/product`, {
      params: {
        id: this.props.id,
      },
    }).then(function(response) {
      self.setState({ data: response.data.body })
    })
  }
  componentWillReceiveProps(newProps) {
    newProps.basket.map(item => {
      this.setState(prevState => ({
        basket: [...prevState.basket, item.Product.ID],
      }))
    })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <h1>{this.state.data.Name}</h1>
          <img
            style={{ height: "300px" }}
            src="https://avatars.mds.yandex.net/get-mpic/200316/img_id9183304286749674957.jpeg/9hq"
          />
          <p>{this.state.data.Description}</p>
          <h2>{this.state.data.Count}</h2>
          {this.props.login ? (
            this.state.basket.includes(this.state.data.ID) ? (
              <Link to="/basket">
                <Button bsStyle="primary">Уже в корзине</Button>
              </Link>
            ) : (
              <Button
                onClick={() => this.props.updateBasket(this.state.data.ID, 1)}
              >
                Добавить в корзину
              </Button>
            )
          ) : (
            <Link to="/login">
              <Button>Добавить в корзину</Button>
            </Link>
          )}
        </Row>
      </Grid>
    )
  }
}

export default Product
