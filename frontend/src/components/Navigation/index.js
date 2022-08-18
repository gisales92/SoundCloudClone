import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";

function Navigation() {
  const user = useSelector(userSelector);

  return (
    <header>
      <div id="header-content">
        <div id="logo">
          <NavLink exact to="/">
            <h1 className="site-header">
              Press <FontAwesomeIcon icon={faPlay} /> Play
            </h1>
          </NavLink>
        </div>
        <div className="header-spacer"></div>
        <nav className="nav-header-outer">
          <ul>
            {!user ? (
              <li className="nav-button-outer">
                <NavLink className="user-nav" to="/signup">
                  Sign Up <FontAwesomeIcon icon={faUserPlus} />
                </NavLink>
              </li>
            ) : null}
            {!user ? (
              <li className="nav-button-outer">
                <LoginFormModal className="user-nav" />
              </li>
            ) : null}
            {user ? (
              <li className="nav-button-outer">
                <ProfileButton id="burger-menu" />
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
