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
    if (user && user === "admin") {
      return (
        <>
          <ToastContainer />
          <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                  Dashboard
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="/#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <Link to="/home" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/months" className="nav-link">
                        Months
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/weeks" className="nav-link">
                        Weeks
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/days" className="nav-link">
                        Days
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
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
