import React from "react";
import games from "../games";
import { Row, Col } from "react-bootstrap";
import Game from "../Components/Game";

const Homescreen = () => {
  return (
    <>
      <Row>
        {games.map(game => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Game game={game} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
