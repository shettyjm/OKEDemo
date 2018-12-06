var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());


app.get('/test', function(req, res) {  
    res.status(200).json({status:true});
});


var port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log('<----------listening on localhost ' + port + '---------->')
// });

let now = new Date();
//testing

var server = app.listen(port, function () {
    console.log('<----------listening on localhost ' + port + '---------->');
});


module.exports = server

//sed -i 's/cert_data/$/g' file.txt