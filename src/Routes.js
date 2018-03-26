import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewChallenge from "./containers/NewChallenge";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NotFound from "./containers/NotFound";


export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/challenges/new" exact component={NewChallenge} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;