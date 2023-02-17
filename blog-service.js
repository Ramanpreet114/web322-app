const fs = require('fs');
const { resolve } = require('path');
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
exports.addPosts = (postData) =>
{
  return new Promise((resolve,reject) =>
  {
    if(postData.published == undefined) {
      postData.published = false;
  } else {
      postData.published = true;
  }

  postData.length = posts.length + 1; 
  posts.push(postData);
  resolve(postData);
  })
}
exports.getPostbyID = (ID) =>
{
  return new Promise((resolve,reject) =>
  {
  var filterp = posts.find(post=> post.ID == ID);
  if (filterp)
  {
    resolve(filterp);
  }
  else
  {
    reject('no result found');
  }
})
}
exports.getPostbyMinDate = (minDateStr) =>
{
  return new Promise((resolve,reject) =>
  {
  var filterdat = posts.filter(posts => (new Date(post.postDate)) >= (new Date(minDateStr)))
  if (filterdat.length != 0)
  {
    resolve(filterdat); 
  }
  else
  {    
    reject('no result found');
  }
})
}
exports.getPostsByCategory = function(category) {
  return new Promise((resolve, reject) => {
      let filteredcatp = posts.filter(post => post.category == category);

      if (filteredcatp.length != 0)
      {
        resolve(filteredcatp);
      } else {
          
          reject('no result found');
      }
  })
}