import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import {
  fetchAlbums,
  albumIdSelector,
  getAlbumArtist,
  albumArtistSelector,
} from "../../store/albums";
import "./Albums.css";

function AlbumDetail() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const match = useRouteMatch({
    path: "/albums/:albumId",
    exact: true,
  });
  const album = useSelector(albumIdSelector(match.params.albumId));
  const artist = useSelector(albumArtistSelector);

  useEffect(() => {
    async function getAlbums() {
      await dispatch(fetchAlbums());
    }
    if (!loaded) {
      getAlbums();
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    async function getArtist(id) {
      await dispatch(getAlbumArtist(id));
    }
    if (loaded && album) {
      getArtist(album.userId);
      setUpdated(true);
    }
  }, [loaded, album]);

  return (
    album && updated && (
      <div className="album-container">
        <h2 className="album-title">{album.title}</h2>
        <h3 className="album-artist">{artist?.username}</h3>
      </div>
    )
  );
}

export default AlbumDetail;
