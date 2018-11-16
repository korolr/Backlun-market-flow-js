// @flow
import React from "react"
import { Grid, Row, Button } from "react-bootstrap"

type Props = {
  basket: Array<{
    Product: {
      ID: number,
      Price: number,
      Name: string,
      Description: string,
    },
    Count: number,
  }>,
  updateBasket: (a: number, b: number) => void,
  buyBasket: Function,
}

type State = {
  price: number,
}

export class Basket extends React.Component<Props, State> {
  state = {
    price: 0,
  }
  componentWillReceiveProps() {
    this.setState({
      price: 0,
    })
    this.props.basket.map(item => {
      this.setState(prevState => ({
        price: prevState.price + item.Count * item.Product.Price,
      }))
      return null
    })
  }

  componentDidMount() {
    this.setState({
      price: 0,
    })
    this.props.basket.map(item => {
      this.setState(prevState => ({
        price: prevState.price + item.Count * item.Product.Price,
      }))
      return null
    })
  }
  render() {
    const { basket, updateBasket, buyBasket } = this.props
    return (
      <Grid>
        <Row className="show-grid">
          {basket.length >= 1 ? (
            basket.map(item => {
              return item.Count !== 0 ? (
                <div key={item.Product.ID}>
                  <h3>{item.Product.Name}</h3>
                  <img
                    style={{ height: "200px" }}
                    src="https://avatars.mds.yandex.net/get-mpic/200316/img_id9183304286749674957.jpeg/9hq"
                    alt="Product"
                  />
                  <p>{item.Product.Description}</p>
                  <h3>Число в корзине {item.Count}</h3>

                  <h3>Цена {item.Product.Price}</h3>
                  <Button
                    onClick={() => {
                      updateBasket(item.Product.ID, item.Count + 1)
                    }}
                  >
                    Добавить
                  </Button>
                  <Button
                    onClick={() => {
                      updateBasket(item.Product.ID, item.Count - 1)
                    }}
                  >
                    Убрать
                  </Button>
                </div>
              ) : (
                buyBasket()
              )
            })
          ) : (
            <p>Ничего нет</p>
          )}
          {basket.length >= 1 ? (
            <React.Fragment>
              <h2>Общая цена {this.state.price}</h2>
              <Button
                onClick={() => {
                  buyBasket()
                }}
              >
                КУПИТЬ
              </Button>
            </React.Fragment>
          ) : null}
        </Row>
      </Grid>
    )
  }
}

export default Basket
