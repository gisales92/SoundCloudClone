import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userSelector } from "../../store/session";
import CreatePlaylistModal from "../CreatePlaylistFormModal";
import PlaylistTumbnails from "./playlistThumbnails";
import * as playlistActions from "../../store/playlist";
import { csrfFetch } from "../../store/csrf";
import "./PlaylistPreview.css";

function Playlists({ userId }) {
  const dispatch = useDispatch();
  let mine = false;
  const currentUser = useSelector(userSelector);
  if (currentUser.id === userId) {
    mine = true;
  }
  const loadedPlaylists = useSelector(
    (state) => state.playlists?.loadedPlaylists?.Playlists
  );

  useEffect(() => {
    if (mine) {
      async function getMyPlaylists() {
        const res = await csrfFetch("/api/my/playlists", {
          method: "GET",
        });
        const data = await res.json();
        dispatch(playlistActions.getPlaylists(data));
        return res;
      }
      getMyPlaylists();
    }
  }, [loadedPlaylists?.length]);

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
          <ul>{loadedPlaylists?.map((playlistObj) => {
            return <PlaylistTumbnails key={playlistObj.id} playlist={playlistObj} />
          })}</ul>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
