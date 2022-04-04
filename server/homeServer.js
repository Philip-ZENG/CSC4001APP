const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// Connecting to the AWS RDS mySQL server
var connection = mysql.createConnection({
  host: "database-2.c0pbv8ca91j5.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "qweasdzxc",
  database: "pickup",
});

// Connet to mysql
connection.connect(function (err) {
  if (err) throw err;
});

function getAllActivity(callback){
  connection.query({
    sql: 'SELECT * FROM `activity_info`',
    }, function (err, results) {
      return callback(results[0]);
    });
}

app.post("/getActivityInfo", function (req, res) {
  var q = "SELECT * FROM activity_info";
  connection.query(q, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/searchActivity", function(req, res){
  var q = "SELECT * FROM activity_info where " + req.body.searchType + " = ?";
  connection.query({
    sql: q,
    values: [req.body.userInput]
  }, function(err, result){
      if (err) throw err;
      res.json(result);
    }
  );
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});