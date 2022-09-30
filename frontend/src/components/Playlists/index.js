import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CreatePlaylistModal from "../CreatePlaylistFormModal";
import PlaylistGrid from "./playlistGrid";
import * as playlistActions from "../../store/playlist";
import "./PlaylistPreview.css";

function Playlists() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function getPlaylists() {
      await dispatch(playlistActions.getMyPlaylists());
    }
    if (!loaded) {
      getPlaylists();
      setLoaded(true);
    }
  }, []);

  return (
    loaded && (
      <div id="playlist-preview">
        <h2 id="playlist-header">Your Playlists</h2>
        <div className="playlist-content">
          <div className="create-playlist-container">
            <CreatePlaylistModal />
            <p className="create-playlist">Create new playlist</p>
          </div>

          <div className="loaded-playlists">
            <PlaylistGrid />
          </div>
        </div>
      </div>
    )
  );
}

export default Playlists;
