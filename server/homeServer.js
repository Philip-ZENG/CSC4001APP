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

app.post("/getActivityInfo", function (req, res) {
  var q = "SELECT * FROM activity_info";
  connection.query(q, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/searchActivity", function(req, res){
  var q = "SELECT * FROM activity_info WHERE " + req.body.searchType + " = ?";
  console.log(req.body.userInput);
  connection.query({
    sql: q,
    values: [req.body.userInput]
  }, function(err, result){
      if (err) throw err;
      res.json(result);
  });
});

app.post("/searchByDate", function(req, res){
  var q = "SELECT * FROM activity_info where date(time) = ?;";
  connection.query({
    sql: q,
    values: [req.body.dateinput]
  }, function(err, result){
    if (err) throw err;
    res.json(result);
  });
})

app.post("/postActivity", function(req, res){
  var q1 = "SELECT COUNT(*) FROM activity_info;";
  var id = 1;
  connection.query(q1, function(err, result){
    if (err) throw err;
    id += Number(result[0]["COUNT(*)"]);
    console.log(id);
  });
  var q2 = "INSERT INTO activity_info VALUES (?," + req.body.title + "," + req.body.time + "," 
  + req.body.location + "," + req.body.description + ",?,?," + req.body.type + ")";
  console.log(q2);
  // connection.query({
  //   sql: q2,
  //   values: [id,, req.body.number, req.body.number-1],
  // }, function(err, result){
  //   if (err) throw err;
  //   res.json(result);
  // })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});