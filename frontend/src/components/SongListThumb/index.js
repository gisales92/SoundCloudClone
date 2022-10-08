import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SongListContext } from "../../context/SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faList } from "@fortawesome/free-solid-svg-icons";
import "./SongListThumb.css";

export default function SongListThumb({ song }) {
  const [songList, setSongList] = useContext(SongListContext);
  const { artist, title, previewImage, url, id } = song;
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      name: title,
      musicSrc: url,
      cover: previewImage,
    };

    if (songList.length < 1) {
      setSongList([addTrack]);
    } else {
      setSongList([ ...songList, addTrack ]);
    }
  };

  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      name: title,
      musicSrc: url,
      cover: previewImage,
    };

    setSongList([ addTrack, ...songList ]);
  };

  const handleNav = (e) => {
    history.push(`/songs/${id}`);
  };
  return (
    <div className="song-playlist-preview" onClick={handleNav}>
      <img
        className="song-playlist-cover"
        src={
          previewImage
            ? previewImage
            : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
        }
        alt="Song cover art thumbnail"
        crossOrigin=""
      />
      <div className="song-playlist-info">
        <p className="song-thumb-user">{artist} -</p>
        <p className="song-thumb-title">{title}</p>
      </div>

      <button type="button" onClick={handlePlay} className="track-play">
        <FontAwesomeIcon icon={faPlay} />
      </button>

      <button type="button" onClick={handleClick} className="add-to-tracklist">
        <FontAwesomeIcon icon={faList} /> Add to Next up
      </button>
    </div>
  );
}
