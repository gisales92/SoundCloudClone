import React, { useState } from "react";
import EditCommentForm from "./EditCommentForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";

function EditCommentModal({comment}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to edit a comment");
    return <Redirect to="/" />;
  }

  return (
    <>
      <button type="button"  className="edit-comment-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm props={{setShowModal, comment}}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;