import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import "./assets/css/main.css";
import "./assets/css/style.css";

import Home from "./Home";
import Events from "./Events";
import Event from "./Event";
import AddEvent from "./AddEvent";
import EditEvent from "./Edit";
import Auth from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/events" component={Events} />
      <PrivateRoute exact path="/add-event" component={AddEvent} />
      <Route path="/event/:id" component={Event} />
      <PrivateRoute path="/edit/:id" component={EditEvent} />
    </AuthProvider>
  );
}

export default App;
