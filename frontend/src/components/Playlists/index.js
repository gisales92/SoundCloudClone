import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import CreatePlaylistModal from "../CreatePlaylistFormModal";
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
                        <CreatePlaylistModal />
                        <p>Create new playlist</p>
                    </div>:
                    null
                }
            </div>
        </div>
    )
}

export default Playlists;