import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as PlaylistActions from "../../store/playlist";

export default function DeletePlaylist({ playlistId }) {
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = (e) => {
    return dispatch(
        PlaylistActions.deleteMyPlaylist(playlistId)
    )
      .then(() => {
        window.alert("Playlist has been successfully deleted");
        history.push("/my/playlists");
      })
      .catch(async (res) => {
        window.alert("There's been an error");
        }
      );
  };


  return (
    <button type="button" className="delete-playlist-button" onClick={handleClick}>
      Delete
    </button>
  );
}
