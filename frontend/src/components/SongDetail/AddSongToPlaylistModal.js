import React, { useState } from "react";
import AddSongToPlaylistForm from "./AddSongToPlaylistForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";

function AddSongToPlaylistModal({song}) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (!sessionUser) {
    window.alert("Please log in to add this song to one of your playlists");
    return <Redirect to={`/songs/${song.id}`} />;
  }

  return (
    <>
      <button type="button"  className="song-detail-button"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}>Add Song To Playlist <FontAwesomeIcon icon={faPlus} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSongToPlaylistForm props={{setShowModal, song}}/>
        </Modal>
      )}
    </>
  );
}

export default AddSongToPlaylistModal;