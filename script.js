document
  .getElementById("weatherSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "") return;
    console.log(value);
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      value +
      ",US&units=imperial" +
      "&APPID=e7943d4407bf46919baafb77f52f78f5";
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        let results = "";
        results += "<h1>Current Weather in " + json.name + "</h1>";
        results += "<div class='currentWeatherCard'>";
        results += "<div class='currentWeatherCardInfo'>";
        results += "<h2>" + json.name + ", " + json.sys.country + "</h2><br>";
        console.log(json);
        results += "<h4>Temperature: " + json.main.temp + " &deg;F</h4>";
        results += "<h4>Feels like: " + json.main.feels_like + " &deg;F</h4>";
        results += "<h4>Humidity: " + json.main.humidity + "%</h4>";
        results += "<h4>Wind Speed: " + json.wind.speed + " mph</h4>";
        results += "<h4>Wind Direction: " + json.wind.deg + " &deg;</h4>";
        results += "<h4>Clouds: " + json.clouds.all + "%</h4>";
        results += "<h4>Pressure: " + json.main.pressure + " hPa</h4>";
        results += "<h4>Visibility: " + json.visibility + " meters</h4>";
        results +=
          "<h4>Coordinates: " +
          json.coord.lon +
          ", " +
          json.coord.lat +
          "</h4>";
        results += "</div>";
        results += "<div class='currentWeatherCardIcon'>";
        for (let i = 0; i < json.weather.length; i++) {
          results +=
            '<img src="http://openweathermap.org/img/w/' +
            json.weather[i].icon +
            '.png"/>';
          results +=
            "<h4 style='text-align:center'>" +
            json.weather[i].description +
            "</h4>";
        }
        results += "</div></div>";
        document.getElementById("weatherResults").innerHTML = results;
      });
    const url2 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      value +
      ", US&units=imperial" +
      "&APPID=e7943d4407bf46919baafb77f52f78f5";
    fetch(url2)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        let forecast = "";
        forecast += "<div class='fiveDay'><h1>5-Day Forecast:</h1></div>";
        forecast += "<div class='row'>";
        let day = json.list[0].dt_txt.toString();
        forecast += "<div class='day'>";
        for (let i = 0; i < json.list.length; i++) {
          let dateString = json.list[i].dt_txt.toString();
          let date = dateString.split(/\s(.+)/)[0]; //everything before the first space
          let time = dateString.split(/\s(.+)/)[1]; //everything after the first space
          console.log(date);
          if (date !== day) {
            forecast +=
              "</div><div class='dateHeader'><h2>" +
              moment(date).format("MMM Do YYYY") +
              "</h2></div><div class='day'>";
            console.log("new day: " + date);
          }
          forecast += "<div class='card'>";
          forecast += "<h2>" + time + "</h2>";
          forecast +=
            '<img class="card-img-top" src="https://openweathermap.org/img/w/' +
            json.list[i].weather[0].icon +
            '.png"/>';
          forecast += "<p>";
          for (let i = 0; i < json.list[i].weather.length; i++) {
            forecast += json.list[i].weather[i].description;
            if (i !== json.list[i].weather.length - 1) results += ", ";
          }
          forecast += "</p>";
          forecast +=
            "<p class='card-text'>Temperature: " +
            json.list[i].main.temp +
            " &deg;F<br>";
          forecast +=
            "Feels Like: " + json.list[i].main.feels_like + " &deg;F<br>";
          forecast += "Humidity: " + json.list[i].main.humidity + "%<br>";
          forecast += "Wind Speed: " + json.list[i].wind.speed + "mph<br>";
          forecast += "</div>";
          day = date;
        }
        forecast += "</div></div>";
        forecast = forecast.replace("<div class='day'></div>", "");
        document.getElementById("forecastResults").innerHTML = forecast;
      });
  });
