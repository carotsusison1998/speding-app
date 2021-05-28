import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./css/App.css";
import Days from "./components/Days";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }
  render() {
    const user = localStorage.getItem("user");
    const rule = localStorage.getItem("rule");
    if (user && rule === "admin") {
      return (
        <>
          <ToastContainer />
          <Router>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                  Dashboard
                </Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <Link to="/home" className="nav-link">
                        Home
                      </Link>
                      <Link to="/months" className="nav-link">
                        Months
                      </Link>
                      <Link to="/weeks" className="nav-link">
                        Weeks
                      </Link>
                      <Link to="/days" className="nav-link">
                        Days
                      </Link>
                </div>
              </div>
            </nav>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/days">
                <Days />
              </Route>
            </Switch>
          </Router>
        </>
      );
    } else {
      return (
        <div>
          <Login />
        </div>
      );
    }
  }
}
