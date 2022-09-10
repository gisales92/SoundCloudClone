import { useHistory } from "react-router-dom";
import { audioTrackList } from "../NewAudioPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faList } from "@fortawesome/free-solid-svg-icons";
import "./SongListThumb.css";

export default function SongListThumb({ song }) {
  const { artist, title, previewImage, url, id } = song;
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      src: url,
      content: (
        <div className="queue-content-outer">
          <img src={previewImage} alt="cover-art" className="queue-thumb" />
          <div className="queue-title">{title}</div>
        </div>
      ),
      mediaMetadata: {
        title,
        artist,
        artwork: [{ src: previewImage, sizes: "500x500", type: "image/jpeg" }],
      },
    };

    if (audioTrackList[0].content === "Add a song to the queue") {
      audioTrackList[0] = addTrack;
    } else {
      audioTrackList.push(addTrack);
    }
  };

  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      src: url,
      content: (
        <div className="queue-content-outer">
          <img src={previewImage} alt="cover-art" className="queue-thumb" />
          <div className="queue-title">{title}</div>
        </div>
      ),
      mediaMetadata: {
        title,
        artist,
        artwork: [{ src: previewImage, sizes: "500x500", type: "image/jpeg" }],
      },
    };

    audioTrackList.splice(0, audioTrackList.length, addTrack);
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
