import _ from "lodash";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2",
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  // secretAccessKey default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

let dynamodb = new AWS.DynamoDB({ region: "us-east-2" });
let db = new AWS.DynamoDB.DocumentClient();

const api = {
  getUser(id) {
    let params = {
      Key: {
        email: {
          S: id
        }
      },
      TableName: "supertraining_users"
    };
    return dynamodb.getItem(params).promise();
  },
  createUser(id) {
    let params = {
      Item: {
        email: {
          S: id
        },
        challenges: {
          L: []
        }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "supertraining_users"
    };
    return dynamodb.putItem(params).promise();
  },
  createChallenge(challenge) {
    let params = {
      Item: {
        challengeId: {
          S: challenge.id
        },
        challengeName: {
          S: challenge.name
        },
        challengeDescription: {
          S: challenge.desc
        },
        challengeUrl: {
          S: challenge.url
        },
        startingMileage: {
          N: challenge.mileage
        }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "supertraining_challenges"
    };

    return dynamodb.putItem(params).promise();
  }
};

export default api;
