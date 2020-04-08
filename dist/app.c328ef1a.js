// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"http/http.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeather = void 0;

var getWeather = function getWeather(url) {
  return fetch(url).then(function (r) {
    return r.json();
  });
};

exports.getWeather = getWeather;
},{}],"http/endpoints.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpointCoordOpenWeather = exports.forecastEndpoint = exports.gifStaticEndpoint = exports.gifEndpoint = exports.endpoint = void 0;
var weatherId = "790dff15e5ecdde73da819196a127634";
var units = "metric";
var gifId = "6LkxF8Jv5CrI70LWPSHapYnfCiU40Hfh";
var endpoint = {
  getByCityName: function getByCityName(city) {
    return "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=").concat(units, "&appid=").concat(weatherId);
  }
};
exports.endpoint = endpoint;
var endpointCoordOpenWeather = {
  getByCoord: function getByCoord(lat, lon) {
    return "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&units=").concat(units, "&appid=").concat(weatherId);
  }
};
exports.endpointCoordOpenWeather = endpointCoordOpenWeather;
var gifEndpoint = {
  getByWeatherCondition: function getByWeatherCondition(condition) {
    return "http://api.giphy.com/v1/gifs/random?api_key=".concat(gifId, "&tag=").concat(condition);
  }
};
exports.gifEndpoint = gifEndpoint;
var gifStaticEndpoint = {
  getByWeatherCondition: function getByWeatherCondition(condition) {
    return "http://api.giphy.com/v1/stickers/random?api_key=".concat(gifId, "&tag=").concat(condition);
  }
};
exports.gifStaticEndpoint = gifStaticEndpoint;
var forecastEndpoint = {
  getByCityName: function getByCityName(city) {
    return "http://api.openweathermap.org/data/2.5/forecast?q=".concat(city, "&units=").concat(units, "&appid=").concat(weatherId);
  }
};
exports.forecastEndpoint = forecastEndpoint;
},{}],"view/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ELEMENTS = void 0;
var ELEMENTS = {
  output: document.querySelector(".cards"),
  form: document.querySelector(".controller"),
  submit: document.querySelector('[type="submit"]'),
  loader: document.querySelector(".loading"),
  containerHeight: document.querySelector(".cards-container"),
  cardsHeight: document.querySelector(".cards"),
  refresh: document.querySelector(".refresh")
};
exports.ELEMENTS = ELEMENTS;
},{}],"localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardsFromLocalStorage = exports.saveToLocalStorage = void 0;

var saveToLocalStorage = function saveToLocalStorage(userID, cards) {
  var arrJson = JSON.stringify(cards);
  localStorage.setItem(userID, arrJson);
};

exports.saveToLocalStorage = saveToLocalStorage;

var getCardsFromLocalStorage = function getCardsFromLocalStorage(userID) {
  return localStorage.getItem(userID) ? JSON.parse(localStorage.getItem(userID)) : [];
};

exports.getCardsFromLocalStorage = getCardsFromLocalStorage;
},{}],"view/views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCards = void 0;

var _elements = require("./elements");

var _localStorage = require("/localStorage");

var _endpoints = require("/http/endpoints");

var _app = require("/app");

var output = _elements.ELEMENTS.output;

