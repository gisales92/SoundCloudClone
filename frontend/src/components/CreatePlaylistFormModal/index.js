import React, { useState } from "react";
import CreatePlaylistForm from "./CreatePlaylistForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon className="add-icon" icon={faPlus} />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlaylistForm closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreatePlaylistModal;
