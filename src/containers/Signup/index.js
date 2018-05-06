import React, { Component } from "react";
import { Auth } from "aws-amplify";
import {
  Grid,
  Row,
  Col,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoaderButton from "../../components/LoaderButton";
import "./Signup.css";
import background from './chadRide.jpeg';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          email: this.state.email,
        },
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
      console.log(e);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/Home");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  subHeader() {
    return (
      <div className='subHeader' style={{ width: '100vw', height: '60px', background: '#25829d' }}>
        <Col xs={12} md={8} style={{ height: '60px' }}></Col>
        <Col xs={6} md={4} style={{ height: '60px' }}>
          {/* <div className="sub-links" style={{minWidth:'160px',height:'30px',margin:'15 20 15 0',float:'right'}}>
            <Link to="/about" style={{margin:'0 40 0 0',height:'30px',display:'inline-block',fontSize:'20px',color:'#fff',padding:'17px 40px'}}>About</Link>
            <Link to="/blog" style={{margin:'0 40 0 0',height:'30px',display:'inline-block',fontSize:'20px',color:'#fff',padding:'17px 40px'}}>Blog</Link>
          </div> */}
        </Col>
      </div>
    );
  }


  render() {
    return (
      <Grid fluid style={{ backgroundImage: `url(${background})`, height: '100vh', backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPositionY: '60px', paddingLeft: '0px' }}>
        {this.subHeader()}
        <Row className="show-grid signup-wrap">
          <Col xs={12} md={8}>

          </Col>
          <Col xs={6} md={4}>
            <div className="Signup">
              {this.state.newUser === null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
          </Col>
        </Row>
      </Grid>

    );
  }
}