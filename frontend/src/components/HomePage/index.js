import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { fetchSongs } from "../../store/song";
import SongListThumb from "../SongListThumb";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);

  return (
    <div className="home">
      <h2 id="home-header">
        Welcome to Press <FontAwesomeIcon icon={faPlay} /> Play!
      </h2>
      <h3 className="sub-heading">Discover Songs</h3>
      <ul className="index-songs-list">
        {Object.keys(songs)?.map((songId) => {
          return <SongListThumb key={songId} song={songs[songId]} />;
        })}
      </ul>
    </div>
  );
}

export default HomePage;
