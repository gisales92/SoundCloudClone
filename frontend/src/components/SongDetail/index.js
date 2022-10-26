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
import { faCheck, faList, faUser, faComments } from "@fortawesome/free-solid-svg-icons";
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

  // function that returns the proper timestamp string for comments
  const commentTimestamps = (timestamp) => {
    const now = new Date();
    //elapsed time in millisecs
    const elapsed = now - new Date(timestamp);
    const secs = elapsed / 1000;
    const minutes = secs / 60;
    if (minutes < 60) {
      if (Math.floor(minutes) === 1) return "1 minute";
      return `${Math.floor(minutes)} minutes`;
    }
    const hours = minutes / 60;
    if (hours < 24) {
      if (Math.floor(hours) === 1) return "1 hour";
      return `${Math.floor(hours)} hours`;
    }
    const splitTime = timestamp.split(/-|T/);
    const years = now.getFullYear() - parseInt(splitTime[0]);
    const months = now.getMonth() + 1 - parseInt(splitTime[1]);
    const days = now.getDate() - parseInt(splitTime[2]);
    if (!years && !months) {
      if (days === 1) return "1 day";
      return `${days} days`;
    } else if (!years) {
      if (months === 1) return "1 month";
      return `${months} months`;
    } else {
      if (years === 1) return "1 year";
      return `${years} years`;
    }
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
            {songDetails?.Artist?.username}
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
      <h4 className="song-comments-header"><FontAwesomeIcon icon={faComments} /> Comments</h4>
      <div className="song-comments">
        <ul className="song-comments-list">
          {songDetails?.Comments?.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="song-comment">
                  <div className="comment-left">
                    {comment.User.previewImage ? (
                      <img
                        className="comment-user-photo"
                        src={`${comment.User.previewImage}`}
                        alt="profile-thumbnail"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}

                    <div className="comment-center">
                      <p className="comment-user">{`${comment.User.username}`}</p>
                      <p className="comment-text">{`${comment.body}`}</p>
                    </div>
                  </div>
                  <div className="comment-right">
                    <p className="comment-timestamp">{`${commentTimestamps(
                      comment.updatedAt
                    )} ago`}</p>
                    {currentUserId === comment.userId ? (
                      <div className="comment-actions">
                        <EditCommentModal comment={comment} />
                        <DeleteComment comment={comment} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
