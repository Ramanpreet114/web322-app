
/********************************************************************************
// WEB322 – Assignment 02
// * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
// * of this assignment has been copied manually or electronically from any other source 
// * (including 3rd party web sites) or distributed to other students.
// * 
// * Name: ___________Ramanpreet Singh___________ Student ID: ____157079211__________ Date: _____5 Feburary 2023___________
// *
// * Cyclic Web App URL: ____________________https://puce-faithful-rhinoceros.cyclic.app/____________________________________
// *
// * GitHub Repository URL: _________________________https://github.com/Ramanpreet114/web322-app_____________________________


********************************************************************************/ 

var express = require("express");

var app = express();

app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8080;
const path = require("path");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
var blogservice = require(__dirname + "/blog-service.js");

const upload = multer(); // no { storage: storage } since we are not using disk storage
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

app.get("/posts/add",(req,res)=>
{
  res.sendFile(path.join(__dirname, '/views/addPost.html'))
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

cloudinary.config({
  cloud_name: 'dvap3dela',
  api_key: '145978467877823',
  api_secret: 'nCpYsVXqeeN_AuL-SauvQ-_kgTc',
  secure: true
 });


 app.post("/posts/add", upload.single("featureImage"), (req, res) => 
 {
    if(req.file)
    {
      let streamUpload = (req) => 
      {
        return new Promise((resolve, reject) => 
        {
            let stream = cloudinary.uploader.upload_stream
          (
            (error, result) => 
            {
              if (result) 
              {
                  resolve(result);
              } else 
                {
                  reject(error);
                }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      async function upload(req) 
      {
        let result = await streamUpload(req);
        console.log(result);
        return result;
      }
      upload(req).then((uploaded)=>
      {
      
      req.body.featureImage = uploaded.url;
    
      blogservice.addPost(req.body).then(post => 
        {
          res.redirect("/posts");
        }).catch(err => 
        {
          res.status(404).send(err);
        });
      });
    }
    else
    {
      req.body.featureImage = "";
    
    blogservice.addPost(req.body).then(post => {
      res.redirect("/posts");
    }).catch(err => {
      res.status(404).send(err);
    })
    }
    function processPost(imageUrl)
    {
      req.body.featureImage = imageUrl
    };
 
  }
);
app.get("/posts", function (req, res) {
  let q = null;
  if (req.q.category) {
    q = blogservice.getPostsByCategory(req.q.category);
  } else if (req.q.minDate) {
    q = blogservice.getPostsByMinDate(req.q.minDate);
  } else {
    q = blogservice.getAllPosts();
  }

  q.then((data) => {
    res.json({ data });
  }).catch((err) => {
    res.json({ message: err });
  })
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