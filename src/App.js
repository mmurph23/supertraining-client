import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavItem, Nav, Button, FormGroup, FormControl, ControlLabel, } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import Routes from "./Routes";
import Login from "./containers/Login";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: false,
      search: '',
      user: '',
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  // userHasAuthenticated = authenticated => {
  //   this.setState({ isAuthenticated: authenticated });
  // }



  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user })
  }



  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/");
  }

  renderSignInNav() {
    return (
      <Navbar fluid style={{ background: '#2fa4c6', width: '100vw', margin: '0px', height: '130px', padding: '17px 40px 20px 40px', border: 'none', borderRadius: '0px' }}>

        <Navbar.Brand>
          <Link to="/" style={{ fontSize: '48px', color: '#fff', fontWeight: '100', paddingTop: '40px' }}>PROJECT SUPERTRAINING</Link>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Nav style={{ float: 'right' }}>

            <Login {...this.props} userHasAuthenticated={this.userHasAuthenticated} setUser={this.setUser} />

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  renderMainNav() {
    return (
      <Navbar fluid className="main-nav" style={{ background: '#0972d6', width: '100vw', margin: '0px', height: '115px', padding: '5px 40px 10px 40px', border: 'none', borderRadius: '0px' }}>

        <Navbar.Brand className="logo2">
          <Link to="/"></Link>
        </Navbar.Brand>

        <Navbar.Collapse>
          <Nav >


          </Nav>
          <Button onClick={() => this.handleLogout()} style={{ float: 'right' }}>Logout</Button>
        </Navbar.Collapse>

      </Navbar>
    )
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      user: this.state.user,
    };

    return (
      // !this.state.isAuthenticating &&
      <div className="App container" style={{ padding: '0px', margin: '0px', width: '100vw', minHeight: '100vh' }}>
        {this.props.location.pathname === '/' ?
          this.renderSignInNav()
          :
          this.renderMainNav()
        }
        <Routes childProps={childProps} />
      </div>

    );
  }
}
export default withRouter(App);