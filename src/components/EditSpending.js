import React, { Component } from "react";
import { toast } from 'react-toastify';
const axios = require("axios");

export default class EditSpending extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        name: "",
        price: "",
        description: "",
        isLoading: false
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const param = { _id: id };
    await axios
      // .post("https://app-spending.herokuapp.com/spendings/get-detail", param)
      .post("https://app-spending.herokuapp.com/spendings/get-detail", param)
      .then((response) => {
        this.setState({
            id: response.data.result._id,
            name: response.data.result.name,
            price: response.data.result.price,
            description: response.data.result.note,
        })
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  isChangeText = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  loader = () => {
    if (this.state.loader === true) {
      return (
        <div className="loader">
        </div>
      );
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loader: true});
    const param = {
      name: this.state.name,
      price: this.state.price,
      note: this.state.description,
      _id: this.state.id,
    };
    axios
    .put("https://app-spending.herokuapp.com/spendings", param)
    // .put("http://localhost:3100/spendings", param)
    .then((response)=>{
      if (response.data.status === true) {
        setTimeout( async () =>{
          await this.setState({loader: false})
          toast("Cập nhật chi tiêu thành công");
        }, 1000)
      }
    })
    .catch((error)=>{
        if(error.response.data.isJoi){
        const err = error.response.data.details[0].message.replace(/"/g, "");
        setTimeout( async () =>{
          await this.setState({loader: false});
          if(err) toast(err);
        }, 1000)
      }
    });
  };
  render() {
    return (
      <div className="container">
        {this.loader()}
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h4 className="text-center mt-5">NHẬP CHI TIÊU</h4>
            <form id="spending-form">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tên chi tiêu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên chi tiêu"
                  name="name"
                  onChange={this.isChangeText}
                  defaultValue={this.state.name}
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
                  defaultValue={this.state.price}
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
                  defaultValue={this.state.description}
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
