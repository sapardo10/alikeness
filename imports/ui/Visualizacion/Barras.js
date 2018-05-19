import React, { Component } from "react";
import PropTypes from "prop-types";
import { BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend } from "recharts";


export default class Barras extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }


  render () {
    let w = 920;
    let maxBarSize = 5;
    if (this.props.data.length === 1) {
      w = 300;
      maxBarSize = 40;
    }
    if (this.props.data.length === 6) {
      maxBarSize = 20;
    }
    return (
      <div >
        <BarChart width={w} height={300} data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} maxBarSize={maxBarSize}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey={this.props.personality} fill={this.props.color} />
        </BarChart>
      </div>
    );
  }
}

//Props del Home
Barras.propTypes = {
  data: PropTypes.array.isRequired,
  personality: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
