//jshint esversion: 6
const express = require("express");//to call express package
const https= require("https"); //no need to install this package as it is already install in the native package
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function(req, res){
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
    var eMail = req.body.Email;
    var passWord = req.body.password;
    var data=
    {
        members:[
            {
                email_address: eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url="https://us12.api.mailchimp.com/3.0/lists/220fd2208f";

    const options={
        method: "POST",
        auth: "ShaliniLodhi:1575132c682c5d0fca6b4b9dee31d815-us12"
    }
    const request = https.request(url, options,  function(response){
      if(response.statusCode ===200){
        res.sendFile(__dirname+"/successPage.html");
      }
      else{
        res.sendFile(__dirname+"/failurePage.html");
      }

       response.on("data", function(data){
           console.log(JSON.parse(data));
       })
    })
    // API Key : 1575132c682c5d0fca6b4b9dee31d815-us12
    // audience ID: 220fd2208f

    //to send the data to mail chimp
    request.write(jsonData);
    request.end();
});


app.listen(3000, function(){
    console.log("server is working!");// to get dialouge in the console log
});
