import { getWeather } from "./http/http";
import {
  endpoint,
  endpointCoordOpenWeather
} from "./http/endpoints";
import { ELEMENTS } from "./view/elements";
import { renderCards } from "./view/views";
import "./view/effects.js";
import { saveToLocalStorage, getCardsFromLocalStorage } from "./localStorage";
import rain from "./img/rain.jpg";
import clear from "./img/clear-sky.png";
import clouds from "./img/clouds.jpg";

let cards = [];
myRefreshFunction()
  
getLocation();

const objBtn = {
  deleted: false
};

const setDeletedTrue = () => {
  objBtn.deleted = true;
};
const setDeletedFalse = () => {
  objBtn.deleted = false;
};

export { setDeletedTrue };

let userID = "default";
const { form, submit, loader, refresh } = ELEMENTS;

const changeUser = document.querySelector(".signOut");
changeUser.addEventListener("click", signOut);

function signOut() {
  let proceed = false;
  while (!proceed) {
    let promptResult = prompt("Enter your username");
    if (promptResult === "") {
      proceed = false;
      alert("Username can not be blank");
    } else if (promptResult === null) {
      cards = getCardsFromLocalStorage(userID) || [];

      if (cards.length !== 0) {
        renderCards(userID, cards);
      }
      proceed = true;
    } else {
      userID = promptResult;
      proceed = true;
    }
  }

  cards = getCardsFromLocalStorage(userID) || [];
  renderCards(userID, cards);

  if (cards === []) {
    saveToLocalStorage(userID, cards);
  }

  if (cards.length !== 0) {
    myRefresh();
  }

  if (userID !== "default") {
    changeUser.textContent = `${userID}`;

    changeUser.onmouseenter = function() {
      changeUser.textContent = "Change user";
    };

    changeUser.onmouseleave = function() {
      changeUser.textContent = `${userID}`;
    };
  }

  signOut.called = true;
}

const showMoreBtn = () => {
  const show = document.querySelector(".show-more");
  show.style.display = "block";
  show.addEventListener("click", () => {
    const containerHeight = document.querySelector(".cards-container")
      .offsetHeight;
    const cardsHeight = document.querySelector(".cards").offsetHeight;
    if (cardsHeight > containerHeight) {
      document.querySelector(
        ".cards-container"
      ).style.height = `${cardsHeight}px`;
      show.style.display = "none";
    }
  });
};

form.addEventListener("submit", function(e) {
  submitMe(e);
});

function submitMe(e) {
  e.preventDefault();
  myRefresh();
  const city = e.path[0].elements.cityName.value;

  const check = cards.find(card => {
    return card.name.toLowerCase() === city.trim().toLowerCase();
  });
  if (!city.trim()) {
    alert("please insert correct city name");
    return null;
  } else if (!!check) {
    alert("this city already exists, enter something new :)");
    return null;
  }
  const urlWeather = endpoint.getByCityName(city);

  fetchCity(urlWeather);

  document.getElementById("myForm").reset();
  submitMe.called = true;
  window.submitBtn = true;
}

refresh.addEventListener("click", myRefreshFunction);

function myRefreshFunction() {
  
  myRefresh();
  myRefreshFunction.called = true;
}

const secondsBetweenActions = 20;

let secondsRemaining = secondsBetweenActions;

setInterval(function() {
  updateStatus(secondsRemaining);
  secondsRemaining--;
  if (
    myRefreshFunction.called === true ||
    submitMe.called === true ||
    signOut.called === true ||
    objBtn.deleted
  ) {
    secondsRemaining = secondsBetweenActions;
    myRefreshFunction.called = false;
    submitMe.called = false;
    signOut.called = false;
    setDeletedFalse();
  }
  if (secondsRemaining <= 0) {
    myRefresh();
    secondsRemaining = secondsBetweenActions;
  }
}, 1000);

let enabled = true;
function updateStatus(timer) {
  if (enabled == true) {
    refresh.textContent = `Update in: ${timer}`;
  }
}

refresh.onmouseenter = function() {
  enabled = false;
  refresh.textContent = "Update now";
};

refresh.onmouseleave = function() {
  enabled = true;
};

function myRefresh() {
  cards = getCardsFromLocalStorage(userID);
  
  cards.forEach(card => {
    let city = card.name;
    const urlWeather = endpoint.getByCityName(city);
    fetchCity(urlWeather);
  });
  cards.length = 0;
  renderCards(userID, cards);
  getLocation();
}

const fetchCity = url => {
  submit.style.display = "none";
  loader.style.display = "flex";
  getWeather(url)
    .then(r => {
      loader.style.display = "none";
      submit.style.display = "inline-block";
      if (r.cod === "404") {
        throw new Error(r.message);
      }
      const date = new Date();
      const card = {
        ...r,
        id: date.getTime(),
        retrieved: `Updated on ${date.toLocaleString()}`
      };
      cards.push(card);
      renderCards(userID, cards);
      const containerHeight = document.querySelector(".cards-container")
        .offsetHeight;
      const cardsHeight = document.querySelector(".cards").offsetHeight;
      if (cardsHeight > containerHeight) {
        showMoreBtn();
      }
    })
    .catch(e => {
      console.log(e);
      alert("Your city was not found, please check the spelling");
    });
};

if (cards.length !== 0) {
  renderCards(userID, cards);
}

let latitude;
let longitude;

function getLocation() {
  navigator.geolocation.getCurrentPosition(SendLocation);
}

function SendLocation(data) {
  latitude = data.coords.latitude;
  longitude = data.coords.longitude;

  const urlCoord = endpointCoordOpenWeather.getByCoord(latitude, longitude);
  fetchCoord(urlCoord);
}

function fetchCoord(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      coordResult(result);
    })
    .catch(error => {
      console.log("klaida", error);
    });
}

const body = document.querySelector("body");

const icon = document.createElement("img");
icon.className = "currLocIcon";
document.querySelector(".currentInfo").appendChild(icon);

function coordResult(result) {
  const { main, weather, name, id } = result;
  let locCond = weather[0].main;
  let locTemp = main.temp;
  let locDesc = weather[0].description;
  let locCity = name;
  const iconCode = weather[0].icon;
  switch (locCond) {
    case "Rain":
      body.style.background = `url(${rain})`;

      body.style.backgroundSize = "cover";

      break;
    case "Clear":
      body.style.background = `url(${clear})`;

      body.style.backgroundSize = "cover";
      break;
    case "Clouds":
      body.style.background = `url(${clouds})`;

      body.style.backgroundSize = "cover";
      break;
  }

  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.textContent = `${Math.round(locTemp)} ℃`;
  let currentDesc = document.querySelector(".currentDesc");
  currentDesc.textContent = `${locDesc}`;

  icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let currentCity = document.querySelector(".currentCity");
  if (id === 6955406) {
    locCity = "Vilnius";
  }
  currentCity.textContent = `${locCity}:`;
}
