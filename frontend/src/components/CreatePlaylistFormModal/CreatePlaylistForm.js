import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PlaylistImageDrop from "./PlaylistImageDrop";
import * as playlistActions from "../../store/playlist";

function CreatePlaylistForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [playlistName, setPlaylistName] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    // return dispatch(
    //   sessionActions.signup({
    //     email: email.toLowerCase(),
    //     username,
    //     password,
    //     firstName,
    //     lastName,
    //   })
    // ).catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) {
    //     const newErrors = [
    //       "Please correct the following error(s):",
    //       ...Object.values(data.errors),
    //     ];
    //     setErrors(newErrors);
    //   }
    // });
  };

  return (
    <div id="new-playlist-form-container">
      <h2 className="new-playlist-header">Create a new playlist</h2>
      <form onSubmit={handleSubmit}>
        <ul className="playlist-errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset id="new-playlist-fieldset">
          <div className="form-input">
            <label htmlFor="playlist-name">Playlist Title</label>
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
              <p className="upload-cover-text">Upload a cover image for your playlist:</p>
          <PlaylistImageDrop />
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
