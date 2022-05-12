import { csrfFetch } from "./csrf";

const GET_PLAYLIST = "playlist/getPlaylist"
const CREATE_PLAYLIST = "playlist/createPlaylist"
const EDIT_PLAYLIST = "playlist/editPlaylist"
const DELETE_PLAYLIST = "playlist/deletePlaylist"

export const createPlaylist = (playlist) => async (dispatch) => {
    const { name, imageUrl } = playlist;
    const response = await csrfFetch("/api/playlists", {
      method: "POST",
      body: JSON.stringify({
        name,
        imageUrl
      }),
    });
    const data = await response.json();
    // dispatch(setUser(data));
    return response;
  };

  // export default playlistsReducer;