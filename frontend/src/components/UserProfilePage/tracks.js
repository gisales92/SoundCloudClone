import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songsByArtistId } from "../../store/song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SongListThumb from "../SongListThumb";


function UserTracks(userId) {
  const dispatch = useDispatch();
  const songs = useSelector(songsByArtistId(userId));

  return (
    <div className="user-tracks-outer">

      <ul className="index-songs-list">
        {Object.keys(songs)?.map((songId) => {
          if (!isNaN(parseInt(songId))) {
            return <SongListThumb key={songId} song={songs[songId]} />;
          }
        })}
      </ul>
    </div>
  );
}

export default UserTracks;