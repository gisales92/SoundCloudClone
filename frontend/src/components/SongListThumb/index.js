import "./SongListThumb.css"

export default function SongListThumb({ song }) {
  const { artist, title, previewImage } = song; // can destructure songId for future routing
  return (
    <div className="song-playlist-preview">
      <img
      className="song-playlist-cover"
        src={
          previewImage
            ? previewImage
            : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
        }
        alt="Song cover art thumbnail"
      />
      <p className="song-playlist-info">{`${title} by ${artist}`}</p>
    </div>
  );
}
