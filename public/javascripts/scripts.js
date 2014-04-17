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

	//animate right
		$(document).on('click', '.right', function()
		{
			socket.emit('right');			
		});

		socket.on('animate_right', function()
			{				
				$('.sprite').animate({left: '+=200'});	
			});

		//animate left
		$(document).on('click', '.left', function()
		{
			socket.emit('left');			
		});

		socket.on('animate_left', function()
			{				
				$('.sprite').animate({left: '-=200'});
			});

		//animate up
		$(document).on('click', '.up', function()
		{
			socket.emit('up');			
		});

		socket.on('animate_up', function()
			{				
				$('.sprite').animate({top: '-=200'});
			});

		//animate down
		$(document).on('click', '.down', function()
		{
			socket.emit('down');			
		});

		socket.on('animate_down', function()
			{				
				$('.sprite').animate({top: '+=200'});
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

	$(document).ready(function()
		{
			
		});



	

