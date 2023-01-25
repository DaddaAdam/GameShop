import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listGameDetails, updateGame } from "../actions/gameActions";
import FormContainer from "../Components/FormContainer";
import { useParams } from "react-router-dom";
import { GAME_UPDATE_RESET } from "../constants/gameConstants";

const GameEditScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gameDetails = useSelector(state => state.gameDetails);
  const { loading, error, game } = gameDetails;

  const gameUpdate = useSelector(state => state.gameUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = gameUpdate;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState({});
  const [release_date, setRelease_date] = useState(new Date());
  const [developper, setDevelopper] = useState("");

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: GAME_UPDATE_RESET,
      });
      navigate("/admin/games");
    }
    if (!game.name || game._id !== id) {
      dispatch(listGameDetails(id));
    } else {
      setName(game.name);
      setPrice(game.price);
      setImage(game.image);
      setDescription(game.description);
      setPlatforms(game.platforms);
      setRelease_date(new Date(game.release_date).toISOString().split("T")[0]);
      setDevelopper(game.developper);
    }
  }, [game, dispatch, id, successUpdate, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    console.log(platforms);
    dispatch(
      updateGame({
        _id: id,
        name,
        price,
        image,
        description,
        platforms,
        release_date,
        developper,
        rating: game.rating,
        numReviews: game.numReviews,
      })
    );
  };

  return (
    <>
      <Link to="/admin/games" className="btn btn-light my-3">
        Retour
      </Link>
      <FormContainer>
        <h1>Editer le jeu</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="name"
                placeholder="Saisissez le nom du jeu"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Saisissez l'Url de l'image"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="developper">
              <Form.Label>Éditeur</Form.Label>
              <Form.Control
                type="text"
                value={developper}
                onChange={e => setDevelopper(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="release_date">
              <Form.Label>Date de sortie</Form.Label>
              <Form.Control
                type="date"
                value={release_date}
                onChange={e => setRelease_date(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="platforms">
              <Form.Label>Plateformes</Form.Label>
              <Form.Check
                type="checkbox"
                label="Steam"
                checked={platforms.steam}
                onChange={e =>
                  setPlatforms({
                    steam: e.target.checked,
                    xbox_one: platforms.xbox_one,
                    xbox_series: platforms.xbox_series,
                    playstation_4: platforms.playstation_4,
                    playstation_5: platforms.playstation_5,
                    nintendo_switch: platforms.nintendo_switch,
                  })
                }
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Playstation 4"
                checked={platforms.playstation_4}
                onChange={e =>
                  setPlatforms({
                    steam: platforms.steam,
                    xbox_one: platforms.xbox_one,
                    xbox_series: platforms.xbox_series,
                    playstation_4: e.target.checked,
                    playstation_5: platforms.playstation_5,
                    nintendo_switch: platforms.nintendo_switch,
                  })
                }
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Playstation 5"
                checked={platforms.playstation_5}
                onChange={e =>
                  setPlatforms({
                    steam: platforms.steam,
                    xbox_one: platforms.xbox_one,
                    xbox_series: platforms.xbox_series,
                    playstation_4: platforms.playstation_4,
                    playstation_5: platforms.e.target.checked,
                    nintendo_switch: platforms.nintendo_switch,
                  })
                }
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Xbox One"
                checked={platforms.xbox_one}
                onChange={e =>
                  setPlatforms({
                    steam: platforms.steam,
                    xbox_one: e.target.checked,
                    xbox_series: platforms.xbox_series,
                    playstation_4: platforms.playstation_4,
                    playstation_5: platforms.playstation_5,
                    nintendo_switch: platforms.nintendo_switch,
                  })
                }
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Xbox Series"
                checked={platforms.xbox_series}
                onChange={e =>
                  setPlatforms({
                    steam: platforms.steam,
                    xbox_one: platforms.xbox_one,
                    xbox_series: e.target.checked,
                    playstation_4: platforms.playstation_4,
                    playstation_5: platforms.playstation_5,
                    nintendo_switch: platforms.nintendo_switch,
                  })
                }
              ></Form.Check>
              <Form.Check
                type="checkbox"
                label="Nintendo Switch"
                checked={platforms.nintendo_switch}
                onChange={e =>
                  setPlatforms({
                    steam: platforms.steam,
                    xbox_one: platforms.xbox_one,
                    xbox_series: platforms.xbox_series,
                    playstation_4: platforms.playstation_4,
                    playstation_5: platforms.playstation_5,
                    nintendo_switch: platforms.e.target.checked,
                  })
                }
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Mettre à jour
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default GameEditScreen;
