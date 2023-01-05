
const divRef = document.createElement('div');
divRef.innerHTML = " <h3>Weather in Odessa:</h3>";
document.body.append(divRef);

fetch('http://api.openweathermap.org/data/2.5/weather?q=ODESSA&units=metric&APPID=5d066958a60d315387d9492393935c19')
	.then(response => response.json())
	.then(params => {

		console.log(params);

		const tempRef = document.createElement('p');
		tempRef.innerText = 'Temp(температура) = ' + params.main.temp;
		divRef.append(tempRef);

		const pressureRef = document.createElement('p');
		pressureRef.innerText = 'Pressure(давление) = ' + params.main.pressure;
		divRef.append(pressureRef);

		const descriptionRef = document.createElement('p');
		descriptionRef.innerText = 'Description(описание) = ' + params.weather[0].description;
		divRef.append(descriptionRef);

		const humidityRef = document.createElement('p');
		humidityRef.innerText = 'Humidity( влажность) = ' + params.main.humidity;
		divRef.append(humidityRef);

		const speedRef = document.createElement('p');
		speedRef.innerText = 'Speed( скорость ветра) = ' + params.wind.speed;
		divRef.append(speedRef);

		const degRef = document.createElement('p');
		degRef.innerText = 'Deg(направление в градусах) = ' + params.wind.deg;
		divRef.append(degRef);

		const iconRef = document.createElement('p');
		const img = document.createElement('img');
		img.src = 'http://openweathermap.org/img/w/01n.png';
		iconRef.innerText = 'Icon = ' + params.weather[0].icon ;
		iconRef.append(img);
		divRef.append(iconRef);
		iconRef.style = "display:flex";
		img.style = ' margin-top:-15px';
	})



