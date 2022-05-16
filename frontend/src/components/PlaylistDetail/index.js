import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from "../../store/playlist";
import { userSelector } from "../../store/session";
import EditPlaylistModal from "./EditPlaylist";
import DeletePlaylist from "./DeletePlaylist";
import "./PlaylistDetail.css";

function PlaylistDetail() {
  const { playlistId } = useParams();
  let mine = false;
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const playlistDetails = useSelector((state) => state.playlists?.detail);
  useEffect(() => {
    dispatch(playlistActions.getPlaylistDetail(playlistId));
  }, [playlistId]);

  if (currentUser.id === playlistDetails?.userId) {
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
        />
        <h3 className="playlist-detail-sub-title">{playlistDetails?.artist}</h3>
      </div>
     <div className="playlist-actions">
        <EditPlaylistModal playlistId={playlistDetails?.id}/>
        <DeletePlaylist playlistId={playlistDetails?.id}/>
      </div>
    </div>
  );
}

export default PlaylistDetail;
