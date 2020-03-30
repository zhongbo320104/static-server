const path = require('path');
let mimeTypes = {
    "html":"text/html",
    "css":"text/css",
    "gif":"image/gif",
    "jpg":"image/jpeg",
    "jpeg":"image/jpeg",
    "txt":"text/plain",
    "js":"application/javascript",
    "json":"application/json",
    "png":"image/png"
}

module.exports = (filePath)=> {
    let ext = path.extname(filePath).slice(1);

    if(!ext){
        ext = filePath;
    } 

    return mimeTypes[ext] || mimeTypes['txt']
}