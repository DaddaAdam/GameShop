import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { getuserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      console.log("no user");
    } else {
      if (!user.name) {
        dispatch(getuserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword)
      setMessage("Assurez vous que les mots de passe soient similaires.");
    else dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profil </h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">Profil mis à jour avec succès!</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="name"
              placeholder="Saisissez votre nom d'utilisateur"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Saisissez votre adresse email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Saisissez un nouveau mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirmez le mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Modifier
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mes commandes</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
