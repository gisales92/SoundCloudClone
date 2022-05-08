import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import "./PlaylistPreview.css"

function Playlists ({userId}) {
let mine = false;
const currentUser = useSelector(userSelector);
if (currentUser.id === userId) mine = true;
    return (
        <div id="playlist-preview">
            <h2 id="playlist-header">Playlists</h2>
            <div className="playlist-content">
                {mine ?
                    <div className="create-playlist-container">
                        <button className="add-button" onClick={(e) => {
                            e.preventDefault();
                            //TODO add functionality to bring up create playlist page
                        }}>
                            <img className="add-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_add-invert.svg/640px-OOjs_UI_icon_add-invert.svg.png" alt="Add Playlist" />
                        </button>
                        <p>Create new playlist</p>
                    </div>:
                    null
                }
            </div>
        </div>
    )
}

export default Playlists;