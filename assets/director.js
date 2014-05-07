var socket = io.connect('http://performotron.ngrok.com');

socket.on('clearSpeeches', function (data)
{
	$("#artemisSpeech").html('');
	$("#zeffSpeech").html('');
	$("#narration").html('');
});

socket.on('clearChoices', function (data)
{
	$("#artemisChoices").html('');
	$("#zeffChoices").html('');
});

socket.on('updateArtemisSpeech', function (data)
{
	$("#artemisSpeech").append(data.line);
});

socket.on('updateZeffSpeech', function (data)
{
	$("#zeffSpeech").append(data.line);
});

socket.on('updateArtemisChoices', function (data)
{
	nextLine = $('<a />',
	{
		href: data.leadsTo,
		text: data.line,
		id: data.leadsTo
	});

	$("#artemisChoices").append(nextLine);
	$("#artemisChoices").append("<p/>");

	$("#"+data.leadsTo).click(function(event)
	{
		clickChoice(event, $(this).attr("id"));
	});
});

socket.on('updateZeffChoices', function (data)
{
	nextLine = $('<a />',
	{
		href: data.leadsTo,
		text: data.line,
		id: data.leadsTo
	});

	$("#zeffChoices").append(nextLine);
	$("#zeffChoices").append("<p/>");

	$("#"+data.leadsTo).click(function(event)
	{
		clickChoice(event, $(this).attr("id"));
	});
});

socket.on('updateNarration', function (data)
{
	$("#narration").append(data.line);
});

socket.on('updateMusic', function (data)
{
	$("#band").html('');
	$("#band").append(data.line);
});

socket.on('updateBackgroundButton', function (data)
{
	if (data.yay)
	{
		$("#backgroundEventButton").css("background", "#ffbf4d");
		$("#backgroundEventButton").css("cursor", "pointer");
	}
	else
	{
		$("#backgroundEventButton").css("background", "#7f5d20");
		$("#backgroundEventButton").css("cursor", "default");
	}
});

socket.on('updateWeirdness', function (data)
{
	$("#weirdnessLevelButton").html('');
	$("#weirdnessLevelButton").append("WEIRD-NESS LEVEL = "+data.weirdnessLevel);
});

$("#nextButton").click(function()
{
	socket.emit("clickNext");
});

$("#backgroundEventButton").click(function()
{
	socket.emit("clickBackground");
});

$("#weirdnessLevelButton").click(function()
{
	socket.emit("clickWeirdness");
});

$("#resetButton").click(function()
{
	socket.emit("clickReset");
});

function clickChoice(e, speech)
{
    e.preventDefault();
    
    socket.emit("clickChoice", { speech: speech });
}