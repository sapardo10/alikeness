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
  Button
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryInput: ""
    };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  handleChangeQuery({ target: { value } }) {
    this.setState({ queryInput: value });
  }
  makeQuery(event) {
    event.preventDefault();
    const query = this.state.queryInput;
    if (query !== "") {
      console.log("Query: " + query);
      Meteor.call("twitter.get.user.data", query, (error, result) => {
        if (error) {
          // handle the error
        } else {
          console.log(result);
        }
      });
    }
  }
  searchBar() {
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

  render() {
    console.log("render!");
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-3">Fluid jumbotron</h1>
            <p className="lead">This is a modified jumbotron that occupies the
            entire horizontal space of its parent.</p>
          </Container>
        </Jumbotron>
        <div className="contenido">
          {this.searchBar()}
        </div>
        <Visualizacion collection={this.props.collection} />
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
