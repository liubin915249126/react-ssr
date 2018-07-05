const path = require('path');
const fs = require('fs');

let pages = [];

pages = fs.readdirSync(path.resolve("./", "pages")).map((file)=>{
    console.log(file);
    return file.split('.')[0];
  })

module.exports = pages;