var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


// app.get("/", function(req,res){
//    // res.send("Hello World);
// });


app.get("/about", function(req,res){
    res.send("<h3>About</h3>");
    app.use(express.static('public'));
    res.redirect('/views/about.html');
});

app.listen(HTTP_PORT, onHttpStart);