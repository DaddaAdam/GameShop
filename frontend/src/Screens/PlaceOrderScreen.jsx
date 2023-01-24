import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link } from "react-router-dom";
const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart);
  const placeOrderHandler = () => {};

  //Calculer somme des prix
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

  cart.taxPrice = Math.round(Number(0.15 * cart.itemsPrice)).toFixed(2);

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );
  return (
    <>
      <CheckoutSteps step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Livraison</h2>
              <p>
                <strong>Adresse: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Methode de paiement</h2>
              <strong>Méthode: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Objets commandés: </h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="danger">Votre panier est vide.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Commander
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
