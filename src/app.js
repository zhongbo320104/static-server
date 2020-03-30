const http = require('http'); 
const config = require('./config/defaultConfig.js');
const chalk = require('chalk');
const path = require('path');
const helperRoute = require('./helper/route')


const server = http.createServer((req,res) => {
    const filePath = path.join(config.root,req.url);
    helperRoute(req,res,filePath)
})

server.listen(config.port,()=> {
    console.log(`server started at ${config.port}`)
})












