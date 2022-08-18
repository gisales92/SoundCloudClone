import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import Playlists from "./components/Playlists";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PlaylistDetail from "./components/PlaylistDetail";
import AudioPanel from "./components/AudioPanel";
import SongDetail from "./components/SongDetail";
import { SongContext } from "./context/Song";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(sessionActions.userSelector)
  const tracks = useContext(SongContext);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/my/playlists">
            {user ? <Playlists userId={user.id}/> : <Redirect to="/" />}
          </Route>
          <Route exact path="/playlists/:playlistId">
            <PlaylistDetail />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route path="">
            Sorry, we could not find that resource
          </Route>
        </Switch>
        <AudioPanel tracks={tracks}/>
      </>
    )
  );
}

export default App;
