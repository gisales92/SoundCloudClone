function PlaylistTumbnails({ playlist }) {
  console.log(playlist.name);
  const { name, previewImage } = playlist;
  return (
    <div className="playlist-thumb">
      <a className="playlist-thumb-link">
        <img
          src={
            previewImage
              ? previewImage
              : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
          }
          className="playlist-thumb-img"
        />
        <p className="playlist-title">{name}</p>
      </a>
    </div>
  );
}

export default PlaylistTumbnails;
