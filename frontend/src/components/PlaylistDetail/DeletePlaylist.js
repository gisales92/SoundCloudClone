import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as PlaylistActions from "../../store/playlist";

export default function DeletePlaylist({ playlistId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    await dispatch(PlaylistActions.deleteMyPlaylist(playlistId));

    window.alert("Playlist has been successfully deleted");
    history.push("/my/playlists");
  };

  return (
    <button
      type="button"
      className="delete-playlist-button"
      onClick={handleClick}
    >
      Delete
    </button>
  );
}
