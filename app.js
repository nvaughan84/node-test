
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

var twitter = require("ntwitter");






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
app.get('/game', routes.game);
app.get('/controller', routes.controller);
app.get('/dashboard', routes.dashboard);

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
    	//console.log('left');
  	io.sockets.emit('animate_left');
  });

   socket.on('up', function () {
    	//console.log('up');
  	io.sockets.emit('animate_up');
  });

    socket.on('down', function () {
    	//console.log('down');
  	io.sockets.emit('animate_down');
  });

});

/*
TWITTER INTEGRATION
*/
var twit = new twitter({
        consumer_key: "ROyBT4c8hAeOXPEGzW6Myw",
        consumer_secret: "FbyXytiDSsidur2p4NW7teCrPcyxFvYYrogjbpFNPCo",
        access_token_key: "183235021-0oeczSZ76m9ABESnS2dAZOBVzxG7tKa4AjOM4wZU",
        access_token_secret: "kBSAB2SrKy7BDkTmF2CBJppdUNdxKknmjva3USxTqtHiB"
    });

/*io.sockets.on('connection', function (socket) {  
  twit.get('search/tweets', {q: 'Playstation'}, function(err, item) {
      io.sockets.emit('tweet', { message: item });
    });
  });*/

//Load tweets
io.sockets.on('connection', function (socket) {  

    twit.stream('user', {track:'nvaughan84'}, function(stream) {
    stream.on('data', function (data) {
      socket.emit('tweet', { message: data });
      console.log(data);
    });
  });
});
/*
twit.stream('user', {track:'nvaughan84'}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
  stream.on('end', function (response) {
    // Handle a disconnection
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
  });
  // Disconnect stream after five seconds
  setTimeout(stream.destroy, 5000);
});
*/







setInterval(function() { io.sockets.emit('update'); }, 1000);


io.sockets.on('connection', function (socket) {  
  twit.get('/statuses/user_timeline.json', {count: 3}, function(err, item) {
      
    socket.emit('tweet_init', { message: item });
    console.log(item);
      });
    });


//freckle
// Add your own subdomain and API token information
freckle( "thebluecube", "7pdr1nbjszdkp6cvw2gq66e48en3vqt" );

freckle.users.list(function( err, users ) {
  if( err ) {
    throw new Error( err );
  }
    //console.log(users);
}); 

io.sockets.on('connection', function (socket) 
      { 
setInterval(function()
  {
    freckle.projects.list(function( err, project ) {
      if( err ) {
        throw new Error( err );
      }
      //console.log(project);
       
        socket.emit('freckle', {message: project});
      

    }); 
    //console.log('test');
  }, 5000);

});

