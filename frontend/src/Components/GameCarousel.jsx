import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopGames } from "../actions/gameActions";

const GameCarousel = () => {
  const dispatch = useDispatch();

  const gameTopRated = useSelector(state => state.gameTopRated);
  const { loading, error, games } = gameTopRated;

  useEffect(() => {
    dispatch(listTopGames());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {games.map(game => (
        <Carousel.Item key={game._id}>
          <Link to={`/game/${game._id}`}>
            <Image src={game.image} alt={game.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {game.name} (${game.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GameCarousel;
