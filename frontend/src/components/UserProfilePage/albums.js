import { useSelector } from "react-redux";
import { albumsByArtistsSelector } from "../../store/albums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { timestamper } from "../SongDetail";

function UserAlbums() {
  const albums = useSelector(albumsByArtistsSelector);

  return (
    albums && (
      <div className="user-tracks-outer">
        {Object.keys(albums).length ? (
          <ul className="index-albums-list">
            {Object.keys(albums)?.map((albumId) => {
              console.log();
              return (
                <div key={albumId} className="user-album-outer">
                  {albums[albumId].previewImage ? (
                    <img
                      src={albums[albumId].previewImage}
                      crossOrigin=""
                      alt="album cover"
                      className="album-cover"
                    />
                  ) : (
                    <FontAwesomeIcon className="album-cover icon" icon={faRecordVinyl} />
                  )}
                  <p className="album-title profile">{albums[albumId].title}</p>
                  <p className="album-time profile">{`${timestamper(
                    albums[albumId].createdAt
                  )} ago`}</p>
                </div>
              );
            })}
          </ul>
        ) : (
          <div className="no-data-outer">
            <p className="profile no-data">Seems a little quiet over here</p>
          </div>
        )}
      </div>
    )
  );
}

export default UserAlbums;
