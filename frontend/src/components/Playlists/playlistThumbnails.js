import {Link} from "react-router-dom"

function PlaylistTumbnails({ playlist }) {
  const { name, previewImage, id: playlistId } = playlist;
  return (
    <div className="playlist-thumb">
      <Link to={`/playlists/${playlistId}`} className="playlist-thumb-link">
        <img
          src={
            previewImage
              ? previewImage
              : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
          }
          className="playlist-thumb-img"
        />
        <p className="playlist-title">{name}</p>
      </Link>
    </div>
  );
}

export default PlaylistTumbnails;
