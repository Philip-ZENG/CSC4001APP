const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

var loginVerification = false;

// Connecting to the local mySQL server
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "qweasdzxc",
//   database: "join_us",
// });

// Connecting to the AWS RDS mySQL server
var connection = mysql.createConnection({
  host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "qweasdzxc",
  database: "user",
});

// Connet to mysql
connection.connect(function (err) {
  if (err) throw err;
});


// Post route (Client post something to the server)
// This route is called when server receives something from the client
app.post("/register", function (req, res) {
  // Obtain the client side info with the help of body-parser package
  var person = {
    email: req.body.userAccount,
    password: req.body.password
  };

  console.log(person);

  // Insert the data into database, the syntax comes from the mysql.js package
  var q = "INSERT INTO accountInfo SET ?";
  connection.query(q, person, function (err, result) {
    if (err) throw err;
  });
});


app.post("/login", function (req, res) {
  var person = {
    email: req.body.userAccount,
    password: req.body.password
  };

  console.log(person);

  var sql = "SELECT password FROM ?? WHERE ?? = ?";
  var inserts = ['accountInfo', 'email', person.email];
  sql = mysql.format(sql, inserts);

  connection.query(sql, person, function(err, result){

    var password = result[0].password;
    if(password = person.password){
      loginVerification = true;
    }
    else{
      loginVerification = false;
    }
  });
});

app.get("/login", function (req, res) {
  if(loginVerification){
    res.json({
      verificationResult: true,
    });
  }
  else{
    res.json({
      verificationResult: false,
    });
  }
});

// Web site will get the latest registered email
app.get("/getEmail", function (req, res) {
    var q = "SELECT email AS email FROM accountInfo ORDER BY id DESC LIMIT 1";
    connection.query(q, function (err, result) {
      if (err) throw err;
      var email = result[0].email;
      // Render the target page with given file, we don't know how long it take to do the query
      // To make sure the render executes after query finishes
      // We can pass in data to the ejs file here
      res.json({
        email_address: email,
      });
    });
});


// when "/" page is requested, the callback function is called, called routing, usually we send out a page (html) file
// Client gets something from the server
app.get("/getCount", function (req, res) {
  // Find count of user in DB
  var q = "SELECT COUNT(*) AS count FROM accountInfo";
  connection.query(q, function (err, result) {
    if (err) throw err;
    var count = result[0].count;
    // Render the target page with given file, we don't know how long it take to do the query
    // To make sure the render executes after query finishes
    // We can pass in data to the ejs file here
    res.json({
      numberOfRegistery: count,
    });
  });
});


const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`listening on ${port}`);
});