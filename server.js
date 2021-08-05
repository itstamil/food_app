var app = require('./api.js');
var port = 8080;
var http = require('http');

// Listen HTTP server on port 8080
http.createServer(app).listen(port,function(){
	console.log('Express server listening on port ' + port);
});
