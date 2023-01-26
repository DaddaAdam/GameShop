import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Meta from "../Components/Meta";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform")
    ? searchParams.get("platform")
    : "none";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, platform));
    }
  }, [dispatch, id, platform]);

  const removeFromCartHandler = id => {
    console.log("remove from cart");
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Meta title="Panier" />
      <Row>
        <Col md={8}>
          <h1>Panier</h1>
          {!cartItems || cartItems.length === 0 ? (
            <Message>
              Votre panier est vide. <Link to="/">Retour</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems ? (
                cartItems.map(item => (
                  <ListGroup.Item key={item.game}>
                    <Row>
                      <Col md={3}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/game/${item.game}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <i
                          className={`fa-brands fa-${item.selectedPlatform} fa-xl`}
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          type="button"
                          onClick={() => removeFromCartHandler(item.game)}
                        >
                          <i className="fas fa-trash fa-xl" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <></>
              )}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Sous-total ({cartItems.length}) jeux</h2>$
                {cartItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Paiement
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
