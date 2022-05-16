import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, userSelector } from "../../store/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    }
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div>
        <button onClick={openMenu}  id={showMenu ? "active-menu" : "menu-icon-button"}>
          <img id="menu-icon" src="https://upload.wikimedia.org/wikipedia/commons/8/8d/VisualEditor_-_Icon_-_Menu.svg" alt="menu"/>
        </button>
      </div>

      {showMenu ? (
        <div id="drop-menu">
          <NavLink className="user-nav-link" to="/">My Profile</NavLink>
          <NavLink className="user-nav-link" to="/my/playlists">My Playlists</NavLink>
          <button id="logout-button" onClick={() => dispatch(logout())}>Log out</button>
        </div>
      ) : null}
    </>
  );
}

export default ProfileButton;
