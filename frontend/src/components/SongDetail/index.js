import { useParams, useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCommentModal from "./AddComment";
import * as songActions from "../../store/song";
import DeleteComment from "./DeleteComment";
import EditCommentModal from "./EditComment";
import AddSongToPlaylistModal from "./AddSongToPlaylistModal";
import { SongListContext } from "../../context/SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import "./SongDetail.css";

export default function SongDetail() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songDetails = useSelector((state) => state.songs?.detail);
  const currentUserId = useSelector((state) => state.session?.user?.id);
  const [songList, setSongList] = useContext(SongListContext);

  useEffect(() => {
    async function getSongs() {
      await dispatch(songActions.getSongDetail(songId)).catch(async (res) => {
        window.alert("No Song with the specified Id");
        history.push("/");
      });
    }
    getSongs();
  }, [dispatch, history, songId]);

  const added = () => {
    for (let i = 0; i < songList.length; i++) {
      if (songList[i].id === songDetails.id) return true;
    }
    return false;
  };

  // Add song to audio queue
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addTrack = {
      name: songDetails.title,
      musicSrc: songDetails.url,
      cover: `/api/songs/${songDetails.id}/cover`,
      id: songDetails.id,
    };

    setSongList([...songList, addTrack]);
  };

  return (
    <div className="song-detail">
      <div className="song-detail-header">
        <div className="song-detail left">
          <div className="song-title-container">
            <span className="song-detail-title">{songDetails?.title}</span>
          </div>
          <h3 className="song-detail-sub-title">
            {songDetails?.Artist.username}
          </h3>
        </div>
        <img
          src={
            songDetails?.previewImage
              ? songDetails.previewImage
              : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
          }
          className="song-detail-thumb-img"
          alt="Playlist thumbnail"
          crossOrigin=""
        />
      </div>
      <div className="song-detail-actions">
        {added() ? (
          <button
            type="button"
            className="song-detail-button"
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
            className="song-detail-button"
          >
            <FontAwesomeIcon icon={faList} /> Add to Next up{" "}
          </button>
        )}
        {currentUserId ? <AddCommentModal songId={songDetails?.id} /> : null}
        {currentUserId ? <AddSongToPlaylistModal song={songDetails} /> : null}
      </div>
      <h4 className="song-header">Comments</h4>
      <div className="song-comments">
        <ul className="song-comments-list">
          {songDetails?.Comments.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="song-comment">
                  {`${comment.body} -- ${comment.User.username}`}
                  {currentUserId === comment.userId ? (
                    <div className="comment-actions">
                      <EditCommentModal comment={comment} />
                      <DeleteComment comment={comment} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
