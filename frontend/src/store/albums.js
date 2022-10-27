import { csrfFetch } from "./csrf";

// Selectors
export const albumIdSelector = (id) => (state) => state.albums[id];
export const albumArtistSelector = (state) => state.albums.artistInfo;
export const albumsByArtistsSelector = (state) => state.albums.artist;

// Action types
const SET_ALBUMS = "albums/SET_ALBUMS";
const ADD_ALBUM = "albums/ADD_ALBUM";
const EDIT_ALBUM = "albums/EDIT_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const ADD_SONG = "albums/ADD_SONG";
const GET_ARTIST = "albums/GET_ARTIST";
const GET_ARTIST_ALBUMS = "albums/GET_ARTIST_ALBUMS";
const GET_ALBUM = "albums/GET_ALBUM";

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

const getArtist = (artist) => {
  return {
    type: GET_ARTIST,
    artist,
  };
};

const getArtistAlbums = (albums) => {
  return {
    type: GET_ARTIST_ALBUMS,
    albums,
  };
};

const getAlbum = (album) => {
  return {
    type: GET_ALBUM,
    album,
  };
};

// Thunks
export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums", {
    method: "GET",
  });
  const data = await res.json();
  dispatch(setAlbums(data));
  return data;
};

export const createAlbum = (album) => async (dispatch) => {
  const formData = new FormData();
  const { title, description, image } = album;
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await res.json();
  dispatch(addAlbum(data));
  return data;
};

export const updateAlbum =
  ({ album }) =>
  async (dispatch) => {
    const formData = new FormData();
    const { title, description, image } = album;
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    const res = await csrfFetch(`/api/albums/${album.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const data = await res.json();
    dispatch(editAlbum(data));
    return data;
  };

export const removeAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });
  if (res.ok) dispatch(deleteAlbum(albumId));
  return res;
};

export const newSong = (song) => async (dispatch) => {
  const formData = new FormData();
};

export const getAlbumArtist = (artistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/artists/${artistId}`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) dispatch(getArtist(data));
  return res;
};

export const setArtistAlbums = (artistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/artists/${artistId}/albums`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) dispatch(getArtistAlbums(data));
  return res;
};

export const getAlbumDetails = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "GET",
  });
  const data = await res.json();
  if (res.ok) dispatch(getAlbum(data));
  return res;
}

const albumsReducer = (state = { artistInfo: {}, artist: {} }, action) => {
  const newState = { ...state };
  newState.artistInfo = { ...state.artistInfo };
  newState.artist = { ...state.artist };
  switch (action.type) {
    case SET_ALBUMS:
      action.albums.Albums.forEach((album) => {
        newState[album.id] = album;
      });
      break;
    case GET_ARTIST:
      newState.artistInfo = action.artist;
      break;
    case GET_ARTIST_ALBUMS:
      action.albums.forEach((album) => {
        newState.artist[album.id] = album;
      });
      break;
    case GET_ALBUM:
      newState.detail = action.album;
    default:
      break;
  }
  return newState;
};
export default albumsReducer;