var renderCards = function renderCards(userID, cards) {
  output.innerHTML = "";
  cards.forEach(function (card) {
    var main = card.main,
        weather = card.weather,
        name = card.name;
    var weatherCond = weather[0].main;

    if (weatherCond === "Clear") {
      weatherCond = "Sky";
    }

    var gifUrl = _endpoints.gifEndpoint.getByWeatherCondition(weatherCond);

    var forecastUrl = _endpoints.forecastEndpoint.getByCityName(name);

    var date = new Date();
    var template = "\n    <div class='singleCont".concat(card.id, "'>\n        <div class='singleCard").concat(card.id, "' id='singleCard'>\n            <h2><span>").concat(card.name, "</span></h2>\n            <p><span>Temperature: ").concat(Math.round(main.temp), " &#8451;</span></p>\n            <p><span>Feels like: ").concat(Math.round(main.feels_like), " &#8451;</span></p>\n            <p><span>Description: ").concat(weather[0].description, "</span></p>\n            <p><span>Humidity: ").concat(main.humidity, "%</span></p>\n            <p><span>").concat(card.retrieved, "</span></p>\n        </div>\n        <button class=delete").concat(card.id, ">\n            <span class=\"line\"></span>\n            <span class=\"line\"></span>\n        </button>\n        <div class=\"overlay").concat(card.id, "\">\n        <h1>See the forecast</h1>\n        </div>\n    </div>\n    ");
    output.insertAdjacentHTML("afterbegin", template);
    var singleCard2 = document.querySelector("[class^='singleCard']");
    var singleCont = document.querySelector("[class^='singleCont']");
    var overlay = document.querySelector("[class^='overlay']");
    var overlayText = document.querySelector("[class^='overlay'] h1");
    var deleteBtn = document.querySelector(".delete".concat(card.id));
    overlay.style.width = "249px";
    overlay.style.padding = "18px";
    overlay.style.margin = "6px";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.bottom = "0";
    overlay.style.background = "rgba(12, 98, 226, 0.678)";
    overlay.style.opacity = "0";
    overlay.style.transition = ".3s all";
    overlay.style.borderRadius = "12px";

    singleCont.onmouseenter = function () {
      singleCard2.style.filter = "blur(2px)";
      overlay.style.opacity = "1";
      deleteBtn.style.display = "block";
    };

    singleCont.onmouseleave = function () {
      singleCard2.style.filter = "blur(0px)";
      overlay.style.opacity = "0";
      deleteBtn.style.display = "none";
    };

    deleteBtn.onmouseenter = function () {
      overlay.style.background = "rgba(245, 4, 4, 0.678)";
      overlayText.textContent = "Remove city";
    };

    deleteBtn.onmouseleave = function () {
      overlay.style.background = "rgba(12, 98, 226, 0.678)";
      overlayText.textContent = "See the forecast";
    };

    fetchGif(gifUrl); // saveToLocalStorage(userID, cards);

    deleteBtn.addEventListener("click", function () {
      deleteCard();
    });

    function deleteCard() {
      cards = cards.filter(function (item) {
        return item.id !== card.id;
      });
      (0, _app.setDeletedTrue)();
      window.deletedBtn = true;
      (0, _localStorage.saveToLocalStorage)(userID, cards);
      renderCards(userID, cards);
    }

    function fetchGif(url) {
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (result) {
        gifResult(result);
      }).catch(function (error) {
        console.log("klaida", error);
      });
    }

    function gifResult(finalResult) {
      var gifUrlResult = finalResult.data.images.fixed_height_small.url;
      var urlString = "url('".concat(gifUrlResult, "')");
      var singleCard = document.querySelector(".singleCard".concat(card.id));
      singleCard.style.backgroundImage = urlString;
      singleCard.style.backgroundSize = "cover";
      singleCard.style.backgroundRepeat = "no-repeat";
    }

    var pressOverlay = document.querySelector(".overlay".concat(card.id));
    pressOverlay.addEventListener("click", function () {
      fetchForecast(forecastUrl);
    });

    function fetchForecast(url) {
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (result) {
        forecastResult(result);
      }).catch(function (error) {
        console.log("klaida", error);
      });
    }

    function forecastResult(result) {
      console.log(result);
      var list = result.list;
      list.splice(0, 1);

      var dayOfWeek = function dayOfWeek(dayNumber, timeStampId) {
        dayNumber != undefined ? timeStampId = listChunks[dayNumber][0].dt : timeStampId;
        var a = new Date(timeStampId * 1000);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dayOfWeek = days[a.getDay()];
        return dayOfWeek;
      };

      var listChunks = list.reduce(function (result, value, index) {
        if (!index || dayOfWeek(undefined, result[result.length - 1][0].dt) !== dayOfWeek(undefined, value.dt)) {
          return result.concat([[value]]);
        }

        result[result.length - 1].push(value);
        return result;
      }, []);
      console.log(listChunks);

      var forecastTemp = function forecastTemp(dayNumber) {
        var temp = Math.round(listChunks[dayNumber].reduce(function (result, value) {
          return result + value.main.temp;
        }, 0) / listChunks[dayNumber].length);
        return temp;
      };

      var dayIcon = function dayIcon(dayNumber) {
        var iconCode;
        listChunks[dayNumber].forEach(function (threeHours) {
          var a = new Date(threeHours.dt_txt);
          var hour = a.getHours();

          if (hour === 12) {
            iconCode = threeHours.weather[0].icon;
          }
        });

        if (!iconCode) {
          iconCode = listChunks[dayNumber][listChunks[dayNumber].length - 1].weather[0].icon;
        }

        return "http://openweathermap.org/img/wn/".concat(iconCode, "@2x.png");
      };

      var dayDescr = function dayDescr(dayNumber) {
        var desc;
        listChunks[dayNumber].forEach(function (threeHours) {
          var a = new Date(threeHours.dt_txt);
          var hour = a.getHours();

          if (hour === 12) {
            desc = threeHours.weather[0].description;
          }
        });

        if (!desc) {
          desc = listChunks[dayNumber][listChunks[dayNumber].length - 1].weather[0].description;
        }

        return desc;
      };

      var templateForecast = "\n        <div id=\"myModal\" class=\"modal\">\n            <div class=\"modal-content\">\n                <span class=\"close\">&times;</span>\n                <h2>Weather forecast</h2>\n                <div class='daysList'>\n                    <div>\n                        <p>".concat(dayOfWeek(0), "</p>\n                        <img src=").concat(dayIcon(0), ">\n                        <p>").concat(forecastTemp(0), "&#8451;</p>\n                        <p>").concat(dayDescr(0), "</p>\n                    </div>\n                    <div>\n                        <p>").concat(dayOfWeek(1), "</p>\n                        <img src=").concat(dayIcon(1), ">\n                        <p>").concat(forecastTemp(1), "&#8451;</p>\n                        <p>").concat(dayDescr(1), "</p>\n                    </div>\n                    <div>\n                        <p>").concat(dayOfWeek(2), "</p>\n                        <img src=").concat(dayIcon(2), ">\n                        <p>").concat(forecastTemp(2), "&#8451;</p>\n                        <p>").concat(dayDescr(2), "</p>\n                    </div>\n                    <div>\n                        <p>").concat(dayOfWeek(3), "</p>\n                        <img src=").concat(dayIcon(3), ">\n                        <p>").concat(forecastTemp(3), "&#8451;</p>\n                        <p>").concat(dayDescr(3), "</p>\n                    </div>\n                    <div>\n                        <p>").concat(dayOfWeek(4), "</p>\n                        <img src=").concat(dayIcon(4), ">\n                        <p>").concat(forecastTemp(4), "&#8451;</p>\n                        <p>").concat(dayDescr(4), "</p>\n                    </div>\n                </div>    \n            </div>\n        </div>\n        ");
      output.insertAdjacentHTML("afterend", templateForecast);
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";

      span.onclick = function () {
        modal.style.display = "none";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  });
  (0, _localStorage.saveToLocalStorage)(userID, cards);
};

