import { useSelector } from "react-redux";
import PlaylistTumbnails from "./playlistThumbnails";

export default function PlaylistGrid() {
  const loadedPlaylists = useSelector(
    (state) => state.playlists?.userPlaylists
  );
  return (
    <ul className="playlist-grid">
      { loadedPlaylists && Object.keys(loadedPlaylists).length ? (Object.keys(loadedPlaylists).map((playlistId) => {
        return (
          <PlaylistTumbnails
            key={playlistId}
            playlist={loadedPlaylists[playlistId]}
          />
        );
      })) : null}
    </ul>
  );
}
