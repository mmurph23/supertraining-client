import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import NotFound from "./containers/NotFound";
import CreateChallenge from "./containers/CreateChallenge";
import AuthProvider from "./containers/AuthProvider";

export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute
      path="/"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/Home"
      exact
      component={Home}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/AuthProvider"
      exact
      component={AuthProvider}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/CreateChallenge"
      exact
      component={CreateChallenge}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
