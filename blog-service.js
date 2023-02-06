const fs = require('fs');
var categories = [];
var posts = [];
exports.initialize = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/posts.json', (err, data) => {
        if (err) {
          reject("Error while reading the posts file");
          return;
        }
        posts = JSON.parse(data);
  
        fs.readFile('./data/categories.json', (err, data) => {
          if (err) {
            reject("Error while reading the categories file");
            return;
          }
          categories = JSON.parse(data);
          resolve();
        });
        return resolve;
      });
    });
  };
exports.getAllPosts = () =>
{
    return new Promise((resolve,reject)=>{
        if (posts.length == 0)
        {
            reject('no posts yet');
        }
        resolve(posts);
    })
}

exports.getPublishedPosts = () =>
{
    return new Promise((resolve,reject) =>
    {
        var publish = posts.filter(post => post.published == true);
        if (publish.length == 0)
        {
            reject('no results yet');
            
        }
        resolve(publish);
    })
}



exports.getCategories = () =>
{
    return new Promise((resolve,reject)=>{
        if (categories.length == 0)
        {
            reject('no categories yet');
        }
        resolve(categories);
    })
}