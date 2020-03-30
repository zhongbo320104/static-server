
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars = require('handlebars');
const path = require('path');
const config = require('../config/defaultConfig')

const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath);

const template = handlebars.compile(source.toString());

const mime = require('./mime.js')

module.exports = async function(req,res,filePath){
    try {
        const statData = await stat(filePath);
        if(statData.isFile()){
            res.statusCode = 200;
            const contentType = mime(filePath);
            console.log(contentType)
            res.setHeader('Content-Type',contentType);
            fs.createReadStream(filePath).pipe(res)
        } else if (statData.isDirectory()){
            files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html;charset=utf-8');
            const dirPath = path.relative(config.root,filePath);
            const datas = {
                title:path.basename(filePath),
                dir:dirPath?`/${dirPath}`:'',
                files
            }
            res.end(template(datas))
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end(`${filePath} is not a directory`);
    } 
}