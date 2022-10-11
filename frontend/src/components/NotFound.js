import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();
  const redirectToHome = () => history.push("/");

  return (
    <div className="page-not-found-container fill-screen">
      <div className="page-not-found card-background">
        <h2>Whatchu Want?</h2>
        <img src="https://static.wikia.nocookie.net/borderlands/images/3/3e/Crazy.Earl.png" alt="crazy earl" crossOrigin="" className="earl"/>
        <p>Whatever it is, it's not here...</p>
        <button className="home-button" onClick={redirectToHome}>
          Get Lost!
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;