$(document).ready(function(){

	var streamers =["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];


	for (var i = 0;i<streamers.length;i++){
		streamerInfo();
	}
				

			
	function streamerInfo(){
		var divIDS =streamers[i].toLowerCase()
		var status;
		var info;
		var targetUser;
		var logo;
		var displayName;
		
		

		$.ajax({
			url:"https://api.twitch.tv/kraken/streams/" + streamers[i],
			type:"GET",
			headers:{
				'Client-ID': 'crqy9a73fjypmq2hsyahz3x0vkcbg0'
			},
			success: function(data){
				console.log(data);
				console.log(data._links.channel);


				if(data.stream===null){
						status = "Offline";
						
				}

				else{
					status = "Online";
					
				}

				$("#streamers").prepend('<div id ='+ divIDS + ' class="row '+ status+'"'+ '>' + '</div>')

				$.ajax({
					url:data._links.channel,
					type:"GET",
					headers:{
						'Client-ID': 'crqy9a73fjypmq2hsyahz3x0vkcbg0'
					},
					success: function(data2){

					 
						targetUser= data2.display_name.toLowerCase();
						displayName =data2.display_name;
						
						console.log(data2);
						
						console.log(divIDS);

						if(data2.logo!=null){
							logo=data2.logo;
						}

						else{
							logo="https://wiki.openmrs.org/images/icons/profilepics/default.png";
						}
						
						


						if(data.stream===null){
							
							info = " ";
						}

						else{
							
							info = data2.game;
						}

						$("#"+targetUser).append('<div class ="col-md-4"'+'>' +'<h2><img src='+logo + ">"+ displayName+'</h2>' + '</div>');
						$("#"+ targetUser).append('<div class ="col-md-4"'+">"+ '<h4>'+ info+'</h4>' + '</div>');
						$("#"+targetUser).append('<div class ="col-md-4"'+">"+ '<h4>'+ status+'</h4>' + '</div>');
						
					
					},
					error:function(response) {
						
						console.log(response.status);

						if(response.status===404){
							targetUser =divIDS;
							console.log(targetUser);
						 info = "User not found";
						 status = "404";
						 logo ="https://wiki.openmrs.org/images/icons/profilepics/default.png";
						 displayName = divIDS;

						}
						$("#"+targetUser).append('<div class ="col-md-4"'+'>' +'<h2><img src='+logo + ">"+ displayName +'</h2>' + '</div>');
						$("#"+ targetUser).append('<div class ="col-md-4"'+">"+ '<h4>'+ info+'</h4>' + '</div>');
						$("#"+targetUser).append('<div class ="col-md-4"'+">"+ '<h4>'+ status+'</h4>' + '</div>');

						
						
					}

					

					

				});
			}

		});
	}

	$("#all").click( function() {
		$(".Online").show('slow');
		$(".Offline").show('slow');
	});

	$("#online").click( function() {
		$(".Online").show('slow');
		$(".Offline").hide('slow');
	});

	$("#offline").click( function() {
		$(".Offline").show('slow');
		$(".Online").hide('slow');
	});

	



});














