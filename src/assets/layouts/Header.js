import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";

function Header() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="Header">
      <header className="header_area">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container box_1620">
              <a className="navbar-brand logo_h" href="index.html">
                <img
                  src="img/logo3.png"
                  style={{
                    width: "30%",
                    marginLeft: "5%",
                    background: "transparent",
                    border: "none"
                  }}
                  alt=""
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div
                className="collapse navbar-collapse offset"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav menu_nav justify-content-left">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/events" className="nav-link">
                      Events
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-event" className="nav-link">
                      Add Event
                    </Link>
                  </li>
                </ul>
                {currentUser ? (
                  <ul
                    className="nav navbar-nav navbar-right navbar-social"
                    style={{ float: "right", marginRight: "20px" }}
                  >
                    <li>
                      <div
                        className="dropdown"
                        style={{ width: "600px", marginRight: "2%" }}
                      >
                        <button class="btn btn-warning disabled">
                          Hi {currentUser.email.replace(/^(.+)@(.+)$/g, "$1")}
                          <i class="ti-hand-open" style={{ color: "red" }}></i>
                        </button>

                        <a
                          class="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          My Account
                          <span class="caret"></span>
                        </a>

                        <ul
                          class="dropdown-menu  dropdown-menu-center"
                          style={{
                            right: " auto",
                            left: "50%",
                            textAlign: "center"
                          }}
                        >
                          <li
                            onClick={() => firebase.auth().signOut()}
                            style={{ color: "orange", fontWeight: "bolder" }}
                          >
                            {" "}
                            <button
                              className="btn btn-default btn-lg"
                              style={{ textDecoration: "false" }}
                              onClick={() => firebase.auth().signOut()}
                            >
                              <i
                                class="fas fa-sign-out-alt"
                                style={{ fontSize: "80%" }}
                              ></i>
                              <span
                                style={{
                                  marginLeft: "10px",
                                  fontWeight: "bolder",
                                  fontSize: "80%"
                                }}
                              >
                                Sign out{" "}
                              </span>
                            </button>
                          </li>
                          <hr />
                          <li style={{ color: "orange", fontWeight: "bolder" }}>
                            {" "}
                            <i class="fas fa-user"></i> My Account
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <b>
                    <a href="/auth">Sign Up/In</a>
                  </b>
                )}
                <ul className="nav navbar-nav navbar-right navbar-social">
                  <li style={{ color: "orange" }}>
                    <a href="#">
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li style={{ color: "orange" }}>
                    <a href="#">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li style={{ color: "orange" }}>
                    <a href="#">
                      <i className="ti-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ti-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
