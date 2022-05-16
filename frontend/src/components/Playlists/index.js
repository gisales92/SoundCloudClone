import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userSelector } from "../../store/session";
import CreatePlaylistModal from "../CreatePlaylistFormModal";
import PlaylistTumbnails from "./playlistThumbnails";
import * as playlistActions from "../../store/playlist";
import { csrfFetch } from "../../store/csrf";
import "./PlaylistPreview.css";

function Playlists({ userId }) {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  let mine = false;
  const currentUser = useSelector(userSelector);
  if (currentUser?.id === userId) {
    mine = true;
  }
  const loadedPlaylists = useSelector(
    (state) => state.playlists?.loadedPlaylists?.Playlists
  );

  useEffect(() => {
    if (mine) {
      dispatch(playlistActions.getMyPlaylists());
      setUpdated(true)
    }
  }, [updated]);

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
        <div className="loaded-playlists">
          <ul className="playlist-grid">{loadedPlaylists?.map((playlistObj) => {
            return <PlaylistTumbnails key={playlistObj.id} playlist={playlistObj} />
          })}</ul>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
