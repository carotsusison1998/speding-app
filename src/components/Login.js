import React, { Component } from "react";
const axios = require('axios');


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  isChangeText = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    })
  }
  handleSubmit = (e) => {
    // var url = "https://reqres.in/api/users";
    axios.post('https://app-spending.herokuapp.com/users/login', this.state)
    .then(function (response) {
      if(response.status === 200){
        localStorage.setItem('_id', response.data.result._id);
        localStorage.setItem('email', response.data.result.email);
        localStorage.setItem('user', response.data.result.name);
        localStorage.setItem('rule', response.data.result.rule);
        window.location.reload();
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log("error.response", error.response);
      } else if (error.request) {
        console.log("error.request", error.request);
      } else {
      }
    });
  }
  render() {
    return (
      <div className="login">
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                  <img
                    src="../images/img-logo.png"
                    className="brand_logo"
                    alt="Logo"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center form_container">
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="form-control input_user"
                      placeholder="username"
                      onChange={this.isChangeText}
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="form-control input_pass"
                      placeholder="password"
                      onChange={this.isChangeText}
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlInline"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlInline"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="button"
                      name="button"
                      className="btn login_btn"
                      onClick={this.handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account?{" "}
                  <a href="/#" className="ml-2">
                    Sign Up
                  </a>
                </div>
                <div className="d-flex justify-content-center links">
                  <a href="/#">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
