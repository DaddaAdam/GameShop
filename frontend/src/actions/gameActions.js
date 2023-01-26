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
  GAME_CREATE_REQUEST,
  GAME_CREATE_SUCCESS,
  GAME_CREATE_FAIL,
  GAME_UPDATE_REQUEST,
  GAME_UPDATE_SUCCESS,
  GAME_UPDATE_FAIL,
  GAME_CREATE_REVIEW_REQUEST,
  GAME_CREATE_REVIEW_SUCCESS,
  GAME_CREATE_REVIEW_FAIL,
} from "../constants/gameConstants";

export const listGames =
  (keyword = "", pageNumber = "") =>
  async dispatch => {
    try {
      dispatch({ type: GAME_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/games?keyword=${keyword}&pageNumber=${pageNumber}`
      );

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

export const createGame = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GAME_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/games`, {}, config);

    dispatch({
      type: GAME_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GAME_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateGame = game => async (dispatch, getState) => {
  try {
    dispatch({
      type: GAME_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/games/${game._id}`, game, config);

    dispatch({
      type: GAME_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: GAME_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GAME_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const gameCreateReview =
  (gameId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GAME_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/games/${gameId}/reviews`, review, config);

      dispatch({
        type: GAME_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: GAME_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
