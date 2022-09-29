import { csrfFetch } from "./csrf";

// Selectors
export const albumIdSelector = (id) => (state) => state.albums[id];

// Action types
const SET_ALBUMS = "albums/SET_ALBUMS";
const ADD_ALBUM = "albums/ADD_ALBUM";
const EDIT_ALBUM = "albums/EDIT_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const ADD_SONG = "albums/ADD_SONG";

// Action creators
const setAlbums = (albums) => {
  return {
    type: SET_ALBUMS,
    albums,
  };
};

const addAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    album,
  };
};

const editAlbum = (album) => {
  return {
    type: EDIT_ALBUM,
    album,
  };
};

const deleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId,
  };
};

const addSong = (song) => {
  return {
    type: ADD_SONG,
    song,
  };
};

// Thunks
export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums", {
    method: "GET"
  });
  const data = res.json();
  dispatch(setAlbums(data));
  return data;
};

export const createAlbum = ({album})

export const editComment =
  ({ id, body }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body }),
    });
    const data = await res.json();
    dispatch(editMyComment(data));
    return res;
  };

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, detail: action.comment };
    case DELETE_COMMENT:
      return { ...state, detail: {} };
    case EDIT_COMMENT:
      return { ...state, detail: action.comment };
    default:
      return state;
  }
};
export default commentsReducer;
