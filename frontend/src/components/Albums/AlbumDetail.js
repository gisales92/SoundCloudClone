import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import {
  albumIdSelector,
  albumArtistSelector,
  getAlbumDetails,
} from "../../store/albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl, faListUl } from "@fortawesome/free-solid-svg-icons";
import { timestamper } from "../SongDetail";
import { userSelector } from "../../store/session";
import SongListThumb from "../SongListThumb";
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
  const user = useSelector(userSelector);

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
            <div className="a-header upper-left">
              <h2 className="album-title-detail">{album.title}</h2>
              <h3 className="album-artist-detail">{artist?.username}</h3>
            </div>
            <div className="a-header lower-left">
              <p className="album-song-count">{album.Songs.length}</p>
              <p className="album-count-label">
                {album.Songs.length === 1 ? "Track" : "Tracks"}
              </p>
            </div>
          </div>
          <div className="album-header-right">
            <p className="album-header-timestamp">{`${timestamper(
              album.createdAt
            )} ago`}</p>
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
        <div className="album-body">
          <div className="album-body-left">
            <img
              src={
                artist.previewImage
                  ? artist.previewImage
                  : "https://upload.wikimedia.org/wikipedia/commons/9/98/OOjs_UI_icon_userAvatar.svg"
              }
              alt="profile"
              className="album-artist-pic"
              crossOrigin=""
            />
            <p className="album-artist-name">{artist?.username}</p>
          </div>
          <div className="album-body-right">
            <p className="album-description">{album.description}</p>
            {album.Songs.length ? (
              (<ul className="album-songs-list">
                {album.Songs.map((songObj) => {
                  return (<SongListThumb className="album-song-outer" key={songObj.id} song={songObj}/>)
                })}
              </ul>)
            ) : (
              <div className="album-no-songs-outer">
                <FontAwesomeIcon
                  className="album-no-songs icon"
                  icon={faListUl}
                />
                <p className="album-no-songs">
                  No tracks added to this album yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default AlbumDetail;
