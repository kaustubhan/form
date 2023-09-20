import express from "express";
import bodyParser from "body-parser";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
let alert = require('alert'); 

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("complete.ejs");
});

app.post("/submit",(req,res)=>{
  const data=req.body;
  delete data.submit;

  if(data.middleName===''){
    data.middleName=null;
  }
  console.log(data);

  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    port: 3306,
    user: 'sql12647543',
    password: 'gZYUTLGig8',
    database: 'sql12647543'
  });

  connection.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
  });

  let a='ab';

  connection.query("INSERT INTO uni SET ?",data, (err,res)=>{
    if(err){
      if(err.code=== 'ER_DUP_ENTRY'){
        a='ER_DUP_ENTRY';
        console.log("error");
      }
    }
  });
  setTimeout(function() {
    console.log(a);
    if(a==='ER_DUP_ENTRY'){
      res.render("complete.ejs",{check:a});
    } else{
      res.render("index.ejs");
    }
  }, 1000);
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});