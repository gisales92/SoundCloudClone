import React, { useState } from "react";
import AddCommentForm from "../AddCommentForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";
import "../AddCommentForm/AddCommentForm.css"

function AddCommentModal({songId}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to add a comment");
    return <Redirect to={`/songs/${songId}`} />;
  }

  return (
    <>
      <button type="button"  className="add-comment-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}>Add Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddCommentForm props={{setShowModal, songId}}/>
        </Modal>
      )}
    </>
  );
}

export default AddCommentModal;