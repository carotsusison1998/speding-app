import React, { Component } from 'react'
const axios = require("axios");

export default class Week extends Component {
  async componentDidMount() {
    const param = { _id: "60b2cf4d344b400022b262de" };
    await axios
      .post("https://app-spending.herokuapp.com/spendings/get-detail", param)
      .then((response) => {
        console.log(response);
        // this.setState({ dataDetail: response.data.result });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  
    render() {
        return (
            <div>Hello</div>
        )
    }
}
