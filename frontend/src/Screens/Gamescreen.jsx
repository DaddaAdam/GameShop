import { React, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { NintendoSwitch } from "react-bootstrap-icons";
import Rating from "../Components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listGameDetails, gameCreateReview } from "../actions/gameActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { GAME_CREATE_REVIEW_RESET } from "../constants/gameConstants";
import Meta from "../Components/Meta";

const Gamescreen = props => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const gameReviewCreate = useSelector(state => state.gameReviewCreate);
  const { error: errorReview, success: successReview } = gameReviewCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedPlatform, setSelectedPlatform] = useState("");

  const dispatch = useDispatch();

  const gameDetails = useSelector(state => state.gameDetails);
  const { loading, error, game } = gameDetails;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(gameCreateReview(id, { rating, comment }));
  };

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: GAME_CREATE_REVIEW_RESET });
    }
    dispatch(listGameDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?platform=${selectedPlatform}`);
  };

  return (
    <>
      <Meta title={game.name} />
      <Link className="btn btn-light my-3" to="/">
        Retour
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                                selectedPlatform === "steam" &&
                                "fa-lg fa-bounce"
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
          <Row>
            <Col md={6}>
              <h2>Évaluations</h2>
              {game.reviews.length === 0 && (
                <Message>Aucune évaluation pour ce jeu.</Message>
              )}
              <ListGroup variant="flush">
                {game.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{new Date(review.createdAt).toLocaleDateString("fr")}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Ajouter une évaluation pour ce jeu</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Avis</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">Selectionner...</option>
                          <option value="1">1 - Très négatif</option>
                          <option value="2">2 - Négatif</option>
                          <option value="3">3 - Moyen</option>
                          <option value="4">4 - Positif</option>
                          <option value="5">5 - Très positif</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Commentaire</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Button type="submit" variant="primary">
                          Envoyer
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Vous devez vous <Link to="/login">identifier</Link> pour
                      rédiger une évaluation
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Gamescreen;
