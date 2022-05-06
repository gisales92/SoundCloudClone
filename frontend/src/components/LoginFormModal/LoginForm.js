import { useDispatch } from "react-redux";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ email: email.toLowerCase(), password })).catch(
      async (res) => {
        setPassword("");
        const data = await res.json();
        if (data && data.message) {
          const newErrors = ["Please correct the following error(s):"];
          if (data.errors) {
            newErrors.push(...Object.values(data.errors));
          } else {
            newErrors.push(Object.values(data.message));
          }
          setErrors(newErrors);
        }
      }
    );

  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Log in!</legend>
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <button className="login-modal-button" id="login-form-submit" type="submit" name="login">
        Log In
      </button>
      <button id="demo-user" className="login-modal-button" name="demo-user" onClick={() => {
        dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
      }}>Proceed as Guest</button>
    </form>
  );
}

export default LoginForm;
