import React, { Component } from "react";
import PropTypes from "prop-types";


import Visualizacion from "./Visualizacion.js";

import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Collection } from "../api/collection.js";
import { User } from "../api/collection.js";
import { UserTweets } from "../api/collection.js";
import { Following } from "../api/collection.js";
import {
  Jumbotron,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
  InputGroupAddon,
  Button,
  Col,
  Row
} from "reactstrap";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      queryInput: "",
      userData: {}
    };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  handleChangeQuery ({ target: { value } }) {
    this.setState({ queryInput: value });
  }
  makeQuery (event) {
    event.preventDefault();
    const query = this.state.queryInput;
    if (query !== "") {
      console.log("Query: " + query);
      Meteor.call("twitter.get.user.data", query, (error, result) => {
        if (error) {
          // handle the error
        } else {
          this.setState({ userData: result });
          console.log(result);
        }
      });
    }
  }
  searchBar () {
    return (
      <Form className="new-task" onSubmit={this.makeQuery} >
        <FormGroup>
          <Label for="query">Insert Twitter account: </Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input
              id="query"
              type="text"
              value={this.state.queryInput}
              onChange={this.handleChangeQuery}
              placeholder="account"
            />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Enviar</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>);
  }

  render () {
    console.log("render!");
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <Row>
              <Col sm="4">
                <img className="logo" height="300" src="/logo.png" alt="logo alikeness"/>
              </Col>
              <Col sm="8">
                <h1 className="centered">Alikeness</h1>
                <p> Find out how your twitter personality relates to the people you follow</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <div className="contenido">
          {this.searchBar()}
        </div>
        <Visualizacion userData={this.state.userData} />
      </div>
    );
  }
}
//prop types for App
App.propTypes = {
  user: PropTypes.array.isRequired,
  collection: PropTypes.array.isRequired,
  tweets: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired
};
export default withTracker(() => {
  Meteor.subscribe("collection");
  Meteor.subscribe("user");
  Meteor.subscribe("usertweets");
  Meteor.subscribe("following");
  return {
    collection: Collection.find({}).fetch(),
    user: User.find({}).fetch(),
    tweets: UserTweets.find({}).fetch(),
    following: Following.find({}).fetch()
  };
})(App);
