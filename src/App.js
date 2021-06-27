import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./css/App.css";
import Days from "./components/Days";
import Chart from "./components/Chart";
import EditSpending from "./components/EditSpending";

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">
                  Dashboards
                </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/home" className="nav-link">
                        Home
                      </Link>
                      <Link to="/chart" className="nav-link">
                        Chart
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
              <Route exact path="/chart">
                <Chart />
              </Route>
              {/* <Route path="/days/edit-spending/:id" children={<EditSpending />} /> */}
              <Route path="/days/edit-spending/:id" render={props => <EditSpending  {...this.props} {...props}/>}/>
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
