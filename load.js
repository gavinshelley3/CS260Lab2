document.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  main();
});

function main() {
  let majorCities = ["Los Angeles", "New York", "Chicago", "Atlanta", "Dallas"];
  let row = document.createElement("div");
  row.className = "row";
  row.id = "row";
  let bigCityWeatherHeader = document.createElement("h1");
  bigCityWeatherHeader.innerHTML = "Big City Weather";
  let day = document.createElement("div");
  day.className = "day";
  day.id = "day";
  let element = "weatherResults";
  row.appendChild(bigCityWeatherHeader);
  row.appendChild(day);
  document.getElementById(element).appendChild(row);
  element = "day";
  getWeather(majorCities, element, 0);
}

async function getWeather(majorCities, element, i) {
  try {
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      majorCities[i] +
      ",US&units=imperial" +
      "&APPID=e7943d4407bf46919baafb77f52f78f5";
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    let results = "";
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    results += "<h2>" + json.name + "</h2>";
    results +=
      '<img class="card-img-top" src="https://openweathermap.org/img/w/' +
      json.weather[0].icon +
      '.png"/>';
    results += "<h4>Temperature: " + json.main.temp + " &deg;F</h4>";
    results += "<h4>Feels like: " + json.main.feels_like + " &deg;F</h4>";
    results += "<h4>Humidity: " + json.main.humidity + "%</h4>";
    results += "<h4>Wind Speed: " + json.wind.speed + " mph</h4>";
    results += "</div>";
    console.log(results);
    if (i < majorCities.length - 1) {
      card.innerHTML = results;
      document.getElementById(element).appendChild(card);
      i++;
      getWeather(majorCities, element, i);
    } else {
      results += "</div></div>";
      card.innerHTML = results;
      document.getElementById(element).appendChild(card);
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
