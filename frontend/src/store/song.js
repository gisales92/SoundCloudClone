import { csrfFetch } from "./csrf";

const GET_SONG_DETAIL = "songs/getSongDetail";
const SET_SONGS = "songs/setSongs"

const songDetail = (song) => {
  return {
    type: GET_SONG_DETAIL,
    song,
  };
};

const setSongs = (songs) => {
  return {
    type: SET_SONGS,
    songs
  }
}

export const getSongDetail = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(songDetail(data));
  return res;
};

export const fetchSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "GET",
  });
  const data = await res.json();
  dispatch(setSongs(data));
  return res;
};


const songsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SONG_DETAIL:
        return { ...state, detail: action.song };
      case SET_SONGS:
        const newState = {...state}
        action.songs.Songs.forEach((song) => {
          newState[song.id] = song
        })
        return newState;
      default:
        return state;
    }
  };
  export default songsReducer;