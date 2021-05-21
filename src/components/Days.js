import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const axios = require("axios");

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataDetail: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://app-spending.herokuapp.com/days")
      .then((response) => {
        this.setState({ data: response.data.result });
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
            {/* <Moment format="DD/MM/YYYY">{item.name}</Moment> */}
            {item.name}
          </td>
          <td>{this.getDayofWeek(item.name)}</td>
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
              onClick={(e, id) => this.getSpendingDetail(e, item.id)}
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
    const param = { id: id };
    axios
      .post("http://localhost:4000/api/spending/get-expending-detail", param)
      .then((response) => {
        this.setState({ dataDetail: response.data.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  renderSpendingDetail = () => {
    return (
      <>
        <h4 className="mt-5">DANH SÁCH CHI TIÊU TRONG MỘT NGÀY</h4>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chi tiêu</th>
              <th>Giá</th>
              <th>Ngày nhập</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataDetail.map((item, i) => {
              return (
                <tr key={item.id}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };
  getDayofWeek = (date) => {
    // var mydate = new Date(date).toISOString();
  // console.log(mydate.toDateString());
  console.log(moment(new Date('"'+date+'"')).format("YYYY/MM/DD"));
    // var d = new Date(date);
    // var weekday = new Array(7);
    // weekday[0] = "Chủ nhật";
    // weekday[1] = "Thứ hai";
    // weekday[2] = "Thứ ba";
    // weekday[3] = "Thứ tư";
    // weekday[4] = "Thứ năm";
    // weekday[5] = "Thứ sáu";
    // weekday[6] = "Thứ bảy";
    // return weekday[d.getDay()];
    // console.log(date);
    // console.log(d.toDateString());
  };
  renderButtonAddDay = () => {
    if (this.state.data.length > 0) {
      var time1 = moment(new Date()).format('YYYY-MM-DD');
      var time2 = moment(this.state.data[0].date).format('YYYY-MM-DD');
      if (time1 !== time2) {
        return <button onClick={()=>{this.AddNewDay()}} className="btn btn-primary mb-2">Tạo ngày mới</button>;
      }
    }
  };
  AddNewDay = async () => {
    const param = {
      id_user: 1,
      date: new Date(),
      total_price: 0
    }
    await axios
      .post("http://localhost:4000/api/spending/create-day", param)
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }

      })
      .catch((error) => {
        console.log(error.response);
      });
  }

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
                <h5 className="modal-title" id="modal-show-spending-detail">
                  Modal title
                </h5>
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
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container">
          <h4 className="mt-5">DANH SÁCH CHI TIÊU THEO NGÀY</h4>
          {this.renderButtonAddDay()}
          <table className="table table-dark table-striped">
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
              <tr>
                <td>Tổng: </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
