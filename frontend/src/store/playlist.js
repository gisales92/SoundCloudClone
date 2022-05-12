import { csrfFetch } from "./csrf";

const GET_PLAYLIST = "playlist/getPlaylist"
const CREATE_PLAYLIST = "playlist/createPlaylist"
const EDIT_PLAYLIST = "playlist/editPlaylist"
const DELETE_PLAYLIST = "playlist/deletePlaylist"
const SET_IMAGE = 'playlist/SET_IMAGE';

const setImage = (image) => ({
  type: SET_IMAGE,
  image,
});

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

  const playlistsReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_IMAGE:
        return { ...state, addImage: action.image };
      default:
        return state;
    }
  }
  export default playlistsReducer;