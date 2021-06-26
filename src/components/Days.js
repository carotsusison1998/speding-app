import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import "moment-timezone";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Spinner from '@bit/joshk.react-spinners-css.spinner';
import $ from 'jquery';

const axios = require("axios");

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: "",
      data: [],
      dataDetail: [],
      isLoading: false,
      name_day: "",
      total_day: ""
    };
  }
  loader = () => {
    if(this.state.loader === true){
      return (
        <div className="loader">
          <Spinner color="#000000" />
        </div>
      )
    }
  }
  componentDidMount() {
    axios
      .get("https://app-spending.herokuapp.com/days")
      // .get("http://localhost:3100/days")
      .then((response) => {
        this.setState({ 
          data: response.data.result,
          total: response.data.total
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  renderData = () => {
    if (this.state.data.length > 0) {
      const listItems = this.state.data.map((item, i) => (
        <tr key={item._id}>
          <td>{i + 1}</td>
          <td>
            {/* <Moment format="DD/MM/YYYY">{item.name_date}</Moment> */}
            {item.name_date}
          </td>
          <td>{this.getDayofWeek(item.name_date)}</td>
          <td>
            <NumberFormat
              value={item.total_price}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
            VND
          </td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#show-spending-detail"
              onClick={(e, id) => this.getSpendingDetail(e, item._id)}
            >
              Chi tiết
            </button>
          </td>
        </tr>
      ));
      return <>{listItems}</>;
    }
  };
  getSpendingDetail = async (e, id) => {
    const param = { id_day: id };
    await axios
      .post("https://app-spending.herokuapp.com/days/get-day", param)
      // .post("http://localhost:3100/days/get-day", param)
      .then((response) => {
        console.log(response.data.result_2);
        this.setState({ 
          dataDetail: response.data.result,
          name_date: response.data.result_2[0].name_date,
          total_day: response.data.result_2[0].total_price,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  handleDeleteSpending = async (id) => {
    this.setState({loader: true})
    await axios
      .delete("https://app-spending.herokuapp.com/spendings", {
        params: {
          id: id
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({ dataDetail: response.data.result });
        this.setState({ data: response.data.result_2 });
        setTimeout( async () =>{
          await this.setState({loader: false})
        }, 1000)
      })
      .catch((error) => {
        console.log("errrrrr: ", error.response);
      });
  }
  renderSpendingDetail = () => {
    if(this.state.dataDetail.length > 0){
      return (
        <div style={{overflowX:"auto"}}>
          {this.loader()}
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên chi tiêu</th>
                <th>Giá</th>
                <th>Ngày nhập</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {this.state.dataDetail.map((item, i) => {
                var url_edit = "/days/edit-spending/"+item._id
                return (
                  <tr key={item._id}className={"spending-item-"+item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <NumberFormat
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      VND
                    </td>
                    <td>
                      <Moment format="DD/MM/YYYY">{item.created_at}</Moment>
                    </td>
                    <td>
                      <Link to={url_edit}>Sửa</Link>
                      <span className="btn-click" onClick={()=>this.handleDeleteSpending(item._id)}>Xóa</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };
  getDayofWeek = (date) => {
    var dateString = date;
    var dataSplit = dateString.split('/');
    var dateConverted;
    if (dataSplit[2].split(" ").length > 1) {
        var hora = dataSplit[2].split(" ")[1].split(':');
        dataSplit[2] = dataSplit[2].split(" ")[0];
        dateConverted = new Date(dataSplit[2], dataSplit[1]-1, dataSplit[0], hora[0], hora[1]);
    } else {
        dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0]);
    }
    var d = new Date(dateConverted);
    var weekday = new Array(7);
    weekday[0] = "Chủ nhật";
    weekday[1] = "Thứ hai";
    weekday[2] = "Thứ ba";
    weekday[3] = "Thứ tư";
    weekday[4] = "Thứ năm";
    weekday[5] = "Thứ sáu";
    weekday[6] = "Thứ bảy";
    return weekday[d.getDay()];
  };
  
  // renderButtonAddDay = () => {
  //   return;
  // };

  // AddNewDay = async () => {
  //   const param = {
  //     id_user: 1,
  //     date: new Date(),
  //     total_price: 0
  //   }
  //   await axios
  //     .post("http://localhost:4000/api/spending/create-day", param)
  //     .then((response) => {
  //       if (response.data.success) {
  //         window.location.reload();
  //       }

  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // }

  render() {
    return (
      <>
        <div
          className="modal fade"
          id="show-spending-detail"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modal-show-spending-detail"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="title">
                  <h5 className="modal-title" id="modal-show-spending-detail">Chi tiết ngày: {this.state.name_date}</h5>
                  <p>
                  Tổng: <NumberFormat
                          value={this.state.total_day}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        VND
                  </p>
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">{this.renderSpendingDetail()}</div>
            </div>
          </div>
        </div>
        <div className="container">
          <h4 className="mt-5">DANH SÁCH CHI TIÊU THEO NGÀY</h4>
          Tổng: <NumberFormat
                        value={this.state.total}
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      VND
          <div style={{overflowX:"auto", height: "550px"}}>
            <table className="table table-dark table-striped"  style={{overflowX: 'auto'}}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ngày</th>
                  <th>Thứ</th>
                  <th>Tổng chi tiêu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.renderData()}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
