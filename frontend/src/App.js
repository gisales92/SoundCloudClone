import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import SignUpModal from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import Playlists from "./components/Playlists";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PlaylistDetail from "./components/PlaylistDetail";
import SongDetail from "./components/SongDetail";
import { NewAudioPlayer } from "./components/NewAudioPanel";
import AllAlbums from "./components/Albums";
import { fetchSongs } from "./store/song";
import AlbumDetail from "./components/Albums/AlbumDetail";
import Footer from "./components/About";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(sessionActions.userSelector);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    async function getSongs() {
      await dispatch(fetchSongs());
    }
    getSongs();
  }, []);

  window.addEventListener("load", e => {
    const audioEls = document.querySelectorAll("audio");
    audioEls.forEach((el) => {
      console.log("hi")
      el.setAttribute("crossorigin", "")
    })
  })

  return (
    isLoaded && (
      <>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
            <Footer />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpModal />
          </Route>
          <Route exact path="/albums">
            <AllAlbums />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumDetail />
          </Route>
          <Route exact path="/my/playlists">
            {user ? <Playlists userId={user.id} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/playlists/:playlistId">
            <PlaylistDetail />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route exact path="/profile">
            {/* {TODO create a profile view} */}
          </Route>
          <Route path="">Sorry, we could not find that resource</Route>
        </Switch>
        <NewAudioPlayer />
      </>
    )
  );
}

export default App;
