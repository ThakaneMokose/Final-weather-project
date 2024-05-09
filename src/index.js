function citySearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#form-city-input");
    let city = searchInput.value;
    
    let apiKey = "37f0fb1ca0e581f1bae6o2294b1tb475";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(display);
}

function display(response){
    let thisCity = document.querySelector("#city");
    let icon = document.querySelector("#current-icon");
    let description = document.querySelector("#current-description");
    let temperature = document.querySelector("#current-temp");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");

    thisCity.innerHTML = response.data.city;
    icon.innerHTML = `<img src=${response.data.condition.icon_url} alt=${response.data.condition.icon}>`;
    description.innerHTML = response.data.condition.description;
    temperature.innerHTML = Math.round(response.data.temperature.current);
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    wind.innerHTML = `${response.data.wind.speed}km/h`;

}

let cityInput = document.querySelector("#weather-form");
cityInput.addEventListener("submit", citySearch);

let city = "Maseru";
let apiKey = "37f0fb1ca0e581f1bae6o2294b1tb475";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios(apiUrl).then(display);

