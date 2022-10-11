import React, { useState } from "react";
import EditPlaylistForm from "../PlaylistEditForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen} from "@fortawesome/free-solid-svg-icons";

function EditPlaylistModal({playlistId}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to edit a playlist");
    return <Redirect to="/" />;
  }

  return (
    <>
      <button type="button"  className="edit-playlist-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}><FontAwesomeIcon icon={faPen} /> Edit Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylistForm props={{setShowModal, playlistId}}/>
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistModal;