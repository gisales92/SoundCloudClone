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
import { fetchFavorites } from "../../store/favorites";
import { fetchReservations } from "../../store/reservations";
import { fetchUserReviews } from "../../store/reviews";
import ProfileFavorites from "./ProfileFavorites";
import ProfileReservations from "./ProfileReservations";
import ProfileReviews from "./ProfileReviews";

const UserProfilePage = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(userSelector);

  // fetch favorites once on first render
  useEffect(() => {
    if (!loaded)
      (async () => {
        await dispatch(fetchFavorites());
        await dispatch(fetchReservations());
        await dispatch(fetchUserReviews());
        setLoaded(true);
      })();
  }, [dispatch, loaded]);

  // if not logged in redirect to login
  // this should not happen since it is a protected route
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{user.first_name + " " + user.last_name}</h1>
      </div>
      <ul className="profile-navigation">
        <li key="favorites">
          <NavLink
            to="/profile/favorites"
            className="main-color-hover"
            isActive={() =>
              ["/profile", "/profile/favorites"].includes(pathname)
            }
          >
            Favorites
          </NavLink>
        </li>
        <li key="reservations">
          <NavLink to="/profile/reservations" className="main-color-hover">Reservations</NavLink>
        </li>
        <li key="reviews">
          <NavLink to="/profile/reviews" className="main-color-hover">Reviews</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/profile/reservations">
          <ProfileReservations loaded={loaded} />
        </Route>

        <Route path="/profile/reviews">
          <ProfileReviews loaded={loaded} />
        </Route>

        <Route path="/profile">
          <ProfileFavorites loaded={loaded} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserProfilePage;
