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
import "./AuthProvider.css";

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      challengeName: ""
    };
  }

  componentWillMount() {
    localStorage.setItem("code", this.props.location.search);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    window.location =
      "http://www.strava.com/oauth/authorize?client_id=21243&response_type=code&redirect_uri=http://localhost:3000/TokenReturn";
  };

  render() {
    return (
      <div className="AuthProvider">
        <h2>Please Authenticate with One of the Below Activity Trackers</h2>
        <ul>
          <Button onClick={this.handleSubmit}>STRAVA</Button>
        </ul>

        {/* <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          /> */}
      </div>
    );
  }
}
