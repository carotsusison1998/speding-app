import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import "moment-timezone";
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
      .then((response) => {
        this.setState({ dataDetail: response.data.result });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  renderSpendingDetail = () => {
    if(this.state.dataDetail.length > 0){
      return (
        <div style={{overflowX:"auto"}}>
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
                  <tr key={item._id}>
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
  renderButtonAddDay = () => {
    return;
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
                DANH SÁCH CHI TIÊU TRONG MỘT NGÀY
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
            </div>
          </div>
        </div>
        <h4 className="mt-5">DANH SÁCH CHI TIÊU THEO NGÀY</h4>
        <div className="container" style={{overflowX:"auto"}}>
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
