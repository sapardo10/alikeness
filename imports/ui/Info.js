import React, { Component } from "react";
import {
  Row, Col, Card,
  CardBody
} from "reactstrap";


export default class Info extends Component {
  render () {
    return (
      <Card>
        <CardBody>
          <Row>

            <Col sm="2" className="centro">
              <img width="150" src="/opennes.png" title="logo openness" alt="logo openness" />
              <h4>Openness</h4>
              <p>Openness is the extent to which a person is open to experiencing different activities</p>
            </Col>
            <Col sm="3" className="centro">
              <img width="150" src="/conscientiousness.png" title="logo Conscientiousness" alt="logo Conscientiousness" />
              <h4>Conscientiousness</h4>
              <p>Conscientiousness is a person's tendency to act in an organized or thoughtful way.</p>
            </Col>
            <Col sm="2" className="centro">
              <img width="150" src="/extraversion.png" title="logo Extraversion" alt="logo Extraversion" />
              <h4>Extraversion</h4>
              <p>Extraversion is a person's tendency to seek stimulation in the company of others.</p>
            </Col>
            <Col sm="2" className="centro">
              <img width="150" src="/agreeableness.png" title="logo Agreeableness" alt="logo Agreeableness" />
              <h4>Agreeableness</h4>
              <p>Agreeableness is a person's tendency to be compassionate and cooperative toward others.</p>
            </Col>
            <Col sm="2" className="centro">
              <img width="150" src="/range.png" title="logo Emotional range" alt="logo Emotional range" />
              <h4>Emotional range</h4>
              <p>Emotional range, is the extent to which a person's emotions are sensitive to the person's environment.</p>
            </Col>
            <Col sm="12" >
              <hr />
            </Col>
            <Col sm="8" className="centro">
              <h4>Numeric interpretation</h4>
              <p className="justificado" >For each request, the service always reports a normalized score as a percentile for each Big Five personality characteristic. Normalized scores
                represent a percentile ranking for each characteristic that is based on qualities that the service infers from the input text. The service computes normalized scores
                 by comparing the raw score for the author's
                text with results from a sample population. The service reports each percentile as a double in the range of 0 to 100.</p>
            </Col>
          </Row>
        </CardBody>
      </Card>

    );
  }
}
