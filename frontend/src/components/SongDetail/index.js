import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCommentModal from "./AddComment";
import * as songActions from "../../store/song";
import DeleteComment from "./DeleteComment";
import EditCommentModal from "./EditComment";
import "./SongDetail.css";

export default function SongDetail() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songDetails = useSelector((state) => state.songs?.detail);
  const currentUserId = useSelector(state => state.session?.user.id)

  useEffect(() => {
    async function getSongs() {
      await dispatch(songActions.getSongDetail(songId)).catch(async (res) => {
        window.alert("No Song with the specified Id");
        history.push("/");
      });
    }
    getSongs();
  }, [dispatch, history, songId]);

  return (
    <div className="song-detail">
      <div className="song-detail-header">
        <h2 className="song-detail-title">{songDetails?.title}</h2>
        <img
          src={
            songDetails?.previewImage
              ? songDetails.previewImage
              : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg"
          }
          className="song-detail-thumb-img"
          alt="Playlist thumbnail"
        />
        <h3 className="song-detail-sub-title">
          {songDetails?.Artist.username}
        </h3>
      </div>
      <div className="song-actions">
        <AddCommentModal songId={songDetails?.id} />
      </div>
      <h4 className="song-header">Comments</h4>
      <div className="song-comments">
        <ul className="song-comments-list">
          {songDetails?.Comments.map((comment) => {
            return (
              <div key={comment.id}>
                <div className="song-comment">{`${comment.body} -- ${comment.User.username}`}
                {currentUserId === comment.userId ? <div className="comment-actions">
                    <EditCommentModal comment={comment}/>
                    <DeleteComment comment={comment} />
                </div> : null}
                </div>

              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
