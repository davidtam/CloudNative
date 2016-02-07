

var request = require('request');
var http = require('http');
var port = process.env.port || 1337;


//var promise = Promise;

var returnRate = function (error, response, body) {
        if (!error && response.statusCode === 200) {
            obj = JSON.parse(body);
            rates = obj.rates;
            startServer(rates);
        }
    };


function startServer(rates){
    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('rate = ' + JSON.stringify(rates));

    }
    ).listen(port);

}

request('http://api.fixer.io/latest', returnRate);
