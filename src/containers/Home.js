import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from '../libs/awsLib';
import "./Home.css";

export default class Home extends Component {
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
    } catch (e) {
      this.setState({challenges: {challengeId:'0'}})
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  challenges() {
    return invokeApig({ path: "/challenges" });
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple challenge app</p>
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