import React, { useState } from 'react';
import LoginForm from "./LoginForm";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userSelector } from '../../store/session';
import { Modal } from "../../context/Modal";

function LoginFormModal () {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(userSelector);

  if (sessionUser) return <Redirect to="/" />;


  return (
    <>
      <button id='login-button' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;