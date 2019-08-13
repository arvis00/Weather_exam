const weatherId = '790dff15e5ecdde73da819196a127634';
const units = 'metric';
const gifId = '6LkxF8Jv5CrI70LWPSHapYnfCiU40Hfh'

const endpoint = {
  getByCityName: function(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${weatherId}`

  }
}

const endpointCoord = {
    getByCoord: function(lat, lon) {
        return `http://api.apixu.com/v1/current.json?key=28bc2236ab0f460895190244190808&q=${lat},${lon}`
    
      }    
}

const endpointCoordOpenWeather = {
    getByCoord: function(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${weatherId}`
    
      }    
}

const gifEndpoint = {
    getByWeatherCondition: function(condition) {
return `http://api.giphy.com/v1/gifs/random?api_key=${gifId}&tag=${condition}`
    }
}

const gifStaticEndpoint = {
    getByWeatherCondition: function(condition) {
    return `http://api.giphy.com/v1/stickers/random?api_key=${gifId}&tag=${condition}`
    }
}

const forecastEndpoint = {
    getByCityName: function(city){
        return `http://api.apixu.com/v1/forecast.json?key=28bc2236ab0f460895190244190808&q=${city}&days=7`
    }
}

export {endpoint, gifEndpoint ,gifStaticEndpoint, forecastEndpoint, endpointCoord, endpointCoordOpenWeather}

