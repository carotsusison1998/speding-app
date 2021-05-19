import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios");


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      name: "",
      price: "",
      description: "",
      data: [],
    };
  }
  isChangeText = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (Number(this.state.date) === 0) {
      return;
    }
    const param = {
      id_user: 1,
      id_day: Number(this.state.date),
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
    };
    axios
      .post("http://localhost:4000/api/spending", param)
      .then(function (response) {
        if (response.status === 200) {
          if (response.data.success) {
            toast(response.data.message);
            document.getElementById("spending-form").reset();
          }
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/spending")
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  renderDate = () => {
    if (this.state.data.length > 0) {
      const listItems = this.state.data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.date}
        </option>
      ));
      return <>{listItems}</>;
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h4 className="text-center mt-5">NHẬP CHI TIÊU</h4>
            <form id="spending-form">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Ngày chi tiêu</label>
                <select
                  className="form-control"
                  placeholder="Nhập ngày"
                  name="date"
                  onChange={this.isChangeText}
                >
                  <option>vui lòng chọn</option>
                  {this.renderDate()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tên chi tiêu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên chi tiêu"
                  name="name"
                  onChange={this.isChangeText}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tổng chi tiêu</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Tổng chi tiêu"
                  name="price"
                  onChange={this.isChangeText}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Mô tả chi tiêu</label>
                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Mô tả chi tiêu"
                  style={{ resize: "none" }}
                  name="description"
                  onChange={this.isChangeText}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Lưu
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}
