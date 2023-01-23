const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res) {
   res.sendFile(__dirname + "/signup.html")
});

app.post("/",function (req,res) {
   
   const firstName =  req.body.fname;
   const LastName = req.body.lname;
   const Email = req.body.email;

   const data = {
      members: [
         {
         email_address: Email,
         status: "subscribed",
        merge_fields :{
         FNAME: firstName,
         LNAME:LastName
        } 
      }
      ]   
   };


const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/acf7b30979";

const options = {
   method: "POST",
   auth: "aerin1:cab4add2b5c042bc9071c4d110432f02-us17"
}

const request = https.request(url,options,function (response) {
if (response.statusCode===200) {
   res.sendFile(__dirname + "/success.html");
} else {
   res.sendFile(__dirname + "/failure.html");
}

   response.on("data",function (data) {
           console.log(JSON.parse(data));
   })
})

 request.write(jsonData);
request.end();

});

app.post("/failure",function (req , res) {
   res.redirect("/");
})

app.listen(process.env.PORT || 3000,function () {
   console.log("server running at 3000 port"); 
});





// API KEY
// c9a19e0449e2852dfe6f38c5dbdf99e9-us17



// list id
// acf7b30979