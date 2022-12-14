import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Game from "../Components/Game";
import { listGames } from "../actions/gameActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Homescreen = () => {
  const dispatch = useDispatch();
  const gameList = useSelector(state => state.gameList);

  const { loading, error, games } = gameList;
  useEffect(() => {
    dispatch(listGames());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {games.map(game => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Game game={game} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreen;
