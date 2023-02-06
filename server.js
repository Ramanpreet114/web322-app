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

app.get("/post", function (_req, res) {
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
  });
});

app.use((req, res) => {
  res.status(404).end('404 PAGE NOT FOUND');
});


  
blogservice.initialize()
 .then(() => {
   // start the server only if the initialization was successful
   app.listen(HTTP_PORT, () => {
     console.log(`Server is listening on port ${HTTP_PORT}`);
   });
 })
 .catch(err => {
   // output the error to the console if the initialization failed
   console.error("Error initializing the blog-service:", err);
 });