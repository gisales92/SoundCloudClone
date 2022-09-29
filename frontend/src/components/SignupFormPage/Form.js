import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword("");
    setConfirmPassword("");
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email: email.toLowerCase(),
          username,
          password,
          firstName,
          lastName,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          const newErrors = ["Please correct the following error(s):", ...Object.values(data.errors)]
          setErrors(newErrors);
        }
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div id="sign-up-form-container">
      <h2 className="sign-up-header">Sign up form</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <fieldset id="signup-fieldset">
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              value={firstName}
              name="firstName"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
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
          <div className="form-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <button className="form-button single" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
