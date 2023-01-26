import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);
  return (
    <>
      <h1>Utilisateurs</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Payée</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("fr")}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/order/${order._id}/`}
                    className="d-grid gap-2"
                  >
                    <Button classname="btn-sm btn-block">Détails</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
