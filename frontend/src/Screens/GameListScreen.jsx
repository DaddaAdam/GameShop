import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Table } from "react-bootstrap";
import { NintendoSwitch } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listGames, createGame, deleteGame } from "../actions/gameActions";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { GAME_CREATE_RESET } from "../constants/gameConstants";

const GameListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gameList = useSelector(state => state.gameList);
  const { loading, error, games } = gameList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const gameDelete = useSelector(state => state.gameDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = gameDelete;

  const gameCreate = useSelector(state => state.gameCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    game: createdGame,
  } = gameCreate;

  const createGameHandler = () => {
    dispatch(createGame());
  };

  const deleteHandler = id => {
    if (window.confirm("Voulez-vous vraiment supprimer ce jeu?")) {
      dispatch(deleteGame(id));
    }
  };

  useEffect(() => {
    dispatch({
      type: GAME_CREATE_RESET,
    });

    if (!userInfo.isAdmin) navigate("/login");

    if (successCreate) navigate(`/admin/game/${createdGame._id}/edit`);
    dispatch(listGames());
  }, [dispatch, userInfo, navigate, successDelete, successCreate, createdGame]);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Jeux</h1>
        </Col>
        <Col className="text-center">
          <Button className="my-3" onClick={createGameHandler}>
            <i className="fas fa-plus" /> Nouveau jeu
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Editeur</th>
              <th>Prix</th>
              <th>Plateformes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game._id}>
                <td>{game._id}</td>
                <td>
                  <Link to={`/game/${game._id}`}>{game.name}</Link>
                </td>
                <td>{game.developper}</td>
                <td>${game.price.toFixed(2)}</td>
                <td>
                  {(game.platforms.playstation_4 ||
                    game.platforms.playstation_5) && (
                    <i className="fa-brands fa-playstation" />
                  )}{" "}
                  {game.platforms.nintendo_switch && (
                    <NintendoSwitch className="fa-md" />
                  )}{" "}
                  {game.platforms.steam && <i className="fa-brands fa-steam" />}{" "}
                  {(game.platforms.xbox_one || game.platforms.xbox_series) && (
                    <i className="fa-brands fa-xbox" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/game/${game._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(game._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default GameListScreen;
