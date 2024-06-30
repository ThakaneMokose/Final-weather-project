function citySearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#form-city-input");
    let city = searchInput.value;
    
    let apiKey = "37f0fb1ca0e581f1bae6o2294b1tb475";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(display);
    axios(apiForcast).then(getForcast);

}

function display(response){
    let thisCity = document.querySelector("#city");
    let icon = document.querySelector("#current-icon");
    let description = document.querySelector("#current-description");
    let temperature = document.querySelector("#current-temp");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");

    thisCity.innerHTML = response.data.city;
    icon.innerHTML = `<img src=${response.data.condition.icon_url} alt=${response.data.condition.icon}  class="current-icon">`;
    description.innerHTML = response.data.condition.description;
    temperature.innerHTML = Math.round(response.data.temperature.current);
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    let dayTime= document.querySelector("#current-date");
    let today = new Date(response.data.time * 1000);
    dayTime.innerHTML= displayDay(today);
}

function displayDay(date){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (hour < 10) {
        hour=`0${hour}`
    }
    if (minute < 10) {
        minute = `0${minute}`        
    }
    
    let results= `${day}, ${hour}:${minute}`;
    return results
}
function getForcast(response){

    let forecastWeather = "";

    for (let i = 0; i < 4; i++) {

        let today = new Date(response.data.daily[i].time * 1000);
        let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        
        forecastWeather += `<div class="forcast-day-weather">
                <p class="forcast-day">${days[today.getDay()]}</p>
                <div class="forcast-icon"><img src=${response.data.daily[i].condition.icon_url} alt=${response.data.daily[i].condition.icon}></div>
                <div class="weather-maximum-minimum">
                    <span class="maximum">
                        <span class="material-symbols-outlined">
                            arrow_drop_up
                        </span >${ Math.round(response.data.daily[i].temperature.maximum)}</span>
                        <span class="minimum"><span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>${Math.round(response.data.daily[i].temperature.minimum)}</span>
                </div>
            </div>`;        
    }
    let finalForcast = document.querySelector("#forcast-weather");
    finalForcast.innerHTML = forecastWeather;
}

let cityInput = document.querySelector("#weather-form");
cityInput.addEventListener("submit", citySearch);

let city = "Maseru";
let apiKey = "37f0fb1ca0e581f1bae6o2294b1tb475";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
let apiForcast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`

axios(apiUrl).then(display);
axios(apiForcast).then(getForcast);
