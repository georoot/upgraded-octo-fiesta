// Include all libs here
require('dotenv').config();
const express = require('express');
const parser  = require('body-parser');
const chalk   = require('chalk');
const natural = require('natural');

// Load environment variables here
var http_port = process.env.http_port;
http_port = parseInt(http_port,10);

// Init express app
var app = express();
app.use(parser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'pug');


app.get("/",(req,res)=>{
    res.render('index',{});
});

app.post("/",(req,res)=>{
    natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
        var label  = classifier.classify(req.body.q);
        var output = classifier.getClassifications(req.body.q);
        res.render('index',{'label': label,'q':req.body.q,'output':output});
    });
});

app.listen(http_port,()=>{
    var message = chalk.red.bold("Http server started on port "+http_port);
    console.log(message);
});
module.exports = app;
