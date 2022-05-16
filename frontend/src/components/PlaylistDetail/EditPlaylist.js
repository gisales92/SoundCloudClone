import React, { useState } from "react";
import EditPlaylistForm from "../PlaylistEditForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";

function EditPlaylistModal({playlistId}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to create a playlist");
    return <Redirect to="/" />;
  }

  return (
    <>
      <button type="button"  className="edit-playlist-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylistForm props={{setShowModal, playlistId}}/>
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistModal;