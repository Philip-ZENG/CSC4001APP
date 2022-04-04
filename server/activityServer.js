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

/**
 * @description
 * Get the list of activity_id of a user with given user_id
 * @param {*} callback 
 * Pass the activity_id list to next function
 * Callback is used to make sure data reading finishes before passing
 */
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

/**
 * @description
 * Extract all the information of an activity with a given activity_id
 * @param {*} callback 
 * Callback is used to make sure data reading finishes before passing data
 */
function get_activity_info(activity_id,callback) {
  connection.query({
    sql: 'SELECT * FROM `activity_info` WHERE `activity_id` = ?',
    values: [activity_id]
  }, function (err, results) {
    return callback(results[0]);
  });
}

/**
 * @description
 * Pack all the activity info of a user into an array
 * @returns 
 * Return the activity info in a packed array
 */
async function pack_activity_info(user_id){
  
  // Get the list of activity_id
  var myPromise1 = function(user_id){
    return new Promise(function(resolve){
      get_activity_list(user_id,(result)=>{
        resolve(result);
      });
    })
  }

  // Get all the information of activities of a uer
  var myPromise2 = function(activity_id){
    return new Promise(function(resolve) {
      get_activity_info(activity_id,(data)=>{
        resolve(data);
      });
    })
  }
  
  // Response is the list containing all activity information pack
  var response = [];

  // Get activity list from Promise1
  const activity_id_list = await myPromise1(user_id);
  response.push(activity_id_list);

  // Get activity data from Promise 2
  var activity_data = []; 
  for(var i = 0; i < activity_id_list.length; i++){
    const activityInfo = await myPromise2(activity_id_list[i]);
    activity_data.push(activityInfo);
  }
  response.push(activity_data);

  return response;
};

/**
 * @description
 * Return activity info of a specific user to whom make the request
 */
app.post("/getActivityInfo", function (req, res) {

  pack_activity_info(req.body.user_id)
    .then(response => {
      res.json(response);
    })
    .catch(() => {
      console.log("error")
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
