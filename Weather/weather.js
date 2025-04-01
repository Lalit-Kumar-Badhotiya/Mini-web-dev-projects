
const apiKey = '8d6454a89dff871786a0307b0dbebbee' //Api key should not be hard coded in the code it should be in envirnment variables (.env)
async function fetchWeatherData(city) {
    try {const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");}
        const data = await response.json();
        console.log(data);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);}}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i")
function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;}
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");
formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";}});
function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",};
    return iconMap[weatherCondition] || "help";}
