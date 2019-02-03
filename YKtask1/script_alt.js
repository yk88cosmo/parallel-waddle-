function getWeatherInfo(){
	console.log("Collecting...");
	var theInputBox = document.getElementById('query');
	var theInputValue = theInputBox.value;
	console.log(theInputValue);
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
	var apiID = "&APPID=YOUR-APP-ID";
	var searchURL = weatherURL + theInputValue + appID;
	
	$.getJSON(searchURL, function(data){
		console.log(data);
		var temperature = "???";
		if (data.cod === '404'){
			alert("Try again.");
			return;
		}
		console.log(data.main.temp);
		temperature = data.main.temp;
		var theResult = document.getElementById('weatherResults');
		theResult.innerHTML = "The temperature in " + theInputValue + " is " + temperature;
		}
	);
}

var theButton = document.getElementById('search');
theButton.onclick = getWeatherInfo;