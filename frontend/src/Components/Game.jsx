import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Game = ({ game }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/game/${game._id}`}>
        <Card.Img src={game.image} variant="top" height={"400px"} />
      </a>
      <Card.Body>
        <a href={`/game/${game._id}`}>
          <Card.Title as="div">{game.name}</Card.Title>
        </a>
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
