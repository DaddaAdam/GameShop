import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { NintendoSwitch } from "react-bootstrap-icons";
import Rating from "../Components/Rating";
import games from "../games";

const Gamescreen = props => {
  const { id } = useParams();
  const game = games.find(g => g._id == id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Retour
      </Link>
      <Row>
        <Col md={6} lg={5}>
          <Image src={game.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{game.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={game.rating}
                text={`${game.numReviews} évaluations`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Prix: ${game.price}</ListGroup.Item>
            <ListGroup.Item>{game.description}</ListGroup.Item>
            <ListGroup.Item>
              Développement: {game.developper} <br /> Date de sortie:{" "}
              {game.release_date}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Prix:</Col>
                  <Col>
                    <strong>${game.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Plateformes:</Col>
                  <Col>
                    {game.platforms.steam && (
                      <i className="fa-brands fa-steam" />
                    )}{" "}
                  </Col>
                  <Col>
                    {(game.platforms.xbox_one ||
                      game.platforms.xbox_series) && (
                      <i className="fa-brands fa-xbox" />
                    )}
                  </Col>
                  <Col>
                    {(game.platforms.playstation_4 ||
                      game.platforms.playstation_5) && (
                      <i className="fa-brands fa-playstation" />
                    )}
                  </Col>

                  {game.platforms.nintendo_switch && (
                    <Col>
                      <NintendoSwitch />
                    </Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button className="btn-block" type="button">
                    Ajouter au panier
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

export default Gamescreen;
