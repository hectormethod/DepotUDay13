var fs = require('fs');
var path = require('path');
var url = require('url');

function getFileExtension(route) {
    var arr = route.split('.');
    if(arr.length<=1) {
        return 'html'
    }
    return arr[arr.length -1].toLowerCase();
}

function handleRequests(req, res) {
    var header;
    var route = url.parse(req.url).path;
    if(route === '/') {
        route = '/index.html';
    }
    var ext = getFileExtension(route);
    switch (ext) {
        case 'css':
            header = {
                'Content-Type': 'text/css'
            };
            break;
        case 'js':
            header = {
                'Content-Type': 'application/javascript'
            };
            break;
        case 'html':
            header = {
                'Content-Type': 'text/html'
            };
            break;
        default:
            header = {
                'Content-Type': 'application/json'
            };
            break;
    }
    
    var filePath;
    if(route === '/messages') {
        if(req.method === 'GET') {
            filePath = './messages.txt';
            readFile(filePath, header, res);
        }
        if(req.method === 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                writeTweet(JSON.parse(body), res);
            });
        }
    } else {
        filePath = '../client' + route;
        readFile(filePath, header, res);
    }
}

function writeTweet(tweet, res) {
    if(tweet.text && tweet.userName) {
        console.log(tweet);
        fs.appendFile(__dirname + '/messages.txt', JSON.stringify(tweet), function(err){
            console.log(err);
            res.writeHead(200);
            res.end();
        });
    } else {
        console.log('server error');
        res.writeHead(500);
        res.end();
    }
}

function readFile(filePath, header, res) {
    
    var file = path.join(__dirname, filePath);
      fs.readFile(file, function (err, data) {
        var statusCode = statusCode || 200;
        res.writeHead(statusCode, header);
        res.end(data);
      });
}

module.exports = {
    handleRequests: handleRequests
};

//create module to handle routes
/*createServer takens in a function to handle requests. Here is where you can
create a handler for get and post requests. Note: req(request) and res(response)
come from node's http module. They include both incoming information like urls
and outgoing like content */

/*In order to complete the project, this callback will need to handle get requests,
post requests and server up other files like css.

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
*/