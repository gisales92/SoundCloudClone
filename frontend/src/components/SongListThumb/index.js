import { useContext } from "react";
import { SongContext } from "../../context/Song";
import { useHistory } from "react-router-dom";
import "./SongListThumb.css";

export default function SongListThumb({ song }) {
  const { artist, title, previewImage, url, id } = song;
  const { tracks, setTracks } = useContext(SongContext);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTracks([...tracks, { name: title, artist, previewImage, url }]);
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
      <p className="song-playlist-info">{`${title} by ${artist}`}</p>

      <button type="button" onClick={handleClick} className="add-to-tracklist">
        Add song to Queue
      </button>
    </div>
  );
}
