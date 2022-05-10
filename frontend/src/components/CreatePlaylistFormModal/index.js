import React, { useState } from "react";
import LoginForm from "../LoginFormModal/LoginForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";

function CreatePlaylistModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to create a playlist");
    return <Redirect to="/" />;
  }

  return (
    <>
      <button
        className="add-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <img
          className="add-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_add-invert.svg/640px-OOjs_UI_icon_add-invert.svg.png"
          alt="Add Playlist"
        />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default CreatePlaylistModal;
