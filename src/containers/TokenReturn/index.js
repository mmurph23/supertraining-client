import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import uuid from "uuid";
// import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import api from "../../api";

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let token = this.props.location.search.split("code=")[1];
    await localStorage.setItem("code", token);
    this.props.history.push("/CreateChallenge");
  }

  render() {
    return <div className="TokenReturn" />;
  }
}
