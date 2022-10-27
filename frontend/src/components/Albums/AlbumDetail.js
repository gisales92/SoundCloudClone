import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import {
  albumIdSelector,
  albumArtistSelector,
  getAlbumDetails
} from "../../store/albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import "./Albums.css";

function AlbumDetail() {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const match = useRouteMatch({
    path: "/albums/:albumId",
    exact: true,
  });
  const albumId = match.params.albumId;
  const album = useSelector(albumIdSelector(match.params.albumId));
  const artist = useSelector(albumArtistSelector(albumId));

  useEffect(() => {
    async function loadAlbum(albumId) {
      await dispatch(getAlbumDetails(albumId));
    }
    if (!updated) {
      loadAlbum(albumId);
      setUpdated(true);
    }
  }, [updated, album]);

  return (
    album &&
    updated && (
      <div className="album-container">
        <div className="album-header">
          <div className="album-header-left">
            <h2 className="album-title-detail">{album.title}</h2>
            <h3 className="album-artist-detail">{artist?.username}</h3>
          </div>
          <div className="album-header-right">
            {album.previewImage ? (
              <img
                src={album.previewImage}
                crossOrigin=""
                alt="album cover"
                className="album-cover-detail"
              />
            ) : (
              <FontAwesomeIcon
                className="album-cover-detail icon"
                icon={faRecordVinyl}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default AlbumDetail;
