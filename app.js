
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var freckle = require( 'freckle' );

var app = express();
var socket = require('socket.io');






// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = socket.listen( server );


io.sockets.on('connection', function (socket) {  

  socket.on('message', function (data) {
  	io.sockets.emit('reply', { message: data.message });
  });

  socket.on('right', function () {
  	io.sockets.emit('animate_right');
  });

    socket.on('left', function () {
    	console.log('left');
  	io.sockets.emit('animate_left');
  });

   socket.on('up', function () {
    	console.log('up');
  	io.sockets.emit('animate_up');
  });

    socket.on('down', function () {
    	console.log('down');
  	io.sockets.emit('animate_down');
  });

});



setInterval(function() { io.sockets.emit('update'); }, 1000);

//freckle
// Add your own subdomain and API token information
freckle( "thebluecube", "7pdr1nbjszdkp6cvw2gq66e48en3vqt" );

freckle.users.list(function( err, users ) {
  if( err ) {
    throw new Error( err );
  }

  console.log( users );
});	