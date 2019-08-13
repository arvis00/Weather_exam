const weatherId = "790dff15e5ecdde73da819196a127634";
const units = "metric";
const gifId = "6LkxF8Jv5CrI70LWPSHapYnfCiU40Hfh";

const endpoint = {
  getByCityName: function(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherId}`;
  }
};

const endpointCoordOpenWeather = {
  getByCoord: function(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${weatherId}`;
  }
};

const gifEndpoint = {
  getByWeatherCondition: function(condition) {
    return `http://api.giphy.com/v1/gifs/random?api_key=${gifId}&tag=${condition}`;
  }
};

const gifStaticEndpoint = {
  getByWeatherCondition: function(condition) {
    return `http://api.giphy.com/v1/stickers/random?api_key=${gifId}&tag=${condition}`;
  }
};

const forecastEndpoint = {
  getByCityName: function(city) {
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${weatherId}`;
  }
};

export {
  endpoint,
  gifEndpoint,
  gifStaticEndpoint,
  forecastEndpoint,
  endpointCoordOpenWeather
};
