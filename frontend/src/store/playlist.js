import { csrfFetch } from "./csrf";

export const playlistDetailSelector = (state) => state.playlists.detail;

const GET_PLAYLIST_DETAIL = "playlists/getPlaylistDetail";
const USER_PLAYLISTS = "playlists/USER_PLAYLISTS";
const EDIT_PLAYLIST = "playlists/editPlaylist";
const DELETE_PLAYLIST = "playlists/deletePlaylist";
const ADD_SONG_TO_PLAYLIST = "playlists/addSongToPlaylist";
const REMOVE_SONG_FROM_PLAYLIST = "playlists/REMOVE_SONG_FROM_PLAYLIST";
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

const addSongToPlaylist = (joinInfo) => {
  return {
    type: ADD_SONG_TO_PLAYLIST,
    joinInfo,
  };
};

const removeSongFromPlaylist = (data) => {
  return {
    type: REMOVE_SONG_FROM_PLAYLIST,
    data,
  };
};

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

export const removeSong = (songId, playlistId) => async (dispatch) => {
  const res = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
    method: "PUT",
    body: JSON.stringify({ songId }),
  });
  if (res.status === 200) {
    dispatch(removeSongFromPlaylist({ songId, playlistId }));
  }
  return;
};

const playlistsReducer = (
  state = { userPlaylists: {}, detail: {}, artist: {} },
  action
) => {
  const newState = { ...state };
  newState.userPlaylists = { ...state.userPlaylists };
  newState.detail = { ...state.detail };
  newState.artist = { ...state.artist };
  switch (action.type) {
    case NEW_PLAYLIST:
      const newKey = action.playlist.id;
      newState.userPlaylists[newKey] = action.playlist;
      break;

    case USER_PLAYLISTS:
      action.playlists.Playlists.forEach((playlist) => {
        newState.userPlaylists[playlist.id] = playlist;
      });
      break;
    case GET_PLAYLIST_DETAIL:
      newState.detail = action.playlist;
      break;
    case DELETE_PLAYLIST:
      newState.detail = {};
      break;
    case EDIT_PLAYLIST:
      newState.detail = {
        id: state.detail.id,
        userId: state.detail.userId,
        artist: state.detail.artist,
        name: action.playlist.name,
        createdAt: state.detail.createdAt,
        updatedAt: action.playlist.updatedAt,
        previewImage: action.playlist.previewImage,
        Songs: state.detail.Songs,
      };
      break;
    case ADD_SONG_TO_PLAYLIST:
      // individual song data only retrieved in the playlist detail view, and we aren't going add a song from that view.
      break;
    case REMOVE_SONG_FROM_PLAYLIST:
      newState.detail.Songs.forEach((song, index) => {
        if (song.id === action.data.songId) {
          newState.detail.Songs.splice(index, 1);
        }
      });
      break;
    default:
      break;
  }
  return newState;
};
export default playlistsReducer;
