import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Table } from "react-bootstrap";
import { NintendoSwitch } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listGames } from "../actions/gameActions";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const GameListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gameList = useSelector(state => state.gameList);
  const { loading, error, games } = gameList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const createGameHandler = () => {};

  const deleteHandler = id => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur?")) {
      // dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listGames());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);
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
                <td>${game.price}</td>
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
                    <Button variant="light" classname="btn-sm">
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
