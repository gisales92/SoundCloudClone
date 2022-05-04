import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(userSelector);

  return (
    <header>
      <div id="logo">
      <NavLink  exact to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Play-rounded-button-outline.svg" alt="logo" />
      </NavLink>
      <NavLink  exact to="/">
          <h1>Press/Play</h1>
      </NavLink>
      </div>
      <div className="header-spacer"></div>
      <nav>
        <ul>
          <li>
            <NavLink id="home" exact to="/">
              Home
            </NavLink>
          </li>
          {!user ? (
            <li>
              <NavLink className="no-user-nav" to="/signup">
              Sign Up
              </NavLink>
            </li>
          ) : null}
          {!user ? (
            <li>
              <LoginFormModal className="no-user-nav" />
            </li>
          ) : null}
          {user ? (
            <li>
              <ProfileButton id="user-nav" />
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
