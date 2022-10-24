import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { userSelector } from "../../store/session";
import UserTracks from "./tracks";
import "./profile.css";

const UserProfilePage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(userSelector);

  // fetch favorites once on first render
  useEffect(() => {
    if (!loaded)
      (async () => {
        // await dispatch(fetchFavorites());
        // await dispatch(fetchReservations());
        // await dispatch(fetchUserReviews());
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  // if not logged in redirect to login
  // this should not happen since it is a protected route
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.previewImage ? user.previewImage : "https://upload.wikimedia.org/wikipedia/commons/9/98/OOjs_UI_icon_userAvatar.svg"}
          alt="profile"
          className="user-profile-pic"
          crossOrigin=""
        />
        <div className="profile header-info">
          <h2 className="profile user-name">{user.username}</h2>
          <p className="profile header-sub">{`${user.firstName} ${user.lastName}`}</p>
          { user.city && user.country ? <p className="profile header-sub">{`${user.city}, ${user.country}`}</p> : null}
        </div>
      </div>
      <ul className="profile-navigation">
        <li key="tracks">
          <NavLink
            to="/profile/tracks"
            className="profile-tab"
            isActive={() => ["/profile", "/profile/tracks"].includes(pathname)}
          >
            Tracks
          </NavLink>
        </li>
        <li key="Albums">
          <NavLink to="/profile/Albums" className="profile-tab">
            Albums
          </NavLink>
        </li>
        <li key="playlists">
          <NavLink to="/profile/playlists" className="profile-tab">
            Playlists
          </NavLink>
        </li>
        <li key="reviews">
          <NavLink to="/profile/comments" className="profile-tab">
            Comments
          </NavLink>
        </li>
      </ul>
      <Switch>
      <Route exact path="/profile/albums">
          USER Albums
        </Route>
        <Route exact path="/profile/playlists">
          USER PLAYLISTS
        </Route>

        <Route exact path="/profile/comments">
            USER COMMENTS
          {/* <ProfileReviews loaded={loaded} /> */}
        </Route>

        <Route path="/profile">
          <UserTracks userId={user.id} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserProfilePage;
