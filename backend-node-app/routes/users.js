var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//var md5 = require('md5');
var jwt = require('jsonwebtoken');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "sampledb",
});

con.connect(function(err) {
  if(err) {
    console.log('error connecting: ' + err.stack);
    return
  }
  console.log("connect");
})

global.con = con;
/* GET users listing. */
router.post('/register', async function (req, res, next) {
  try {
    let { username, email, password } = req.body; 
    console.log("backend");
    console.log(req.body);
    const checkUsername = `Select username FROM users WHERE username = ?`;
    global.con.query(checkUsername, [username], (err, result, fields) => {
      if(!result.length){
        const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
        global.con.query(
          sql, [username, email,password],
        (err, result, fields) =>{
          if(err){
            res.send({ status: 0, data: err });
          }else{
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token : token });
          }
         
        })
      }
    });
    
   
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});


router.post('/login', async function (req, res, next) {
  try {
    let { username, password } = req.body; 
  
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    global.con.query(
      sql, [username, password],
    function(err, result, fields){
      if(err){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token });
      }
     
    })
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});


module.exports = router;
