import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import Barras from "./Barras";

export default class Visualizacion extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  renderBar (titulo, data, personality, i, color) {
    return (
      <Col className="grafica" sm="12" key={i}>
        <Card >
          <CardBody className="centro">
            <CardTitle>
              {titulo}
            </CardTitle>
            <Barras data={data} personality={personality} color={color}/>
          </CardBody>
        </Card>
      </Col>
    );
  }
  // {name: 'Page A', uv: 4000}
  // row["name"] = props.userData.personality[i].name;
  allBars () {
    let user = this.props.userData;
    let compares = this.props.userCompare;
    let rowUser = { name: user.name, openness: user.personality[0].percentile,
      conscientiousness: user.personality[1].percentile,
      extraversion: user.personality[2].percentile,
      agreeableness: user.personality[3].percentile,
      emotional_range: user.personality[4].percentile };

    let data = [];
    data.push(rowUser);
    if (compares) {
      compares = compares.compare;
      for (var i = 0; i < compares.length; i++) {
        let row = { name: compares[i].name, openness: compares[i].personality[0].percentile,
          conscientiousness: compares[i].personality[1].percentile,
          extraversion: compares[i].personality[2].percentile,
          agreeableness: compares[i].personality[3].percentile,
          emotional_range: compares[i].personality[4].percentile };
        data.push(row);
      }
    }
    let titles = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional range"];
    let keys = ["openness", "conscientiousness", "extraversion", "agreeableness", "emotional_range"];
    let colors = ["#56a041", "#cca137", "#db533b", "#a0136a", "#8884d8"];
    let barras = [];
    for (var j = 0; j < 5; j++) {
      let titulo = titles[j];
      let personality = keys[j];
      let dataBarra = [];
      let listaCuentas = [];

      for (var k = 0; k < data.length; k++) {
        let objeto = { name: data[k].name };
        let d = data[k];
        let porcentaje = d[personality];
        objeto[personality] = Math.trunc(porcentaje * 10000) / 100;
        dataBarra.push(objeto);
        listaCuentas.push(data[k].name);
      }
      let grafica = this.renderBar(titulo, dataBarra, personality, j, colors[j]);
      barras.push(grafica);
    }
    return barras;
  }


  render () {
    let graficas = this.allBars();
    return (
      <div className="visualizacion">
        <Row>
          {graficas}
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
