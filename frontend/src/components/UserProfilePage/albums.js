import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { albumsByArtistsSelector } from "../../store/albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { timestamper } from "../SongDetail";

function UserAlbums() {
  const albums = useSelector(albumsByArtistsSelector);

  return (
    albums && (
      <div className="user-albums-outer">
        {Object.keys(albums).length ? (
          <ul className="user-albums-list">
            {Object.keys(albums)?.map((albumId) => {
              return (
                <div key={albumId} className="user-album-outer">
                  <div className="user-album-left">
                    <Link to={`/albums/${albumId}`}>
                      {albums[albumId].previewImage ? (
                        <img
                          src={albums[albumId].previewImage}
                          crossOrigin=""
                          alt="album cover"
                          className="album-cover"
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="album-cover icon"
                          icon={faRecordVinyl}
                        />
                      )}
                    </Link>
                    <div className="album-center">
                      <Link to={`/albums/${albumId}`}>
                        <p className="album-title profile">
                          {albums[albumId].title}
                        </p>
                      </Link>
                      <p className="album-description profile">
                        {albums[albumId].description}
                      </p>
                    </div>
                  </div>
                  <p className="album-time profile">{`${timestamper(
                    albums[albumId].createdAt
                  )} ago`}</p>
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="no-data-outer">
            <FontAwesomeIcon className="no-data icon" icon={faRecordVinyl} />
            <p className="profile no-data">Seems a little quiet over here</p>
          </div>
        )}
      </div>
    )
  );
}

export default UserAlbums;
