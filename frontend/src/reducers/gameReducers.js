import {
  GAME_LIST_REQUEST,
  GAME_LIST_SUCCESS,
  GAME_LIST_FAIL,
} from "../constants/gameConstants";

export const gameListReducer = (state = { games: [] }, action) => {
  switch (action.type) {
    case GAME_LIST_REQUEST:
      return { loading: true, games: [] };
    case GAME_LIST_SUCCESS:
      return { loading: false, games: action.payload };
    case GAME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const gameDetailsReducer = (state = { game: {} }, action) => {
  switch (action.type) {
    case GAME_LIST_REQUEST:
      return { loading: true, games: [] };
    case GAME_LIST_SUCCESS:
      return { loading: false, games: action.payload };
    case GAME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
