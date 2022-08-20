import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay} from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css"

function HomePage () {
    return (
        <div className="home">
            <h2 id="home-header">Welcome to Press <FontAwesomeIcon icon={faPlay} /> Play!</h2>
        </div>
    )
}

export default HomePage;