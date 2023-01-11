import { React, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { NintendoSwitch } from "react-bootstrap-icons";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listGameDetails } from "../actions/gameActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Gamescreen = props => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedPlatform, setSelectedPlatform] = useState("");

  const dispatch = useDispatch();

  const gameDetails = useSelector(state => state.gameDetails);

  const { loading, error, game } = gameDetails;

  useEffect(() => {
    dispatch(listGameDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?platform=${selectedPlatform}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Retour
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                Éditeur: {game.developper} <br /> Date de sortie:{" "}
                {new Date(game.release_date).toLocaleDateString("fr")}
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
                  {game.platforms ? (
                    <Row>
                      <Col>Plateformes:</Col>
                      <Col>
                        {game.platforms.steam && (
                          <i
                            className={`fa-brands fa-steam ${
                              selectedPlatform === "steam" && "fa-lg fa-bounce"
                            }`}
                            onClick={() => setSelectedPlatform("steam")}
                          />
                        )}{" "}
                      </Col>
                      <Col>
                        {(game.platforms.xbox_one ||
                          game.platforms.xbox_series) && (
                          <i
                            className={`fa-brands fa-xbox ${
                              selectedPlatform === "xbox" && "fa-lg fa-bounce"
                            }`}
                            onClick={() => setSelectedPlatform("xbox")}
                          />
                        )}
                      </Col>
                      <Col>
                        {(game.platforms.playstation_4 ||
                          game.platforms.playstation_5) && (
                          <i
                            className={`fa-brands fa-playstation ${
                              selectedPlatform === "playstation" &&
                              "fa-lg fa-bounce"
                            }`}
                            onClick={() => setSelectedPlatform("playstation")}
                          />
                        )}
                      </Col>

                      {game.platforms.nintendo_switch && (
                        <Col>
                          <NintendoSwitch
                            className={
                              selectedPlatform === "nintendo_switch"
                                ? "fa-lg fa-bounce"
                                : "fa-sm"
                            }
                            onClick={() =>
                              setSelectedPlatform("nintendo_switch")
                            }
                          />
                        </Col>
                      )}
                    </Row>
                  ) : (
                    <></>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={selectedPlatform === ""}
                    >
                      Ajouter au panier
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Gamescreen;
