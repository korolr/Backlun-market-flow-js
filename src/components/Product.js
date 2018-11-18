// @flow
import { HTTP } from "../utils/api"
import React from "react"
import { Grid, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

type Data = {
  Name: string,
  Description: string,
  Count: number,
  ID: number,
}

type Props = {
  login: boolean,
  basket: Array<{
    Product: {
      ID: number,
    },
  }>,
  id: string,
  updateBasket: (a: number, b: number) => void,
  getBasket: () => void,
}

type State = {
  data: Data,
  basket: Array<mixed>,
}

export class Product extends React.Component<Props, State> {
  state = {
    data: {
      Name: "",
      Description: "",
      Count: 0,
      ID: 0,
    },
    basket: [],
  }
  componentDidMount() {
    if (this.props.login) {
      this.props.getBasket()
    }

    HTTP.get(`/api/get/product`, {
      params: {
        id: this.props.id,
      },
    }).then(
      function(response: {
        data: {
          body: Data,
        },
      }) {
        this.setState({ data: response.data.body })
      }.bind(this)
    )
  }
  componentWillReceiveProps(newProps: Props) {
    newProps.basket.map(
      (item): null => {
        this.setState(prevState => ({
          basket: [...prevState.basket, item.Product.ID],
        }))
        return null
      }
    )
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <h1>{this.state.data.Name}</h1>
          <img
            style={{ height: "300px" }}
            alt="none"
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
