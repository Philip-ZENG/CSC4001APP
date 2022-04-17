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

function get_activity_list(user_id,callback){
    connection.query({
    sql: 'SELECT * FROM `activity_user` WHERE `user_id` = ?',
    values: [user_id]
  }, function (err, results) {
    var activity_id_list = [];
    for(var i = 0; i < results.length; i++){
      activity_id_list.push(results[i].activity_id);
    }
    return callback(activity_id_list);
  });
}

function get_activity_info(activity_id,callback) {
  connection.query({
    sql: 'SELECT * FROM `activity_info` WHERE `activity_id` = ?',
    values: [activity_id]
  }, function (err, results) {
    return callback(results[0]);
  });
}

async function pack_activity_info(user_id){
  
  var myPromise1 = function(user_id){
    return new Promise(function(resolve){
      get_activity_list(user_id,(result)=>{
        resolve(result);
      });
    })
  }

  // Hode the process that takes time in a promise (get_activity_info())
  var myPromise2 = function(activity_id){
    return new Promise(function(resolve) {
      get_activity_info(activity_id,(data)=>{
        resolve(data);
      });
    })
  }
  
  // response is the list containing all activity information pack
  var response = [];

  // get activity list from Promise1
  const activity_id_list = await myPromise1(user_id);

  // Get data from Promise 2
  var activity_data = []; 
  for(var i = 0; i < activity_id_list.length; i++){
    const activityInfo = await myPromise2(activity_id_list[i]);
    activity_data.push(activityInfo);
  }
  response.push(activity_data);

  return response;
};


app.post("/getActivityInfo", function (req, res) {

  pack_activity_info(req.body.user_id)
    .then(response => {
      res.json(response);
    })
    .catch(() => {
      console.log("error")
    });
});



// Pass Activity Info with specific activity_id
app.get("/getActivityInfo", function (req, res) {
    // Find count of user in DB
    var q = "SELECT * FROM activity_info";
    connection.query(q, function (err, result) {
      if (err) throw err;

      res.json(result);

    });
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
