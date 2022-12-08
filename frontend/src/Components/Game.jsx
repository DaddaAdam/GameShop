import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Game = ({ game }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/game/${game._id}`}>
        <Card.Img
          src={game.image}
          variant="top"
          style={{ maxHeight: "362px" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/game/${game._id}`}>
          <Card.Title as="div">{game.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={game.rating}
              text={`${game.numReviews} évaluations`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${game.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Game;
