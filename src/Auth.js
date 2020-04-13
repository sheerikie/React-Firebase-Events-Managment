import React, { Component, useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebase from "./Firebase";
import Footer from "./assets/layouts/Footer";
import Header from "./assets/layouts/Header";
import "./assets/css/auth.css";
import "./assets/js/auth-asset.js";
import Login from "./Login";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="Auth">
      <Header />
      <div id="logreg-forms">
        <Login />
        <form action="/reset/password/" class="form-reset">
          <input
            type="email"
            id="resetEmail"
            class="form-control"
            placeholder="Email address"
            required=""
            autofocus=""
          />
          <button class="btn btn-primary btn-block" type="submit">
            Reset Password
          </button>
          <a href="#" id="cancel_reset">
            <i class="fas fa-angle-left"></i> Back
          </a>
        </form>

        <form onSubmit={handleSignUp} class="form-signup">
          <div class="social-login">
            <button class="btn facebook-btn social-btn" type="button">
              <span>
                <i class="fab fa-facebook-f"></i> Sign up with Facebook
              </span>{" "}
            </button>
          </div>
          <div class="social-login">
            <button class="btn google-btn social-btn" type="button">
              <span>
                <i class="fab fa-google-plus-g"></i> Sign up with Google+
              </span>{" "}
            </button>
          </div>

          <p style={{ textAlign: "center" }}>OR</p>

          <input
            type="text"
            id="user-name"
            class="form-control"
            placeholder="Full name"
            name="name"
            required=""
            autofocus=""
          />
          <input
            type="email"
            name="email"
            id="user-email"
            class="form-control"
            placeholder="Email address"
            required
            autofocus=""
          />
          <input
            type="password"
            id="user-pass"
            class="form-control"
            placeholder="Password"
            name="password"
            required
            autofocus=""
          />

          <button class="btn btn-primary btn-block" type="submit">
            <i class="fas fa-user-plus"></i> Sign Up
          </button>
          <a href="#" id="cancel_signup">
            <i class="fas fa-angle-left"></i> Back
          </a>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default withRouter(SignUp);
