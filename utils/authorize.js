const { google } = require("googleapis");
const chalk = require('chalk');
// const key = require("../cred.json");
const key = require("../service_account.json");

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  null,
);

const authorize = async () => {
    try {
      await jwtClient.authorize();
      const accessToken = jwtClient.credentials.access_token;
      console.log(chalk.green("Authorized with Google"));
      return { accessToken };
    } catch (err) {
      console.error(chalk.red("Error when Authorizing. Check your Credentials."));
    }
  };

module.exports = authorize;
