import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as commentActions from "../../store/comment";
import { getSongDetail } from "../../store/song";

function EditPlaylistForm({ props }) {
  const { setShowModal, comment } = props;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [commentBody, setCommentBody] = useState(comment.body);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (!sessionUser) {
    window.alert("You must be logged in to edit your playlists");
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      commentActions.editComment({
        id: comment.id,
        body: commentBody,
      })
    )
      .then(async () => {
        await dispatch(getSongDetail(comment.songId))
        setShowModal(false);
        history.push(`/songs/${comment.songId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          const newErrors = [
            "Please correct the following error(s):",
            ...Object.values(data.errors),
          ];
          setErrors(newErrors);
        }
      });
  };

  return (
    <div className="comment-form-container">
      <h2 className="comment-header">Edit your comment</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset id="comment-fieldset">
          <div className="form-input">
            <label htmlFor="comment-name">Comment:</label>
            <textarea
              value={commentBody}
              name="comment-name"
              placeholder="My New Comment"
              onChange={(e) => setCommentBody(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <button type="submit" className="comment-submit">
          Update Comment
        </button>
      </form>
    </div>
  );
}

export default EditPlaylistForm;