exports.renderCards = renderCards;
},{"./elements":"view/elements.js","/localStorage":"localStorage.js","/http/endpoints":"http/endpoints.js","/app":"app.js"}],"view/effects.js":[function(require,module,exports) {
var nav = document.querySelector("nav");
var portfolio = document.querySelector(".portfolio");
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    nav.style.height = "50px";
  } else {
    nav.style.height = "60px";
  }
});
},{}],"img/rain.jpg":[function(require,module,exports) {
module.exports = "/rain.8aae424f.jpg";
},{}],"img/clear-sky.png":[function(require,module,exports) {
module.exports = "/clear-sky.22376a6c.png";
},{}],"img/clouds.jpg":[function(require,module,exports) {
module.exports = "/clouds.ddf9b938.jpg";
},{}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDeletedTrue = void 0;

var _http = require("./http/http");

var _endpoints = require("./http/endpoints");

var _elements = require("./view/elements");

var _views = require("./view/views");

require("./view/effects.js");

var _localStorage = require("./localStorage");

var _rain = _interopRequireDefault(require("./img/rain.jpg"));

var _clearSky = _interopRequireDefault(require("./img/clear-sky.png"));

var _clouds = _interopRequireDefault(require("./img/clouds.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cards = [];
myRefreshFunction();
getLocation();
var objBtn = {
  deleted: false
};

var setDeletedTrue = function setDeletedTrue() {
  objBtn.deleted = true;
};

exports.setDeletedTrue = setDeletedTrue;

var setDeletedFalse = function setDeletedFalse() {
  objBtn.deleted = false;
};

var userID = "default";
var form = _elements.ELEMENTS.form,
    submit = _elements.ELEMENTS.submit,
    loader = _elements.ELEMENTS.loader,
    refresh = _elements.ELEMENTS.refresh;
var changeUser = document.querySelector(".signOut");
changeUser.addEventListener("click", signOut);

function signOut() {
  var proceed = false;

  while (!proceed) {
    var promptResult = prompt("Enter your username");

    if (promptResult === "") {
      proceed = false;
      alert("Username can not be blank");
    } else if (promptResult === null) {
      cards = (0, _localStorage.getCardsFromLocalStorage)(userID) || [];

      if (cards.length !== 0) {
        (0, _views.renderCards)(userID, cards);
      }

      proceed = true;
    } else {
      userID = promptResult;
      proceed = true;
    }
  }

  cards = (0, _localStorage.getCardsFromLocalStorage)(userID) || [];
  (0, _views.renderCards)(userID, cards);

  if (cards === []) {
    (0, _localStorage.saveToLocalStorage)(userID, cards);
  }

  if (cards.length !== 0) {
    myRefresh();
  }

  if (userID !== "default") {
    changeUser.textContent = "".concat(userID);

    changeUser.onmouseenter = function () {
      changeUser.textContent = "Change user";
    };

    changeUser.onmouseleave = function () {
      changeUser.textContent = "".concat(userID);
    };
  }

  signOut.called = true;
}

var showMoreBtn = function showMoreBtn() {
  var show = document.querySelector(".show-more");
  show.style.display = "block";
  show.addEventListener("click", function () {
    var containerHeight = document.querySelector(".cards-container").offsetHeight;
    var cardsHeight = document.querySelector(".cards").offsetHeight;

    if (cardsHeight > containerHeight) {
      document.querySelector(".cards-container").style.height = "".concat(cardsHeight, "px");
      show.style.display = "none";
    }
  });
};

form.addEventListener("submit", function (e) {
  submitMe(e);
});

function submitMe(e) {
  e.preventDefault();
  myRefresh();
  var city = e.path[0].elements.cityName.value;
  var check = cards.find(function (card) {
    return card.name.toLowerCase() === city.trim().toLowerCase();
  });

  if (!city.trim()) {
    alert("please insert correct city name");
    return null;
  } else if (!!check) {
    alert("this city already exists, enter something new :)");
    return null;
  }

  var urlWeather = _endpoints.endpoint.getByCityName(city);

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

var secondsBetweenActions = 20;
var secondsRemaining = secondsBetweenActions;
setInterval(function () {
  updateStatus(secondsRemaining);
  secondsRemaining--;

  if (myRefreshFunction.called === true || submitMe.called === true || signOut.called === true || objBtn.deleted) {
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
var enabled = true;

function updateStatus(timer) {
  if (enabled == true) {
    refresh.textContent = "Update in: ".concat(timer);
  }
}

refresh.onmouseenter = function () {
  enabled = false;
  refresh.textContent = "Update now";
};

refresh.onmouseleave = function () {
  enabled = true;
};

function myRefresh() {
  cards = (0, _localStorage.getCardsFromLocalStorage)(userID);
  cards.forEach(function (card) {
    var city = card.name;

    var urlWeather = _endpoints.endpoint.getByCityName(city);

    fetchCity(urlWeather);
  });
  cards.length = 0;
  (0, _views.renderCards)(userID, cards);
  getLocation();
}

var fetchCity = function fetchCity(url) {
  submit.style.display = "none";
  loader.style.display = "flex";
  (0, _http.getWeather)(url).then(function (r) {
    loader.style.display = "none";
    submit.style.display = "inline-block";

    if (r.cod === "404") {
      throw new Error(r.message);
    }

    var date = new Date();

    var card = _objectSpread({}, r, {
      id: date.getTime(),
      retrieved: "Updated on ".concat(date.toLocaleString())
    });

    cards.push(card);
    (0, _views.renderCards)(userID, cards);
    var containerHeight = document.querySelector(".cards-container").offsetHeight;
    var cardsHeight = document.querySelector(".cards").offsetHeight;

    if (cardsHeight > containerHeight) {
      showMoreBtn();
    }
  }).catch(function (e) {
    console.log(e);
    alert("Your city was not found, please check the spelling");
  });
};

if (cards.length !== 0) {
  (0, _views.renderCards)(userID, cards);
}

var latitude;
var longitude;

function getLocation() {
  navigator.geolocation.getCurrentPosition(SendLocation);
}

function SendLocation(data) {
  latitude = data.coords.latitude;
  longitude = data.coords.longitude;

  var urlCoord = _endpoints.endpointCoordOpenWeather.getByCoord(latitude, longitude);

  fetchCoord(urlCoord);
}

function fetchCoord(url) {
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (result) {
    coordResult(result);
  }).catch(function (error) {
    console.log("klaida", error);
  });
}

var body = document.querySelector("body");
var icon = document.createElement("img");
icon.className = "currLocIcon";
document.querySelector(".currentInfo").appendChild(icon);

function coordResult(result) {
  var main = result.main,
      weather = result.weather,
      name = result.name,
      id = result.id;
  var locCond = weather[0].main;
  var locTemp = main.temp;
  var locDesc = weather[0].description;
  var locCity = name;
  var iconCode = weather[0].icon;

  switch (locCond) {
    case "Rain":
      body.style.background = "url(".concat(_rain.default, ")");
      body.style.backgroundSize = "cover";
      break;

    case "Clear":
      body.style.background = "url(".concat(_clearSky.default, ")");
      body.style.backgroundSize = "cover";
      break;

    case "Clouds":
      body.style.background = "url(".concat(_clouds.default, ")");
      body.style.backgroundSize = "cover";
      break;
  }

  var currentTemp = document.querySelector(".currentTemp");
  currentTemp.textContent = "".concat(Math.round(locTemp), " \u2103");
  var currentDesc = document.querySelector(".currentDesc");
  currentDesc.textContent = "".concat(locDesc);
  icon.src = "http://openweathermap.org/img/wn/".concat(iconCode, "@2x.png");
  var currentCity = document.querySelector(".currentCity");

  if (id === 6955406) {
    locCity = "Vilnius";
  }

  currentCity.textContent = "".concat(locCity, ":");
}
},{"./http/http":"http/http.js","./http/endpoints":"http/endpoints.js","./view/elements":"view/elements.js","./view/views":"view/views.js","./view/effects.js":"view/effects.js","./localStorage":"localStorage.js","./img/rain.jpg":"img/rain.jpg","./img/clear-sky.png":"img/clear-sky.png","./img/clouds.jpg":"img/clouds.jpg"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51082" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map