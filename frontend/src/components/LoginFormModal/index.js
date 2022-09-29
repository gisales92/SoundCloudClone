import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { userSelector } from "../../store/session";
import { Modal } from "../../context/Modal";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(true);
  const sessionUser = useSelector(userSelector);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            history.push("/");
          }}
        >
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
