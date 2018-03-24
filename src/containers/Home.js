import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      challenges: []
    };
  }

  
  render() {
    return (
      <div className="Home">
        <div><p>Hello!</p></div>
      </div>
    );
  }
}