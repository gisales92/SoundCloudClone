import { useParams, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as playlistActions from "../../store/playlist";
import { userSelector } from "../../store/session";
import EditPlaylistModal from "./EditPlaylist";
import DeletePlaylist from "./DeletePlaylist";
import SongListThumb from "../SongListThumb";
import { SongListContext } from "../../context/SongList";
import "./PlaylistDetail.css";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const history = useHistory();
  let mine = false;
  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();
  const playlistDetails = useSelector((state) => state.playlists?.detail);
  const [songList, setSongList] = useContext(SongListContext);

  // Redirect bad playlist requests to homepage
  useEffect(() => {
    async function getPlaylists() {
      await dispatch(playlistActions.getPlaylistDetail(playlistId)).catch(
        async (res) => {
          window.alert("No Playlist with the specified Id");
          history.push("/");
        }
      );
    }
    getPlaylists();
  }, [playlistId, dispatch, history]);

  // Check to see if this is the current user's playlist to enable edit/delete
  if (currentUser && currentUser?.id === playlistDetails?.userId) {
    mine = true;
  }

  // Handle adding all songs of a playlist into the audio queue
  const addAll = () => {
    const playlistSongs = {};
    playlistDetails.Songs?.forEach((song) => {
      playlistSongs[song.id] = song;
    });
    const newSongList = [];
    // Keep all songs that aren't in the playlist in the queue
    for (let i = 0; i < songList.length; i++) {
      const song = songList[i];
      if (!playlistSongs[song.id]) {
        newSongList.push({
          name: song.name,
          musicSrc: song.musicSrc,
          cover: `/api/songs/${song.id}/cover`,
          id: song.id,
        });
      }
    }
    // Add playlist songs to the end of the queue
    playlistDetails.Songs?.forEach((song) => {
      newSongList.push({
        name: song.title,
        musicSrc: song.url,
        cover: `/api/songs/${song.id}/cover`,
        id: song.id,
      });
    });
    setSongList(newSongList);
  };

  return (
    playlistDetails && (
      <div className="playlist-detail-container">
        <div className="playlist-detail-header">
          <h2 className="playlist-detail-title">{playlistDetails?.name}</h2>
          <img
            src={
              playlistDetails?.previewImage
                ? playlistDetails.previewImage
                : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
            }
            className="playlist-detail-thumb-img"
            alt="Playlist thumbnail"
            crossOrigin=""
          />
          <h3 className="playlist-detail-sub-title">
            {playlistDetails?.artist}
          </h3>
        </div>
        <div className="playlist-actions">
          {mine ? (
            <>
              <EditPlaylistModal playlistId={playlistDetails?.id} />
              <DeletePlaylist playlistId={playlistDetails?.id} />
            </>
          ) : null}
        </div>
        <h4 className="song-header">Songs</h4>
        <div className="playlist-songs">
          <ul className="playlist-songs-list">
            {playlistDetails?.Songs?.map((song) => {
              return <SongListThumb key={song.id} song={song} />;
            })}
          </ul>
        </div>
      </div>
    )
  );
}

export default PlaylistDetail;
