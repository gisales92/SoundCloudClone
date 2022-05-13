import { csrfFetch } from "./csrf";


const GET_PLAYLIST_DETAIL = "playlists/getPlaylistDetail"
const GET_PLAYLISTS = "playlists/getPlaylists"
const CREATE_PLAYLIST = "playlists/createPlaylist"
const EDIT_PLAYLIST = "playlists/editPlaylist"
const DELETE_PLAYLIST = "playlists/deletePlaylist"
const SET_IMAGE = 'playlists/SET_IMAGE';

const setImage = (image) => ({
  type: SET_IMAGE,
  image,
});

export const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    playlists
  }
}

const playlistDetail = (playlist) => {
  return {
    type: GET_PLAYLIST_DETAIL,
    playlist,
  }
}

export const createPlaylist = (playlist) => async (dispatch) => {
  const formData = new FormData();
  const { name, image } = playlist;
  formData.append("name", name);
  formData.append("image", image)
    const response = await csrfFetch("/api/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const data = await response.json();
    dispatch(setImage(data.previewImage));
    return response;
  };

export const getPlaylistsByUser = (userId) => async (dispatch) => {
    // TODO add playlist by user functionality
}

export const getMyPlaylists = () => async (dispatch) => {
  console.log("Action is running");
   const res = await csrfFetch("/api/my/playlists", {
     method: "GET"
   });
   const data = await res.json();
   dispatch(getPlaylists(data));
   return res;
}

export const getPlaylistDetail = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "GET"
  });
  const data = await res.json();
  dispatch(playlistDetail(data));
  return res;
}

  const playlistsReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_IMAGE:
        return { ...state, addImage: action.image };
      case GET_PLAYLISTS:
        return {...state, loadedPlaylists: action.playlists};
      case GET_PLAYLIST_DETAIL:
        return {...state, detail: action.playlist};
      default:
        return state;
    }
  }
  export default playlistsReducer;