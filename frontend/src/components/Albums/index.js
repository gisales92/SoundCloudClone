import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../../store/albums";
import "./Albums.css";

function AllAlbums() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getAlbums() {
      await dispatch(fetchAlbums());
    }
    if (!loaded) {
      getAlbums();
      setLoaded(true);
    }
  }, []);

  return (
    <div className="all-albums-container">
      <h2 id="albums header">All Albums</h2>
      <ul className="all-albums-list">
        {Object.keys(albums).map((albumId) => {
          return (
            <li key={albumId} className="album-preview">
                <img src={albums[albumId].previewImage} className="album-preview cover-image"/>
              <h4 className="album-preview-title">{albums[albumId].title}</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllAlbums;
