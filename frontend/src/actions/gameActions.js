import axios from "axios";
import {
  GAME_LIST_REQUEST,
  GAME_LIST_SUCCESS,
  GAME_LIST_FAIL,
  GAME_DETAILS_REQUEST,
  GAME_DETAILS_SUCCESS,
  GAME_DETAILS_FAIL,
  GAME_DELETE_REQUEST,
  GAME_DELETE_SUCCESS,
  GAME_DELETE_FAIL,
} from "../constants/gameConstants";

export const listGames = () => async dispatch => {
  try {
    dispatch({ type: GAME_LIST_REQUEST });

    const { data } = await axios.get("/api/games");

    dispatch({ type: GAME_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GAME_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listGameDetails = id => async dispatch => {
  try {
    dispatch({ type: GAME_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/games/${id}`);

    dispatch({ type: GAME_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GAME_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteGame = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: GAME_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/games/${id}`, config);

    dispatch({
      type: GAME_DELETE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GAME_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
