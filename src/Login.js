import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "./Firebase";
import { AuthContext } from "./AuthContext";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleLogin} class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
          {" "}
          Sign in
        </h1>
        <div class="social-login">
          <button class="btn facebook-btn social-btn" type="button">
            <span>
              <i class="fab fa-facebook-f"></i> Sign in with Facebook
            </span>{" "}
          </button>
          <button class="btn google-btn social-btn" type="button">
            <span>
              <i class="fab fa-google-plus-g"></i> Sign in with Google+
            </span>{" "}
          </button>
        </div>
        <p style={{ textAlign: "center" }}> OR </p>
        <input
          type="email"
          id="inputEmail"
          name="email"
          class="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <input
          type="password"
          id="inputPassword"
          name="password"
          class="form-control"
          placeholder="Password"
          required=""
        />
        <button class="btn btn-success btn-block" type="submit">
          <i class="fas fa-sign-in-alt"></i> Sign in{" "}
        </button>
        <a href="#" id="forgot_pswd">
          Forgot password?
        </a>
        <hr />
        <p>Don't have an account!</p>
        <button class="btn btn-primary btn-block" type="button" id="btn-signup">
          <i class="fas fa-user-plus"></i> Sign up New Account
        </button>
      </form>
    </div>
  );
};

export default withRouter(Login);
