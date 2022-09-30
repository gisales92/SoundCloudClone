import { csrfFetch } from "./csrf";

const GET_PLAYLIST_DETAIL = "playlists/getPlaylistDetail";
const USER_PLAYLISTS = "playlists/USER_PLAYLISTS";
const EDIT_PLAYLIST = "playlists/editPlaylist";
const DELETE_PLAYLIST = "playlists/deletePlaylist";
const ADD_SONG_TO_PLAYLIST = "playlists/addSongToPlaylist"
const NEW_PLAYLIST = "playlists/NEW_PLAYLIST";

const newPlaylist = (playlist) => ({
  type: NEW_PLAYLIST,
  playlist,
});

export const getPlaylists = (playlists) => {
  return {
    type: USER_PLAYLISTS,
    playlists,
  };
};

const playlistDetail = (playlist) => {
  return {
    type: GET_PLAYLIST_DETAIL,
    playlist,
  };
};

const deletePlaylist = () => {
  return {
    type: DELETE_PLAYLIST,
  };
};

const editPlaylist = (playlist) => {
  return {
    type: EDIT_PLAYLIST,
    playlist,
  };
};

const addSongToPlaylist = joinInfo => {
  return {
    type: ADD_SONG_TO_PLAYLIST,
    joinInfo
  }
}

export const createPlaylist = (playlist) => async (dispatch) => {
  const formData = new FormData();
  const { name, image } = playlist;
  formData.append("name", name);
  formData.append("image", image);
  const response = await csrfFetch("/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(newPlaylist(data));
  return response;
};

export const getPlaylistsByUser = (userId) => async (dispatch) => {
  // TODO add playlist by user functionality
};

export const getMyPlaylists = () => async (dispatch) => {
  const res = await csrfFetch("/api/my/playlists", {
    method: "GET",
  });
  const data = await res.json();
  dispatch(getPlaylists(data));
  return res;
};

export const getPlaylistDetail = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(playlistDetail(data));
  return res;
};

export const deleteMyPlaylist = (playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  await res.json();
  dispatch(deletePlaylist());
  return res;
};

export const editMyPlaylist = (playlist) => async (dispatch) => {
  const formData = new FormData();
  const { name, image, id } = playlist;
  formData.append("name", name);
  if (image !== null) formData.append("image", image);
  const response = await csrfFetch(`/api/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(editPlaylist(data));
  return response;
};

export const addSong =
  ({ songId, playlistId }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
      method: "POST",
      body: JSON.stringify({ songId }),
    });
    const data = await res.json();
    dispatch(addSongToPlaylist(data));
    return res;
  };

const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PLAYLIST:
      const newKey = action.playlist.id;
      return { ...state, userPlaylists: {...state.userPlaylists, [newKey]: action.playlist}};
    case USER_PLAYLISTS:
      const newState = {...state}
      newState.userPlaylists = {};
      action.playlists.Playlists.forEach((playlist) => {
        newState.userPlaylists[playlist.id] = playlist;
      });
      return newState
    case GET_PLAYLIST_DETAIL:
      return { ...state, detail: action.playlist };
    case DELETE_PLAYLIST:
      return { ...state, detail: {} };
    case EDIT_PLAYLIST:
      return {...state, detail: {
        id: state.detail.id,
        userId: state.detail.userId,
        artist: state.detail.artist,
        name: action.playlist.name,
        createdAt: state.detail.createdAt,
        updatedAt: action.playlist.updatedAt,
        previewImage: action.playlist.previewImage,
        Songs: state.detail.Songs
      } };
    case ADD_SONG_TO_PLAYLIST:
      return {...state, userPlaylists: {[action.joinInfo.playlistId]: action.joinInfo.songId}}
    default:
      return state;
  }
};
export default playlistsReducer;
