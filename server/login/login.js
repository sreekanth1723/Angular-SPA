//import the db_connection
var conn = require("../config/db_connection");
//import generateToken
var g_token = require("../token/generateToken");
//import db_properties to store the token
var prop = require("../config/db_properties");
//import the express
var express = require("express");
//create the Router Instance
//Router Used to create the Modules
var router = express.Router();
//create the connection object
var connection = conn.getConnection();
//connect to database 
connection.connect();
//create the post request
router.post("/",function(req,res){ 
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    connection.query("select * from login_details where uname='"+uname+"' and upwd='"+upwd+"'",
                function(err,recordsArray,fields){
        if(recordsArray.length>0){
            var token = g_token(uname,
                                upwd,
                                'hr@nareshit.com');
            prop.token = token; 
            res.send({login:"success",
                     token:prop.token});                   
        }else{
            res.send({login:"fail"});
        }
    });
});
module.exports = router;



