import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import CreatePlaylistModal from "../CreatePlaylistFormModal";
import "./PlaylistPreview.css";

function Playlists({ userId }) {
  let mine = false;
  const currentUser = useSelector(userSelector);
  if (currentUser.id === userId) mine = true;
  return (
    <div id="playlist-preview">
      <h2 id="playlist-header">Playlists</h2>
      <div className="playlist-content">
        {mine ? (
          <div className="create-playlist-container">
            <CreatePlaylistModal />
            <p>Create new playlist</p>
          </div>
        ) : null}
        <div className="playlist-grid">
          <div className="playlist-thumb">
            <a className="playlist-thumb-link">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
                className="playlist-thumb-img"
              />
            </a>
            <p className="playlist-title">New name for first playlist</p>
            <p className="playlist-artist">Demo-lition</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
