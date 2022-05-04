import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(userSelector);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {!user ? (
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      ) : null}
      {!user ? (
        <li>
          <LoginFormModal />
        </li>
      ) : null}
      {user ? (
          <li>
              <ProfileButton />
          </li>
      ) : null}
    </ul>
  );
}

export default Navigation;
