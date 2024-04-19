const express = require("express");
const crypto = require("crypto-js");

const router = express.Router();

const mysql = require("mysql2");
const db = require("../db");
const utils = require("../utils");

router.get("/getAllUser", (req, res) => {
  const statement = `select * from user`;

  db.pool.execute(statement, (error, data) => {
    res.send(utils.createResult(error, data));
  });
});

router.post("/login", (request, response) => {
  const statement = `select id , isDelete from user where email = ? and password = ?;`;

  const { email, password } = request.body;

  const cryptoPass = String(crypto.SHA224(password));

  db.pool.execute(statement, [email, cryptoPass], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {

      const user = result[0]

      if(result.length==0){

      response.send(utils.createErrorResult("Invalid user"));

      }else{

        if (user[`isDelete`] == 1) {
          response.send(utils.createErrorResult(" Account deleted previously..."));
        }else{
  
          response.send(utils.createSuccessResult(result[0]));
  
        }

      }

     
    }
  });
});


router.post('/addUser',(req,res)=>{
    const statement = `insert into user  (fName , lName , salary , email , password) values (?,?,?,?,?); `

    const {fName , lName , salary , email , password}= req.body

    const pass = String(crypto.SHA224(password))

    db.pool.execute(statement,[fName , lName , salary , email , pass],(error,data)=>{

        if(error){
            res.send(utils.createErrorResult(error))
        }else{
            res.send(utils.createSuccessResult("User Registered successfully..."))
        }

    })
})

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const statement = `update user set isDelete = 1 where id = ?;`;
  db.pool.execute(statement, [id], (error, data) => {

    res.send(utils.createSuccessResult("User Deleted successfully...."));

  });
});

// router.post('/addUser',(req,res)=>{
//     const statement
// })

module.exports = router;
