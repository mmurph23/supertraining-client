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
import "./CreateChallenge.css";

export default class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      challengeName: ""
    };
  }

  async componentDidMount() {
    let code = localStorage.getItem("code");
    let authUrl = `https://www.strava.com/oauth/token`;
    var request = new Request(authUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: `${process.env.REACT_APP_STRAVA_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_STRAVA_CLIENT_SECRET}`,
        code: `${code}`
      })
    });
    try {
      let strava = await fetch(request);
      console.log("strava");
      let usable = strava.text();
      usable.then(txt => {
        let resObj = JSON.parse(txt);
        let at = resObj.access_token;
        let athlete = resObj.athlete.id;
        localStorage.setItem("at", at);
        localStorage.setItem("athlete", athlete);
      });
    } catch (err) {
      console.log(err);
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      let uid = uuid();
      let mileage = await await api.createChallenge(
        this.state.challengeName,
        uid
      );
      this.props.history.push({
        pathname: "/EditChallenge",
        state: { challengeId: uid }
      });
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="CreateChallenge">
        <h2>Create a Challenge</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="challengeName" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              placeholder="Challenge Name"
              value={this.state.challengeName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="challengeDesc" bsSize="large">
            <FormControl
              autoFocus
              componentClass="textarea"
              placeholder="Challenge Description"
              value={this.state.challengeDesc}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="challengeLink" bsSize="large">
            <FormControl
              autoFocus
              type="text"
              placeholder="Link to Challenge Event"
              value={this.state.challengeLink}
              onChange={this.handleChange}
            />
          </FormGroup>

          <Button type="submit">Create</Button>
          {/* <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          /> */}
        </form>
      </div>
    );
  }
}
