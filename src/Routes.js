import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home.js";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewChallenge from "./containers/NewChallenge";
import Challenges from "./containers/Challenges";
import Dashboard from "./containers/Dashboard";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    {/* <Route path='/dashboard' component={Dashboard} /> */}
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/challenges/new" exact component={NewChallenge} props={childProps} />
    <AuthenticatedRoute path="/challenges/:id" exact component={Challenges} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

