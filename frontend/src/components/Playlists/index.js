import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";

function Playlists ({userId}) {
let mine = false;
const currentUser = useSelector(userSelector);
if (currentUser.id === userId) mine = true;

    return (
        <div id="playlist-preview">
            {mine ? <h2 id="playlist-header">Your Playlists</h2> : <h2 id="playlist-header">{`${user}`}</h2>}
        </div>
    )
}