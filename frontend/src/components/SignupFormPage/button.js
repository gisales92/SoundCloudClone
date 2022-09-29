import React, { useState } from 'react';
import SignupFormPage from './Form';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userSelector } from '../../store/session';
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function SignUpButton () {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (sessionUser) return <Redirect to="/" />;


  return (
    <>
      <button id='login-button' onClick={() => setShowModal(true)}>Sign Up <FontAwesomeIcon icon={faUserPlus} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpButton;