import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios");


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    let tempDate = new Date();
    let date = tempDate.getFullYear()+ '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
    this.state = {
      date: date,
      name: "",
      price: "",
      description: "",
      data: [],
      isLoading: false
    };
  }
  componentWillMount(){
    this.setState({loader: true});
  }
  componentDidMount(){
    this.setState({loader: false});
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
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loader: true});
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
      // .post("http://localhost:3100/spendings", param)
      .then((response)=>{
        if (response.data.status === true) {
          setTimeout( async () =>{
            await this.setState({loader: false})
            toast("Thêm chi tiêu thành công");
            document.getElementById("spending-form").reset();
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
  loader = () => {
    if(this.state.loader === true){
      return (
        <div className="loader">

        </div>
      )
    }
  }
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
                <label htmlFor="exampleInputEmail1">Ngày chi tiêu</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={this.isChangeText}
                  defaultValue={this.state.date}
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
