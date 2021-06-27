import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";
const axios = require("axios");

export default class Week extends Component {
  constructor(props){
    super(props);
    this.state = {
      data_label: [],
      data_content: []
    }
  }
  loader = () => {
    if(this.state.loader === true){
      return (
        <div className="loader">
        </div>
      )
    }
  }
  async componentDidMount() {
    this.setState({loader: true});
    var url = process.env.REACT_APP_API_URL+"/days";
    var arrLabel = [];
    var arrPrice = [];
    await axios
      .get(url)
      .then((response) => {
        response.data.result.map((item)=>{
          arrLabel.push(item.name_date);
          arrPrice.push(item.total_price);
        })
        this.setState({loader: false});
      })
      .catch((error) => {
        console.log(error.response);
      });
      this.setState({ 
        data_label: arrLabel,
        data_content: arrPrice
      });
  }
  filterOfMonth = async (e) => {
    this.setState({loader: true})
    if(e.target.value === "0"){
      this.componentDidMount();
      return;
    }else{
      var url = process.env.REACT_APP_API_URL+"/days/filter-month/";
      var arrLabel = [];
      var arrPrice = [];
      await axios
      .get(url+e.target.value)
      .then((response) => {
        response.data.result.map((item)=>{
          arrLabel.push(item.name_date);
          arrPrice.push(item.total_price);
        })
      })
      .catch((error) => {
        console.log(error.response);
      });
      this.setState({ 
        data_label: arrLabel,
        data_content: arrPrice
      });
    }
    await this.setState({loader: false})
  }
  
  render() {
      return (
          <div className="container">
            <h4 className="mt-5">BIỂU ĐỒ</h4>
            {this.loader()}
            <div className="filter mb-3">
              <select onChange={this.filterOfMonth} name="filter_month">
                <option value="0">Chọn</option>
                <option value="6-2021">tháng 6-2021</option>
                <option value="5-2021">tháng 5-2021</option>
              </select>
            </div>
            <div className="content">
            <Bar
                data={{
                  labels: this.state.data_label,
                  datasets: [
                    {
                      label: "VND",
                      backgroundColor: [
                        "#3e95cd",
                        "#8e5ea2",
                        "#3cba9f",
                        "#e8c3b9",
                        "#c45850",
                        "#fas713",
                      ],
                      data: this.state.data_content
                    }
                  ]
                }}
                options={{
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Predicted world population (millions) in 2050"
                  }
                }}
              />
            </div>
          </div>
      )
  }
}
