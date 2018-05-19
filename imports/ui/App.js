import React, { Component } from "react";
import PropTypes from "prop-types";

import Visualizacion from "./Visualizacion/Visualizacion";
import Info from "./Info";

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
  CardBody,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Modal, ModalHeader, ModalBody
} from "reactstrap";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      account: "",
      lenguage: "",
      userData: null,
      typeCompare: "",
      numberAccunts: "",
      userCompare: null,
      isOpen: false,
      modal: false,
      info: true
    };
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeLenguage = this.handleChangeLenguage.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.makeQueryCompare = this.makeQueryCompare.bind(this);
    this.handleChangeTypeCompare = this.handleChangeTypeCompare.bind(this);
    this.handleChangeNumberAccunts = this.handleChangeNumberAccunts.bind(this);
    this.restart = this.restart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderApp = this.renderApp.bind(this);
    this.info = this.info.bind(this);
    this.app = this.app.bind(this);
  }

  info () {
    this.setState({
      info: true
    });
  }
  app () {
    this.setState({
      info: false
    });
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleModal () {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeQuery ({ target: { value } }) {
    this.setState({ account: value });
  }

  handleChangeLenguage ({ target: { value } }) {
    this.setState({ lenguage: value });
  }

  handleChangeNumberAccunts ({ target: { value } }) {
    this.setState({ numberAccunts: value });
  }
  handleChangeTypeCompare ({ target: { value } }) {
    this.setState({ typeCompare: value });
  }

  restart () {
    this.setState({
      account: "",
      lenguage: "",
      userData: null,
      typeCompare: "",
      numberAccunts: "",
      userCompare: null });
  }

  makeQueryCompare (event) {
    event.preventDefault();
    this.toggleModal();

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
          this.toggleModal();
          this.setState({ userCompare: result });
        }
      });
    }
  }

  makeQuery (event) {
    event.preventDefault();
    this.toggleModal();

    const account = this.state.account;
    const lenguage = this.state.lenguage;
    const len = (lenguage === "es" || lenguage === "en");
    if (lenguage !== "" && account !== "" && len) {
      Meteor.call("get.twitter.account", account, lenguage, (error, result) => {
        if (error) {
          console.log(error.toString());
        } else {
          this.toggleModal();
          this.setState({ userData: result });
        }
      });
    }
  }

  searchBar () {
    if (this.state.userData) {
      return (
        <div>
          <Row>
            <Col sm="3">
              <img className="rounded"
                height="100"
                src={this.state.userData.image}
                alt={"picture of " + this.state.userData.name} />
            </Col>
            <Col sm="9" className="justificado">
              <p>The user has {this.state.userData.followers_count} followers </p>
              <p>The user is following {this.state.userData.following_count} accounts </p>
            </Col>
          </Row>
          <hr/>
          <Form className="new-task" onSubmit={this.makeQueryCompare} >
            <FormGroup>
              <Label for="numberAccunts">Now many accounts you whan to compare  ?</Label>
              <Input
                type="select"
                name="numberAccunts"
                id="numberAccunts"
                value={this.state.numberAccunts}
                onChange={this.handleChangeNumberAccunts}>
                <option>{""}</option>
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
                <option>{""}</option>
                <option>following</option>
                <option>followers</option>
              </Input>
            </FormGroup>
            <Button color="primary">Send</Button>
            {" "}
            <Button color="secondary" onClick={this.restart}>Restart</Button>
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
          <Button color="primary">Send</Button>
        </Form>);
    }
  }

  renderApp () {
    let graph = "";
    if (this.state.userData) {
      graph = (<Visualizacion userData={this.state.userData} userCompare={this.state.userCompare} />);
    }
    return (<div>
      <Row>
        <Col className="centro" sm="5">
          <Card className="centro">
            <CardBody>
              {this.searchBar()}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br/>
      <hr/>
      {graph}
      <Modal isOpen={this.state.modal}>
        <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
        Wait a moment we are fetching data ...
          <br/>
          <br/>
          <div className="centro">
            <img src="/loading.svg" alt="Logo loadding"/>
          </div>
        </ModalBody>
      </Modal>
    </div>);
  }

  render () {
    let view = "";
    if (!this.state.info) {
      view = this.renderApp();
    } else {
      view = <Info/>;
    }
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand role="listitem">
            <img src="/logo.png" height="50" alt="Logo alikeness"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem onClick={this.info}>
                <NavLink >
                  { "Information" }
                </NavLink>
              </NavItem>
              <NavItem onClick={this.app}>
                <NavLink >
                  { "Analyze personality" }
                </NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
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
        {view}
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
