import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as commentActions from "../../store/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";

export default function DeleteComment({ comment }) {
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = (e) => {
    return dispatch(
        commentActions.deleteComment(comment.id)
    )
      .then(() => {
        window.alert("Comment has been successfully deleted");
        history.push(`/songs/${comment.songId}`);
      })
      .catch(async (res) => {
        window.alert("There's been an error");
        }
      );
  };


  return (
    <button type="button" className="song-detail-button" onClick={handleClick}>
      Delete <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
