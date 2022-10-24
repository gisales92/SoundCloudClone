import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songsByArtistId } from "../../store/song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import SongListThumb from "../SongListThumb";


function UserTracks(userId) {
  const dispatch = useDispatch();
  const songs = useSelector(songsByArtistId(userId));

  return (
    <div className="user-tracks-outer">

     {songs.length ? <ul className="index-songs-list">
        {Object.keys(songs)?.map((songId) => {
          if (!isNaN(parseInt(songId))) {
            return <SongListThumb key={songId} song={songs[songId]} />;
          }
        })}
      </ul> : <div className="no-data-outer">
      <FontAwesomeIcon className="no-data icon" icon={faMusic} />
      <p className="profile no-data">Seems a little quiet over here</p>
        </div>}
    </div>
  );
}

export default UserTracks;