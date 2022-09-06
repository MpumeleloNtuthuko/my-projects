
// ====================================  Get elements  ====================================
const city = document.getElementById('cityy');
const showBtn = document.getElementById('getBtn');
const result = document.getElementById('result');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wspeed = document.getElementById('wspeed');
const hours = document.getElementById('hour');
const minutes = document.getElementById('minute');
const ampm = document.getElementById('ampm');
const day = document.getElementById('day');
const date = document.getElementById('daate');
const month = document.getElementById('month');
const forecast = document.getElementById('forecast');
const notification = document.querySelector('.alert');
const city_name = document.querySelector('.cityy');
const country_code = document.querySelector('.code');
const locate = document.querySelector('.alternative');
const title = document.querySelector('.title');
const reloadElement = document.querySelector('.reload');
const options = document.querySelector('.options');
const fields = document.querySelector('.input_search');
const API_KEY = 'ea92db489e3a5fcc7481aef067ebc954';
let weather = null;
let count = 0;

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

// ===========================  FUNCTION TO UPDATE TIME AND DATE  =============================== //
setTimeout(setInterval(() => {
    const currentDate = new Date();
    hours.innerHTML = currentDate.getHours() < 10 ? '0'+currentDate.getHours() : currentDate.getHours();
    minutes.innerHTML = currentDate.getMinutes() < 10 ? '0'+currentDate.getMinutes() : currentDate.getMinutes();
    ampm.innerHTML = currentDate.getHours() < 12 ? 'AM' : 'PM';
    day.innerHTML = days[currentDate.getDay()];
    date.innerHTML = currentDate.getDate();
    month.innerHTML = months[currentDate.getMonth()];
}, 0), 500)

// ============================= USING THE GIVEN COORDINATES TO FETCH WEATHER CONDITIONS ============================== //
const getData = async (lat, lon) => {
    const request_lat_lon = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const lat_lon_data = await request_lat_lon.json();

    weather = lat_lon_data;
    showResults();
}

// ============================= FUNCTION CALLED WHEN LOCATION BLOCKED ============================== //
const access_denied = () => {
    locate.innerHTML = "";
    result.innerHTML = "Sorry, your location is not known. Allow the site to get your location then try again or use the input fields.";
    reloadBtn();
}

// ============================= FUNCTION CALLED WHEN LOCATION IS SUCCESSFULY DETECTED ============================== //
const successCallback = async data => {
    title.innerHTML = "";
    fields.innerHTML = "";
    options.innerHTML = "";
    result.innerHTML = `<div class="loader"></div>
    <div class="loader_text">Fetching weather conditions for your area...`
    setTimeout(() => {if (data.length === 0) {
        result.innerHTML = "Oops! It seems like your area is out of reach, it could not be found. "
    }
    else {
        const {latitude, longitude} = data.coords;
        getData(latitude, longitude);
    }}, 3000);
}

// ============================= FUNCTION CALLED WHEN LOCATION DETECTION FAILS ============================== //
const errCallback = () => {
    result.innerHTML = "Sorry, your location is not known. Allow the site to get your location then try again or use the input fields.";
    
    reloadBtn();
}

const showResults = () => {
    if (city_name.value !== "") {
        result.innerHTML = "";
        title.innerHTML = "";
        const {temp, humidity} = weather.main;
        const {speed} = weather.wind;
        const sky_details = weather.weather[0];
        result.innerHTML = `<p class="results_msg">The area found, closest to the one you searched for is:</p>
                            <div class="location">
                                <img src="media/location_icon.png" class="loc_icon">
                                <h3 class="city">${weather.name}, ${weather.sys.country}</h3>
                            </div>
                            <h1><span class="temp" id="temperature">${temp}</span><span class="degrees">&deg;C</span></h1>
                            <h4 class="forecast" id="forecast">${sky_details.description}</h4>
                            <div class="humid_wspeed">
                                <p class="humidity">Humidity: <span id="humidity">${humidity}</span>%</p>
                                <p class="wspeed">Wind Speed: <span id="wspeed">${speed}</span>km/h</p>
                            </div>`
        locate.innerHTML = ""; 
        reloadBtn();
    }
    else {
        result.innerHTML = "";
        title.innerHTML = "";
        const {temp, humidity} = weather.main;
        const {speed} = weather.wind;
        const sky_details = weather.weather[0];
        result.innerHTML = `<p class="results_msg">Showing weather conditions for:</p>
                            <div class="location">
                                <img src="media/location_icon.png" class="loc_icon">
                                <h3 class="city">${weather.name}, ${weather.sys.country}</h3>
                            </div>
                            <h1 class="temp"><span id="temperature">${temp}</span><span class="degrees">&deg;C</span></h1>
                            <h4 class="forecast" id="forecast">${sky_details.description}</h4>
                            <div class="humid_wspeed">
                                <p class="humidity">Humidity: <span id="humidity">${humidity}</span>%</p>
                                <p class="wspeed">Wind Speed: <span id="wspeed">${speed}</span>km/h</p>
                            </div>`
        locate.innerHTML = "";
        reloadBtn();
    }
}

const reload = () => {
    window.location.reload();
}

const reloadBtn = () => {
    const rBtn = '<button class="clearBtn" onclick="reload()">Clear</button>'
    reloadElement.innerHTML = rBtn;
}

const getWeather = async () => {
    if (city_name.value !== "" && country_code.value !== "") {
            result.innerHTML = "";
            reloadElement.innerHTML = "";
            const request_city = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name.value},${country_code}&appid=${API_KEY}`)
            const city_data = await request_city.json();

            if (city_data.length === 0) {
                result.innerHTML = "Oops! The area you searched for could not be found. "
            }
            else {
                title.innerHTML = "";
                fields.innerHTML = "";
                options.innerHTML = "";
                result.innerHTML = `<div class="loader"></div>
                                    <div class="loader_text">Fetching weather conditions for ${city_name.value}...`
                setTimeout(() => {const {lat, lon} = city_data[0];
                getData(lat, lon);}, 3000);
            }
    }
    else {
        title.innerHTML = "Get weather conditions"
        result.innerHTML = "Please enter a city name along with the country code!";
    }
}

const getLocation = () => {
    locate.innerHTML = "";
    result.innerHTML = `<div>Waiting for response...`
    navigator.geolocation.getCurrentPosition(successCallback, errCallback);
}

showBtn.addEventListener('click', getWeather);
locate.addEventListener('click', getLocation);