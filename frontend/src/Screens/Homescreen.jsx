import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Game from "../Components/Game";
import Meta from "../Components/Meta";
import { listGames } from "../actions/gameActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import GameCarousel from "../Components/GameCarousel";

const Homescreen = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  const gameList = useSelector(state => state.gameList);
  const { loading, error, games, page, pages } = gameList;

  useEffect(() => {
    dispatch(listGames(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title={keyword ? `Résultats pour '${keyword}'` : "Home"} />
      {!keyword ? (
        <GameCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Retour
        </Link>
      )}
      <h1>Jeux à la une</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {games.map(game => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Game game={game} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Homescreen;
