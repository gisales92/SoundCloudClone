import React, { useState } from "react";
import AddCommentForm from "../AddCommentForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage} from "@fortawesome/free-solid-svg-icons";
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
      <button type="button"  className="song-detail-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}><FontAwesomeIcon icon={faMessage} /> Add Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddCommentForm props={{setShowModal, songId}}/>
        </Modal>
      )}
    </>
  );
}

export default AddCommentModal;