import { useSelector } from "react-redux";
import { albumsByArtistsSelector } from "../../store/albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function UserAlbums() {
  const albums = useSelector(albumsByArtistsSelector);

  return (
    albums && (
      <div className="user-tracks-outer">
        {Object.keys(albums).length ? (
          <ul className="index-albums-list">
            {Object.keys(albums)?.map((albumId) => {
              return (
                <div className="user-album-item">{albums[albumId].title}</div>
              );
            })}
          </ul>
        ) : (
          <div className="no-data-outer">
            <FontAwesomeIcon className="no-data icon" icon={faMusic} />
            <p className="profile no-data">Seems a little quiet over here</p>
          </div>
        )}
      </div>
    )
  );
}

export default UserAlbums;
