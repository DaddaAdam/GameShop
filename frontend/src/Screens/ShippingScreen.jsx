import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address
  );
  const [city, setCity] = useState(shippingAddress && shippingAddress.city);
  const [postalCode, setPostalCode] = useState(
    shippingAddress && shippingAddress.postalCode
  );
  const [country, setCountry] = useState(
    shippingAddress && shippingAddress.country
  );

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Livraison</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type="text"
            placeholder="Saisissez votre adresse"
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            placeholder="Saisissez votre ville"
            value={city}
            required
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Code Postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Saisissez votre code postal"
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Pays</Form.Label>
          <Form.Control
            type="text"
            placeholder="Saisissez votre pays"
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continuer
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
