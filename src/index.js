import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
// import awsconfig from "./aws-config";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

console.log(process.env.REACT_APP_COGNITO_REGION);
console.log(process.env.REACT_APP_COGNITO_USER_POOL_ID);
console.log(process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID);
console.log(process.env.REACT_APP_APP_COGNITO_CLIENT_ID);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_COGNITO_CLIENT_ID
  }
});


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker(); 