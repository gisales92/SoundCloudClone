import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as playlistActions from "../../store/playlist";

function AddSongToPlaylistForm({ props }) {
  const { setShowModal, song } = props;
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [selectedPlaylist, setSelectedPlaylist] = useState("Hi");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (sessionUser) {
        dispatch(playlistActions.getMyPlaylists());
        setUpdated(true)
    }
  }, [updated, dispatch, sessionUser]);

  const loadedPlaylists = useSelector(
    (state) => state.playlists?.userPlaylists
  );

  if (!sessionUser) {
    window.alert("You must be logged in to add to your playlists");
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      playlistActions.addSong({
        songId: song.id,
        playlistId: selectedPlaylist
      })
    )
      .then(() => {
        setShowModal(false);
        history.push(`/playlists/${selectedPlaylist}`);
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


  return loadedPlaylists && (
    <div className="playlist-add-song-form-container">
      <h2 className="playlist-add-song-header">Add <span className="song-title-preview">{`${song.title}`}</span> to a playlist:</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset id="playlist-add-song-fieldset">
          <div className="playlist-input" id="select-playlist-input">
            <label className="playlist-label" htmlFor="playlist-add-song-name">Select playlist:</label>
            <select className="playlist-add-song-name" value={selectedPlaylist} required onChange={e => {
                e.preventDefault();
                setSelectedPlaylist(e.target.value)}}>
                  <option value={""}>-- Select one --</option>
                {Object.values(loadedPlaylists)?.map((playlistObj) => {
                    return (<option className="playlist-options" key={playlistObj.id} value={playlistObj.id}>{playlistObj.name}</option>)
                })}
            </select>
          </div>
        </fieldset>
        <button type="submit" className="playlist-add-song-submit">
          {"Add track to playlist"}
        </button>
      </form>
    </div>
  );
}

export default AddSongToPlaylistForm;
