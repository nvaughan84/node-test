 var socket = io.connect('http://10.88.88.111');
 //var socket = io.connect('http://192.168.0.6');
 var count = 0;
  /*socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });*/

 	socket.on('tweet_init', function(data)
 		{
 			$.each(data, function(index, value)
 				{
 					$.each(value, function(i, v)
 						{
							created_time = $('<div/>', 
							{
							    class: 'created_at'
							}).text(v.created_at);

							message = $("<p/>",
								{
									style: 'display: none'
								}).text(v.text).fadeIn().slideDown();
							message.append(created_time);
							$('.tweets').append(message);
 						});
 					
 				});
 		});


	socket.on('tweet', function(data)
	{
		if($('.tweets p').length > 2)
		{
			$('.tweets p:last-child').remove();
		}
		
			created_time = $('<div/>', 
			{
			    class: 'created_at'
			}).text(data.message.user.created_at);

			message = $("<p/>",
				{
					style: 'display: none'
				}).text(data.message.text).fadeIn().slideDown();
			message.append(created_time);
			$('.tweets').prepend(message);
			
			console.log(data.message.text);
	})

	//LIST FRECKLE PROJECTS
	socket.on('freckle', function(data)
		{
			console.log('loaded freckle');
			$('.project_list').empty();
			$.each(data.message, function(index, value)
				{
					billable = value.project.billable_minutes/60;
					budget = value.project.budget_minutes/60;
					remaining = (value.project.budget_minutes-value.project.billable_minutes)/60
					percent_complete = (value.project.billable_minutes/value.project.budget_minutes)*100;
					//console.log(value.project);
					//console.log(value.project.name);
					project = $('<p/>', 
					{
						class: 'project'
					}).text(value.project.name+' - '+value.project.billable_minutes/60 +' of '+ value.project.budget_minutes/60+' hours ('+percent_complete+'%) ');
					if(value.project.budget_minutes>0)$('.project_list').append(project);
				});

		});


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



	

