import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { Row, Col } from "reactstrap";

export default class Visualizacion extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.margin = { top: 20, right: 50, bottom: 30, left: 40 };
  }

  componentDidMount () {
    this.vgg();
  }

  componentWillUpdate (newProps) {
    this.svgUpdate(newProps);
  }

  vgg () {
    const svg = d3.select(this.svg);
    this.height = svg.attr("height") - this.margin.top - this.margin.bottom;
    this.width = svg.attr("width") - this.margin.left - this.margin.right;
    this.g = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x0 = d3.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.1);

    this.x1 = d3.scaleBand()
      .padding(0.05);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    this.z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    this.g.append("g")
      .attr("class", "axis-x")
      .attr("transform", "translate(0," + this.height + ")");

    this.g.append("g")
      .attr("class", "axis-y");

    this.g.append("g")
      .attr("class", "axis-z");


    this.svgUpdate(this.props);
  }

  svgUpdate (props) {
    let data = [];

    if (props.userCompare && props.userData && props.userCompare.compare.length > 0) {
      let keys = [props.userData.name];
      for (let i = 0; i < props.userCompare.compare.length; i++) {
        keys.push(props.userCompare.compare[i].name);
      }
      for (let i = 0; i < props.userData.personality.length; i++) {
        let row = {};
        row["name"] = props.userData.personality[i].name;
        row[String(props.userData.name)] = props.userData.personality[i].percentile;
        for (let j = 0; j < props.userCompare.compare.length; j++) {
          row[String(props.userCompare.compare[j].name)] = props.userCompare.compare[j].personality[i].percentile;
        }
        data.push(row);
      }

      console.log(data);

      this.x0.domain(data.map((d) => { return d.name; }));
      this.x1.domain(keys).rangeRound([0, this.x0.bandwidth()]);
      this.y.domain([0, d3.max(data, (d) => { return d3.max(keys, (key) => { return d[key]; }); })]).nice();

      this.g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", (d) => { return "translate(" + this.x0(d.name) + ",0)"; })
        .selectAll("rect")
        .data((d) => { return keys.map((key) => { return { key: key, value: d[key] }; }); })
        .enter().append("rect")
        .attr("x", (d) => { return this.x1(d.key); })
        .attr("y", (d) => { return this.y(d.value); })
        .attr("width", this.x1.bandwidth())
        .attr("height", (d) => { return this.height - this.y(d.value); })
        .attr("fill", (d) => { return this.z(d.key); });

      this.g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.x0));

      this.g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(this.y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", this.y(this.y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Porcentaje");

      var legend = this.g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", this.width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", this.z);

      legend.append("text")
        .attr("x", this.width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text((d) => { return d; });
    }
  }

  getDistance (lat1, lon1, lat2, lon2) {
    function deg2rad (deg) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  render () {
    return (
      <div className="visualizacion">
        <Row>
          <Col sm="12" className="centered">
            <svg
              width="1200"
              height="600"
              ref = {(svg) => {this.svg = svg; return this.svg; }} />
          </Col>
        </Row>

      </div>
    );
  }
}

//Props del Home
Visualizacion.propTypes = {
  userData: PropTypes.object,
  userCompare: PropTypes.object
};
