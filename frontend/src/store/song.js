import { csrfFetch } from "./csrf";

const GET_SONG_DETAIL = "songs/getSongDetail";

const songDetail = (song) => {
  return {
    type: GET_SONG_DETAIL,
    song,
  };
};

export const getSongDetail = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(songDetail(data));
  return res;
};


const songsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SONG_DETAIL:
        return { ...state, detail: action.song };
      default:
        return state;
    }
  };
  export default songsReducer;