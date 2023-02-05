var express = require("express");
var app = express();
app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8080;
const path = require("path")

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


// app.get("/", function(req,res){
//    // res.send("Hello World);
// });


app.get("/", function(req,res){
    // res.send("<h3>About</h3>");
    
    res.redirect('/about');
});
app.get("/about",(req,res)=>
{
  res.sendFile(path.join(__dirname,'/views/about.html'))
});
app.listen(HTTP_PORT, onHttpStart);