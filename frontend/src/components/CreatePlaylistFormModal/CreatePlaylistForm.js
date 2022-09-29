import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import * as playlistActions from "../../store/playlist";
import "./CreatePlaylistForm.css";

function CreatePlaylistForm({ closeModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [playlistName, setPlaylistName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  });
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
      onDrop,
    }, [useDropzone, setImage]);

  if (!sessionUser) {
    window.alert("You must be logged in to view your playlists");
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      playlistActions.createPlaylist({
        name: playlistName,
        image,
      })
    )
      .then(() => {
        closeModal(false);
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
    <div id="new-playlist-form-container">
      <h2 className="new-playlist-header">Create a new playlist</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul className="playlist-errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset id="new-playlist-fieldset">
          <div className="form-input">
            <label htmlFor="playlist-name">Playlist Title*</label>
            <input
              type="text"
              value={playlistName}
              name="playlist-name"
              placeholder="My New Playlist"
              onChange={(e) => setPlaylistName(e.target.value)}
              required
            />
          </div>
          <div className="drop-input">
            <p className="upload-cover-text">
              Upload a cover image for your playlist:
            </p>
            <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  Drag 'n' drop an image file here, or click to select files
                </p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
              {acceptedFiles.length ? (
                <p className="file-upload-feedback">{`File ${image?.name} has been successfully added`}</p>
              ) : null}
              {fileRejections.length ? (
                <p className="file-upload-feedback">{`File ${fileRejections[0]?.file?.name} has been rejected - ${fileRejections[0]?.errors[0]?.message}`}</p>
              ) : null}
            </section>
          </div>
        </fieldset>
        <button id="new-playlist-form-submit" type="submit">
          Create Playlist
        </button>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;
