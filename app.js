const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAddress = req.body.emailAddress;

  const data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const apiKey = process.env.MAILCHIMP_KEY;
  const listID = process.env.LIST_ID;

  const url = `https://us10.api.mailchimp.com/3.0/lists/${listID}`;

  const options = {
    method: "POST",
    auth: `anneloes94:${apiKey}`,
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonData);
  request.end();
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
