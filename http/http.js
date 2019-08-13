const getWeather = (url) => {
    return fetch(url)
      .then(r => r.json())
  };
  
  
  export { getWeather };
  
  