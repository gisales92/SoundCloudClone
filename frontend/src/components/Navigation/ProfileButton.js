import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, userSelector } from "../../store/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(userSelector);

  const openMenu = () => {
    if (!showMenu) setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => setShowMenu(false);
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div>
        <button onClick={openMenu}>
          <i className="fa-solid fa-user fa-xl" />
        </button>
      </div>

      {showMenu ? (
        <div>
          <button onClick={() => dispatch(logout())}>Log out</button>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ) : null}
    </>
  );
}

export default ProfileButton;
