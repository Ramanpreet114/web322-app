var express = require("express");

var app = express();

app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8080;
const path = require("path");
var blogservice = require(__dirname + "/blog-service.js");






function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}



app.get("/", function(_req,res){
    // res.send("<h3>About</h3>");
    
    res.redirect('/about');
});
app.get("/about",(_req,res)=>
{
  res.sendFile(path.join(__dirname,'/views/about.html'))
});



app.get("/blog", function (_req, res) {
  blogservice.getPublishedPosts().then((data) => {
    res.json({data});
}).catch((err) => {
    res.json({message: err});
})
});

app.get("/posts", function (_req, res) {
  blogservice.getAllPosts().then((data) => {
    res.json({data});
}).catch((err) => {
    res.json({message: err});
})
});

app.get("/categories", function (_req, res) {
  blogservice.getCategories().then((data) => {
    res.json({data});
}).catch((err) => {
    res.json({message: err});
})
});



// app.get("/about", function(req,res){
//   res.send('TODO: return')
//  });

app.use((req, res) => {
  res.status(404).end('404 PAGE NOT FOUND');
});

blogservice.initialize().then(() => {
  app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
  console.log('promises unfulfilled');
});
  
