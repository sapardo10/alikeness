import React, { Component } from "react";
import PropTypes from "prop-types";

import Visualizacion from "./Visualizacion/Visualizacion";
import UserGraph from "./UserGraph.js";

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
  Row,
  Card,
  CardBody
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      lenguage: "",
      userData: null,
      typeCompare: "",
      numberAccunts: null,
      userCompare: null
    };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeLenguage = this.handleChangeLenguage.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.makeQueryCompare = this.makeQueryCompare.bind(this);
    this.handleChangeTypeCompare = this.handleChangeTypeCompare.bind(this);
    this.handleChangeNumberAccunts = this.handleChangeNumberAccunts.bind(this);
  }

  handleChangeQuery({ target: { value } }) {
    this.setState({ account: value });
  }

  handleChangeLenguage({ target: { value } }) {
    this.setState({ lenguage: value });
  }

  handleChangeNumberAccunts({ target: { value } }) {
    this.setState({ numberAccunts: value });
  }
  handleChangeTypeCompare({ target: { value } }) {
    this.setState({ typeCompare: value });
  }

  makeQueryCompare(event) {
    event.preventDefault();
    console.log("intento compare");
    const typeCompare = this.state.typeCompare;
    const numberAccunts = Number(this.state.numberAccunts);
    const len = (typeCompare === "following" || typeCompare === "followers");
    const idStr = this.state.userData.idStr;
    const lenguage = this.state.lenguage;
    const len2 = (lenguage === "es" || lenguage === "en");
    if (typeCompare !== "" && numberAccunts <= 20 && len && len2 && lenguage !== "") {
      Meteor.call("twitter.get.user.data2", typeCompare, numberAccunts, idStr, lenguage, (error, result) => {
        if (error) {
          console.log(error.toString());
        } else {
          this.setState({ userCompare: result });
          console.log(result);
        }
      });
    }
  }

  makeQuery(event) {
    event.preventDefault();
    console.log("intento");
    const account = this.state.account;
    const lenguage = this.state.lenguage;
    const len = (lenguage === "es" || lenguage === "en");
    if (lenguage !== "" && account !== "" && len) {
      Meteor.call("get.twitter.account", account, lenguage, (error, result) => {
        if (error) {
          console.log(error.toString());
        } else {
          this.setState({ userData: result });
          console.log(result);
        }
      });
    }
  }

  searchBar() {
    if (this.state.userData) {
      return (
        <div>
          <p>The user has {this.state.userData.followers_count} followers </p>
          <p>The user is following {this.state.userData.following_count} accounts </p>
          <Form className="new-task" onSubmit={this.makeQueryCompare} >
            <FormGroup>
              <Label for="numberAccunts">Now many accounts you whan to compare  ?</Label>
              <Input
                type="select"
                name="numberAccunts"
                id="numberAccunts"
                value={this.state.numberAccunts}
                onChange={this.handleChangeNumberAccunts}>
                <option />
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="typeCompare">Want to compare to ?</Label>
              <Input
                type="select"
                name="typeCompare"
                id="typeCompare"
                value={this.state.typeCompare}
                onChange={this.handleChangeTypeCompare}>
                <option />
                <option>following</option>
                <option>followers</option>
              </Input>
            </FormGroup>
            <Button color="secondary">Send</Button>
          </Form>
        </div>);
    } else {
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
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="lenguage">Select a lenguage</Label>
            <Input
              type="select"
              name="lenguage"
              id="lenguage"
              value={this.state.lenguage}
              onChange={this.handleChangeLenguage}>
              <option />
              <option>es</option>
              <option>en</option>
            </Input>
          </FormGroup>
          <Button color="secondary">Send</Button>
        </Form>);
    }
  }

  render() {
    console.log("render!");

    let graph = "";
    if (this.state.userCompare) {
      graph = (<Visualizacion userData={this.state.userData} userCompare={this.state.userCompare} />);
    } else {
      graph = <UserGraph userData={this.state.userData} />;
    }
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <Row>
              <Col sm="4">
                <img className="logo" height="300" src="/logo.png" alt="logo alikeness" />
              </Col>
              <Col sm="8">
                <h1 className="centered">Alikeness</h1>
                <p> Find out how your twitter personality relates to the people you follow</p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Row>
          <Col md="4">
            {}
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                {this.searchBar()}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {graph}
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
