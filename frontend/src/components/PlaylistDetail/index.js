import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from "../../store/playlist";
import "./PlaylistDetail.css"

function PlaylistDetail() {
  const { playlistId } = useParams();
  console.log("Id: ", playlistId);
  const dispatch = useDispatch();
  const playlistDetails = useSelector((state) => state.playlists?.detail);

  console.log("Selected Store Data:", playlistDetails);
  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetail(playlistId));
  }, [playlistId]);
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
        />
      </div>
    </div>
  );
}

export default PlaylistDetail;
