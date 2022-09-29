import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchAlbums } from "../../store/albums";
import "./Albums.css";

function AlbumDetail() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const match = useRouteMatch({
    path: "/albums/:albumId",
    exact: true,
  });

  useEffect(() => {
    async function getAlbums() {
      await dispatch(fetchAlbums());
    }
    if (!loaded) {
      getAlbums();
      setLoaded(true);
    }
  }, []);

  console.log(match)
  return (
    <div className="album-container">
      <h2 id="albums header">ALBUM COMPONENT {match.params.albumId}</h2>
    </div>
  );
}

export default AlbumDetail;
