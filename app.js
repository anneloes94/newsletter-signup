const bodyParser = require("body-parser")
const express = require("express")
const request = require("request")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const emailAddress = req.body.emailAddress  

  const data = {
    members: [
      {
        email_address: emailAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const apiKey = process.env.MAILCHIMP_KEY
  const listID = process.env.LIST_ID

  const url = `https://usX.api.mailchimp.com/3.0/lists/`

  https.request(url, options, (response) => {

  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000")
})
