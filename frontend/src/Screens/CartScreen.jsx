import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

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
  };

  return (
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
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/game/${item.game}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <i
                        className={`fa-brands fa-${item.selectedPlatform} fa-2xl`}
                      />
                    </Col>
                    <Col md={2}>
                      <i
                        className="fas fa-trash fa-lg"
                        onClick={() => removeFromCartHandler(item.game)}
                      />
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
      <Col md={2}></Col>

      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
