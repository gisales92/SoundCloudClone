import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchAlbums, albumIdSelector } from "../../store/albums";
import "./Albums.css";

function AlbumDetail() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const match = useRouteMatch({
    path: "/albums/:albumId",
    exact: true,
  });
  const album = useSelector(albumIdSelector(match.params.albumId))

  useEffect(() => {
    async function getAlbums() {
      await dispatch(fetchAlbums());
    }
    if (!loaded) {
      getAlbums();
      setLoaded(true);
    }
  }, []);

  return album && (
    <div className="album-container">
      <h2 id="albums header">ALBUM COMPONENT {album.title}</h2>
    </div>
  );
}

export default AlbumDetail;
