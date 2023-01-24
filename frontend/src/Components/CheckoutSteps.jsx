import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        <LinkContainer to="/login">
          <Nav.Link>S'authentifier</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/shipping">
          <Nav.Link>Livraison</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        {step3 || step4 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Paiement</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Paiement</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Commande</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Commande</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
