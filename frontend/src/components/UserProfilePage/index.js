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
          src={user.previewImage}
          alt="profile"
          className="user-profile-pic"
        />
        <div className="profile header-info">
          <h2 className="profile user-name">{user.username}</h2>
          <p className="profile header-sub">{`${user.firstName} ${user.lastName}`}</p>
          <p className="profile header-sub">{`${user.city}, ${user.country}`}</p>
        </div>
      </div>
      <ul className="profile-navigation">
        <li key="favorites">
          <NavLink
            to="/profile/tracks"
            className="profile-tab"
            isActive={() => ["/profile", "/profile/tracks"].includes(pathname)}
          >
            Tracks
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
        <Route path="/profile/playlists">
          {/* <ProfileReservations loaded={loaded} /> */}
        </Route>

        <Route path="/profile/comments">
          {/* <ProfileReviews loaded={loaded} /> */}
        </Route>

        <Route path="/profile">
          {/* <ProfileFavorites loaded={loaded} /> */}
        </Route>
      </Switch>
    </div>
  );
};

export default UserProfilePage;
