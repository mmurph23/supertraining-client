import React, { Component } from "react";
import axios from "axios";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from '../libs/awsLib';
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      challenges: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const results = await this.challenges();
      this.setState({ challenges: results });
      console.log(results);
    } catch (e) {
      this.setState({challenges: {challengeId:'0'}})
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  challenges() {
    return invokeApig({ path: "/challenges" });
  }

  stravaAuth() {
    window.location = 'http://www.strava.com/oauth/authorize?client_id=21243&response_type=code&redirect_uri=http://localhost:3000/dashboard&approval_prompt=force&scope=write';
    console.log('clicked on auth');
    // ACCESS_TOKEN : "994c4b1bbd953b3900c0980ba3c520b126f0693c",
    // CLIENT_ID   :"21243",
    // CLIENT_SECRET :"1fbaa9f1611aea55a35c8d1a4adb440e8d167580",
    // REDIRECT_URI :"/"
  }



  showActivities = () => {
    let c = this.props.location.search.split('code=')[1];
    let aCode = null;
    console.log(c);
    axios.post('https://www.strava.com/oauth/token', {
    client_id: '21243',
    client_secret: '1fbaa9f1611aea55a35c8d1a4adb440e8d167580',
    code: c
    }).then(response => {console.log(JSON.stringify(response)); aCode = response.data.access_token; console.log(aCode);return(aCode)})
      .then(axios.get(`https://www.strava.com/`))
    
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Project Supertraining</h1>
        <button onClick={this.stravaAuth}>Authenticate with Strava</button>
        <button onClick={this.showActivities}>Show all Activities</button>
      </div>
    );
  }

  renderchallengesList(challenges) {
    return [{}].concat(challenges).map(
      (challenge, i) =>
        i !== 0
          ? <ListGroupItem
              key={challenge.challengeId}
              href={`/challenges/${challenge.challengeId}`}
              onClick={this.handlechallengeClick}
              header={challenge.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(challenge.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/challenges/new"
              onClick={this.handlechallengeClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new challenge
              </h4>
            </ListGroupItem>
    );
  }
  
  handlechallengeClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderchallengesList() : this.renderLander()}
      </div>
    );
  }
}