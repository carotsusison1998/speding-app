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
  convertDate = (date) => {
    const getDate = new Date(this.state.date);
    const dateConvert = getDate.getDate() + "/"+ parseInt(getDate.getMonth()+1) +"/"+getDate.getFullYear();
    return dateConvert;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.date === "" || this.state.name === "" || this.state.price === "" || this.state.description === "") {
      toast("Sống vội vàng!!! Nhập đủ các ô nhé bạn trẻ");
      return;
    }
    const id_user = localStorage.getItem("_id");
    const param = {
      name: this.state.name,
      price: this.state.price,
      note: this.state.description,
      date: this.convertDate(this.state.date),
      id_user: id_user,
    };
    axios
      .post("https://app-spending.herokuapp.com/spendings", param)
      .then(function (response) {
        if (response.data.status === true) {
          toast(response.data.message);
          document.getElementById("spending-form").reset();
        }
      })
      .catch(function (error) {
        console.log("error.response", error.response);
      });
  };
  componentDidMount() {
    // axios
    //   .get("http://localhost:4000/api/spending")
    //   .then((response) => {
    //     this.setState({ data: response.data.data });
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
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
                {/* <select
                  className="form-control"
                  placeholder="Nhập ngày"
                  name="date"
                  onChange={this.isChangeText}
                >
                  <option>vui lòng chọn</option>
                  {this.renderDate()}
                </select> */}
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={this.isChangeText}
                />
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
