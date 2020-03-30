
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
module.exports = async function(req,res,filePath){
    try {
        const statData = await stat(filePath);
        if(statData.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            fs.createReadStream(filePath).pipe(res)
        } else if (statData.isDirectory()){
            files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain');
            res.end(files.join(','))
        }
    } catch (error) {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end(`${filePath} is not a directory`);
    } 
}