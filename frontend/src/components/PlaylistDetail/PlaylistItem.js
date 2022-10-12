import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SongListContext } from "../../context/SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import "../SongListThumb/SongListThumb.css";

export default function PlaylistItem({ song }) {
  const [songList, setSongList] = useContext(SongListContext);
  const { artist, title, previewImage, url, id } = song;
  const history = useHistory();
  const added = () => {
    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id === id) return true;
    }
    return false;
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      name: title,
      musicSrc: url,
      cover: `/api/songs/${id}/cover`,
      id,
    };

    setSongList([...songList, addTrack]);
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

      {added() ? (
        <button
          type="button"
          className="add-to-tracklist"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faCheck} /> Added
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="add-to-tracklist active"
        >
          <FontAwesomeIcon icon={faList} /> Add to Next up{" "}
        </button>
      )}
    </div>
  );
};