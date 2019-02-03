//"b242508ece89277b9f5565d1841683c9"app"&units=imperial&APPID=b242508ece89277b9f5565d1841683c9"
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=9af9987d0f66079a5baa5b00f7f58162';
function createHTML(cityName, tempValue){
	var bgClass;
	if (Math.max(Math.round(tempValue-32)/1.8).toFixed(1) >= 50){
		bgClass = 'redBg';
		document.getElementById('validMsg').innerHTML = 'Very hot';//Math.max( Math.round(number * 10) / 10, 2.8 ).toFixed(1);
	}
	else if (Math.max(Math.round(tempValue-32)/1.8).toFixed(1) < 50 && Math.max(Math.round(tempValue-32)/1.8).toFixed(1) >= 40){
		bgClass = 'orangeBg';
		document.getElementById('validMsg').innerHTML = 'Hot';
	}
	else if (Math.max(Math.round(tempValue-32)/1.8).toFixed(1) < 40 && Math.max(Math.round(tempValue-32)/1.8).toFixed(1) >= 30){
		bgClass = 'yellowBg';
		document.getElementById('validMsg').innerHTML = 'Sunny';
	}
	else if (Math.max(Math.round(tempValue-32)/1.8).toFixed(1) < 30 && Math.max(Math.round(tempValue-32)/1.8).toFixed(1) >= 20){
		bgClass = 'greenBg';
		document.getElementById('validMsg').innerHTML = 'Normal';
	}
	else if (Math.max(Math.round(tempValue-32)/1.8).toFixed(1) < 20 && Math.max(Math.round(tempValue-32)/1.8).toFixed(1) >= 10){
		bgClass = 'blueBg';
		document.getElementById('validMsg').innerHTML = 'Rainy';
	}
	else{
		bgClass = 'grayBg';
		document.getElementById('validMsg').innerHTML = 'Heavy rains';
	}
	var htmlString ='<div class="setBorder ' + bgClass + '">' + '<div class="weatherCity">' + cityName + '</div>' + '<div class="weatherData">' + Math.max(Math.round(tempValue-32)/1.8).toFixed(1) + '°C</div>' + '</div>';
	$('#weatherResults').prepend(htmlString);
}
var searchWeather = function(city){
	var searchURL = weatherBaseURL + city + weatherQueryParams;
	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("We got problems");
			console.log(data.status);
			alert("Oops. Something went wrong...");
		},
		success: function(data){
			console.log("Successful");
			console.log(data);
			if (data.cod === '404'){
				alert("Error. Try again.");
				return;
			}
			$("#query").val('');
			var theCity = data.name || '????';
			var theTemp = Math.round(data.main.temp) || 70;
			createHTML(theCity, theTemp);
		}
	});
};

$(document).ready(function(){
	console.log("Loaded!");
	$("#search").on('click', function(){
		console.log("Clicked search");
		var newSearchTerm = $("#query").val();
		console.log(newSearchTerm);
		searchWeather(newSearchTerm);
		$("#search").blur();
	});
	$('#query').on('keypress', function(e){
		if (e.which == 13){
			$("#search").trigger('click');
		}
	});
});