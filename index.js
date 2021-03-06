/* Require node modules to implement */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var app = require('./server/app.js');

var server = http.createServer(app.handleRequests);
var port = 3000;

server.listen(port);
console.log('Listening on port', port);

/*createServer takes in a function to handle requests.
Here is where you can create a handler for get and post requests.
Note: req(request) and res(response) come from node's http module.
They include both incoming information like urls and outgoing like content */

/*In order to complete the project, this callback will need to handle
get requests, post requests and server up other files like css.

Hint: creating a function to replace the anonymous function may be useful.
		EXAMPLE:
		function requestHandler(req, res) {
			if(request url === '/'){
				// handle this way
			} else if(request url === '/messages'){
				if(request method  === 'GET'){
					// handle this way
				}

				...
		};

		var server = http.createServer(requestHandler)

//var server = http.createServer(function(req, res){

/*
	/* file path to the index.html file using path module */
/*	var file = path.join(__dirname, './client/index.html');

	  fs.readFile(file, function (err, data) {
		var statusCode = statusCode || 200;
		var header = {
			//Content-Type will need to be changed if it is something other
			  than html, like: js,css or json
			'Content-Type': 'text/html'
		};

		/* writeHead writes a response which includes statusCodes and header*/
	//	res.writeHead(statusCode, header);

		/*indicates conclusion of the response 
		https://nodejs.org/api/http.html#http_response_end_data_encoding_callback*/
	//	res.end(data);
//	  });

/*Requests are completed over port numbers and each one needs a unique number.
Most port numbers between 0 - 1024 are reserved so here 3000 is a standard testing port to use.
More on port numbers: https://en.wikipedia.org/wiki/Port_(computer_networking) */






