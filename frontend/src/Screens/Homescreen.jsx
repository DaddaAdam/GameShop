import { React, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Game from "../Components/Game";
import axios from "axios";

const Homescreen = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchgames = async () => {
      const { data } = await axios.get("/api/games/");
      setGames(data);
    };
    fetchgames();
  }, []);
  return (
    <>
      <Row>
        {games.map(game => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Game game={game} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homescreen;
