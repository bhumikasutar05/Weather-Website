let searchBtn = document.querySelector(".btn");
let loc = document.querySelector("#location");

searchBtn.addEventListener("click", (e) => {
  //   console.log(loc.value);
  fetchWeatherData(loc.value);
});

async function fetchWeatherData(cityName) {
  try {
    let data = await window.fetch(`
      https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=53785d1a2aa1a3f909d777212c9fe507
`);

    let finalData = await data.json();
    let displayData = document.querySelector(".display-data");
    let displayTemp = document.querySelector(".display-temp");
    let displayLocation = document.querySelector(".display-location");
    let displaySpeed = document.querySelector(".display-speed");
    let displayHumidity = document.querySelector(".display-humidity");
    let icon = document.querySelector("#icon");

    if (finalData.cod == "404") {
      let dataDisappear = document.querySelectorAll(".inactive");

      [...dataDisappear].forEach((v, i) => {
        v.style.display = "none";
      });

      displayData.innerHTML =
        "Location is invalid.Please enter a valid Location";
      displayData.style.color = "red";
    } else {
      console.log(finalData);
      //   console.log(displayTemp);

      let { name, main, wind, weather } = finalData;
      displayTemp.innerHTML = parseInt(main.temp - 273.15) + "°C";
      displayLocation.innerHTML = name;
      displaySpeed.innerHTML = wind.speed + "km/hr";
      displayHumidity.innerHTML = main.humidity + "%";
      icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    }

    console.log(data);
  } catch (error) {
    console.log("Error");
  }
}
