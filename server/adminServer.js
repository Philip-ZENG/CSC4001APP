const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");
const { func } = require("joi");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// Connecting to the local mySQL server
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qweasdzxc",
  database: "pickup",
});

// Connecting to the AWS RDS mySQL server
// var connection = mysql.createConnection({
//   host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "qweasdzxc",
//   database: "pickup",
// });

// Connet to mysql
connection.connect(function (err) {
  if (err) throw err;
  console.log('mySQL server connection succeed.')
});

/**
 * @description
 * Get all the user info
 */
function getUserInfo(callback) {
  connection.query('SELECT * FROM `user_info`', function (err, results) {
    console.log(results);
    var user_info = [];
    for(var i = 0; i < results.length; i++) {
      user_info.push(results[i]);
    }
    return callback(user_info);
  });
}

/**
 * @description
 * Get all the user info and send it to client
 */
app.get('/getUserInfo', function(req,res){
  getUserInfo(function(response) {
    res.json(response);
  })
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
