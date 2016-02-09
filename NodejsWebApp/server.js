var http = require('http');
var Promise = require('promise');
var express = require('express');


var options = {
  host: 'api.fixer.io',
//  host: 'dummy',
  port: 80,
  path: '/latest'
};


function getRate(ccy) {

	if (!(ccy === undefined)){
		options.path = '/latest?base=' + ccy;
	}
	return 	function getExchangeRates(fullfill, reject) {
			http.get(options, function(resp){
			  resp.on('data', function(ratesJson){
			    var liveRates = JSON.parse(ratesJson);
			    liveRates.source = 'live';
			    console.log("Got liveRates: " + JSON.stringify(liveRates));
			    fullfill(liveRates);
			  });
			}).on("error", function(e){
				// fallback to use saved rates
				var cacheRates = require('./cachedRates.json');
			    cacheRates.source = 'cached';
				console.log("Use cacheRates: " + JSON.stringify(cacheRates));
			    fullfill(cacheRates);
			});
		};
}



var app = express();


app.get('/currency/:CCY', function(req, res){
    var promise = new Promise(getRate(req.params.CCY));
	promise.then(function(rates){
		console.log("Rates: " + JSON.stringify(rates));
        console.log("CCY =  " + req.params.CCY);
		res.send(JSON.stringify(rates));
	});

});


app.listen(1234, function(){
	console.log('app started...');
});


