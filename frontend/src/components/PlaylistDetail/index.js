import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from "../../store/playlist";
import { userSelector } from "../../store/session";
import EditPlaylistModal from "./EditPlaylist";
import DeletePlaylist from "./DeletePlaylist";
import SongListThumb from "../SongListThumb";
import "./PlaylistDetail.css";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const history = useHistory();
  let mine = false;
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const playlistDetails = useSelector((state) => state.playlists?.detail);
  useEffect(() => {
    async function getPlaylists() {
      await dispatch(playlistActions.getPlaylistDetail(playlistId)).catch(
        async (res) => {
          window.alert("No Playlist with the specified Id");
          history.push("/");
        }
      );
    }
    getPlaylists();
  }, [playlistId, dispatch, history]);

  if (currentUser && currentUser?.id === playlistDetails?.userId) {
    mine = true;
  }

  return (
    <div className="playlist-detail-container">
      <div className="playlist-detail-header">
        <h2 className="playlist-detail-title">{playlistDetails?.name}</h2>
        <img
          src={
            playlistDetails?.previewImage
              ? playlistDetails.previewImage
              : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
          }
          className="playlist-detail-thumb-img"
          alt="Playlist thumbnail"
          crossOrigin=""
        />
        <h3 className="playlist-detail-sub-title">{playlistDetails?.artist}</h3>
      </div>
      <div className="playlist-actions">
        {mine ? (
          <>
            <EditPlaylistModal playlistId={playlistDetails?.id} />
            <DeletePlaylist playlistId={playlistDetails?.id} />
          </>
        ) : null}
      </div>
      <h4 className="song-header">Songs</h4>
      <div className="playlist-songs">
        <ul className="playlist-songs-list">
          {playlistDetails?.Songs.map((song) => {
            return <SongListThumb key={song.id} song={song} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default PlaylistDetail;
