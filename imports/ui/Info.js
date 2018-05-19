import React, { Component } from "react";
import {
  Row, Col, Card,
  CardBody
} from "reactstrap";


export default class Info extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Row>

            <Col sm="2" className="centro">
              <img width="150" src="/opennes.png" title="logo openness" alt="logo openness" />
              <h4>Openness</h4>
              <p>Openness is the extent to which a person is open to experiencing different activities</p>
              {/* <p> Openness reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety a person has. It is also described as the extent to which a person is imaginative or independent and depicts a personal preference for a variety of activities over a strict routine. High openness can be perceived as unpredictability or lack of focus, and more likely to engage in risky behaviour or drug taking. Also, individuals that have high openness tend to lean towards being artists or writers in regards to being creative and appreciate of the significance of the intellectual and artistic pursuits. Moreover, individuals with high openness are said to pursue self-actualization specifically by seeking out intense, euphoric experiences. Conversely, those with low openness seek to gain fulfillment through perseverance and are characterized as pragmatic and data-driven—sometimes even perceived to be dogmatic and closed-minded. Some disagreement remains about how to interpret and contextualize the openness factor</p> */}
            </Col>
            <Col sm="3" className="centro">
              <img width="150" src="/conscientiousness.png" title="logo Conscientiousness" alt="logo Conscientiousness" />
              <h4>Conscientiousness</h4>
              <p>Conscientiousness is a person's tendency to act in an organized or thoughtful way.</p>
              {/* <p>A tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned rather than spontaneous behavior. High conscientiousness is often perceived as stubbornness and obsession. Low conscientiousness is associated with flexibility and spontaneity, but can also appear as sloppiness and lack of reliability.</p> */}
            </Col>
            <Col sm="2" className="centro">
              <img width="150" src="/extraversion.png" title="logo Extraversion" alt="logo Extraversion" />
              <h4>Extraversion</h4>
              <p>Extraversion is a person's tendency to seek stimulation in the company of others.</p>
              {/* <p> Energy, positive emotions, surgency, assertiveness, sociability and the tendency to seek stimulation in the company of others, and talkativeness. High extraversion is often perceived as attention-seeking and domineering. Low extraversion causes a reserved, reflective personality, which can be perceived as aloof or self-absorbed. Extroverted people tend to be more dominant in social settings, opposed to introverted people who may act more shy and reserved in this setting.</p> */}
            </Col>
            <Col sm="2" className="centro">
              <img width="150" src="/agreeableness.png" title="logo Agreeableness" alt="logo Agreeableness" />
              <h4>Agreeableness</h4>
              <p>Agreeableness is a person's tendency to be compassionate and cooperative toward others.</p>
              {/* <p>Emotional range, also referred to as Neuroticism or Natural reactions, is the extent to which a person's emotions are sensitive to the person's environment.</p> */}
              {/* <p>A tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others. It is also a measure of one's trusting and helpful nature, and whether a person is generally well-tempered or not. High agreeableness is often seen as naive or submissive. Low agreeableness personalities are often competitive or challenging people, which can be seen as argumentative or untrustworthy.</p> */}
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
