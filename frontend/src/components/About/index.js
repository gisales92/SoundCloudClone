import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faCodeBranch,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./footer.css"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-header">
          <p className="to-top-button" onClick={scrollToTop}>
            Return to Top <FontAwesomeIcon icon={faArrowTurnUp} />
          </p>
        </div>

        <ul className="footer-list">
          <li>
            <h1>About</h1>
            <div className="footer-links">
              <a
                href="https://github.com/gisales92/SoundCloudClone"
                target="_blank"
              >
                Source code
                <FontAwesomeIcon icon={faCodeBranch} />
              </a>
              <a
                href="https://github.com/gisales92/SoundCloudClone/wiki"
                target="_blank"
              >
                Project documentation
                <FontAwesomeIcon icon={faBook} />
              </a>
            </div>
          </li>

          <li>
            <h1>Greg Isales</h1>
            <div className="footer-links">
              <a href="https://github.com/gisales92" target="_blank">
                Github
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/greg-isales33/"
                target="_blank"
              >
                LinkedIn
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;