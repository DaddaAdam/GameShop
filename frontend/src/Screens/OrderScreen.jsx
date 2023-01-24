import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../Components/Loader";

const OrderScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading)
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price,
      0
    );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Commande n° {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Livraison</h2>
              <p>
                <strong>Nom d'utilisateur: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adresse: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Methode de paiement</h2>
              <p>
                <strong>Méthode: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Payée le: {new Date(order.paidAt).toLocaleDateString("fr")}
                </Message>
              ) : (
                <Message variant="danger">
                  {" "}
                  La commande n'a pas encore été payée.
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Objets commandés: </h2>
              {order.orderItems.length === 0 ? (
                <Message variant="danger">Votre panier est vide.</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/game/${item.game}`}>{item.name}</Link>
                        </Col>
                        <Col md={2}>
                          {" "}
                          <i
                            className={`fa-brands fa-${item.selectedPlatform} fa-xl`}
                          />
                        </Col>
                        <Col md={4}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Récapitulatif</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Articles</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
