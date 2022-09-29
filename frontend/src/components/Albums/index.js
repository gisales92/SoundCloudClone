import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { fetchAlbums } from "../../store/albums";

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
      <h2 id="albums header">All Albums Component</h2>
      <h3 className="sub-heading">Discover Songs</h3>
    </div>
  );
}

export default AllAlbums;
