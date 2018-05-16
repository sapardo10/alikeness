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

    this.y0 = d3.scaleLinear()
      .range([this.height, 0]);

    this.g.append("g")
      .attr("class", "axis-x")
      .attr("transform", "translate(0," + this.height + ")");

    this.g.append("g")
      .attr("class", "axis-y");


    this.svgUpdate(this.props);
  }

  svgUpdate (props) {
    var data = [];

    if (props.userData && props.userData.friends && props.userData.friends.length > 0) {
      var p = props.userData.personality;
      data = p.map((d) => {return { name: d.name, value: d.percentile };});


      this.x.domain(data.map((d) => { return d.name; }));
      this.y.domain([0, d3.max(data, (d) => { return d.value; })]);

      const bars = this.g.selectAll(".bar")
        .data(data);

      bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => { return this.x(d.name); })
        .attr("y", (d) => { return this.y(d.value); })
        .attr("height", (d) => { return this.height - this.y(d.value); })
        .attr("width", this.x.bandwidth());


      const xUpdate = this.g.select(".axis-x");

      xUpdate.transition()
        .duration(900)
        .call(d3.axisBottom(this.x));

      xUpdate.exit()
        .remove();

      const yUpdate = this.g.select(".axis-y");

      yUpdate
        .call(d3.axisLeft(this.y));


      yUpdate.exit()
        .remove();
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
              ref = {(svg) => {this.svg = svg; return this.svg; }}>
              vizualizacion distances of  buses
            </svg>
          </Col>
        </Row>

      </div>
    );
  }
}

//Props del Home
Visualizacion.propTypes = {
  userData: PropTypes.object
};
