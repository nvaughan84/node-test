 var socket = io.connect('http://10.88.88.111');
 var count = 0;
  /*socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });*/

	


$(document).on('click', function()
	{
		 socket.emit('my other event', { my: 'data' });
	});

	socket.on('reply', function(data)
	{
		$('.message_output').append($("<p></p>").text(data.message));
	})

	$(document).on('click', '.submit', function()
		{
			mes = $('.message').val();
					socket.emit('message', { message: mes });
					console.log(mes);
		});

	
	   $(document).keypress(function(e) {
    			if(e.which == 13) {
					mes = $('.message').val();
					socket.emit('message', { message: mes });
					console.log(mes);
				}
			});


	socket.on('update', function()
	{
		$('.update_output').html(count);
		count++;
	})

