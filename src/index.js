import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import awsconfig from "./aws-config";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsconfig.cognito.REGION,
    userPoolId: awsconfig.cognito.USER_POOL_ID,
    identityPoolId: awsconfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsconfig.cognito.APP_CLIENT_ID
  },
  // Storage: {
  //   region: awsconfig.s3.REGION,
  //   bucket: awsconfig.s3.BUCKET,
  //   identityPoolId: awsconfig.cognito.IDENTITY_POOL_ID
  // },
  API: {
    endpoints: [
      {
        name: "supertraining",
        endpoint: awsconfig.apiGateway.URL,
        region: awsconfig.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker(); 