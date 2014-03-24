 var socket = io.connect('http://localhost');
  /*socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });*/

	


$(document).on('click', function()
	{
		 socket.emit('my other event', { my: 'data' });
	});

	socket.on('news', function(data)
	{
		$('.message_output').append($("<p></p>").text(data.message));
	})

	
	   $(document).keypress(function(e) {
    			if(e.which == 13) {
					mes = $('.message').val();
					socket.emit('message', { message: mes });
					console.log(mes);
				}
			});

