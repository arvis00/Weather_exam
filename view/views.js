import { ELEMENTS } from "./elements";
import { saveToLocalStorage } from "/localStorage";
import { gifEndpoint, forecastEndpoint } from "/http/endpoints";
import { setDeletedTrue } from "/app";

const { output } = ELEMENTS;

const renderCards = (userID, cards) => {
  output.innerHTML = "";
  cards.forEach(card => {
    const { main, weather, name } = card;

    let weatherCond = weather[0].main;
    if (weatherCond === "Clear") {
      weatherCond = "Sky";
    }
    const gifUrl = gifEndpoint.getByWeatherCondition(weatherCond);
    const forecastUrl = forecastEndpoint.getByCityName(name);

    const date = new Date();
    const template = `
    <div class='singleCont${card.id}'>
        <div class='singleCard${card.id}' id='singleCard'>
            <h2><span>${card.name}</span></h2>
            <p><span>Temperature: ${Math.round(main.temp)} &#8451;</span></p>
            <p><span>Feels like: ${Math.round(
              main.feels_like
            )} &#8451;</span></p>
            <p><span>Description: ${weather[0].description}</span></p>
            <p><span>Humidity: ${main.humidity}%</span></p>
            <p><span>${card.retrieved}</span></p>
        </div>
        <button class=delete${card.id}>
            <span class="line"></span>
            <span class="line"></span>
        </button>
        <div class="overlay${card.id}">
        <h1>See the forecast</h1>
        </div>
    </div>
    `;

    output.insertAdjacentHTML("afterbegin", template);
    const singleCard2 = document.querySelector(`[class^='singleCard']`);
    const singleCont = document.querySelector(`[class^='singleCont']`);
    const overlay = document.querySelector(`[class^='overlay']`);
    const overlayText = document.querySelector(`[class^='overlay'] h1`);
    const deleteBtn = document.querySelector(`.delete${card.id}`);
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
    singleCont.onmouseenter = function() {
      singleCard2.style.filter = "blur(2px)";
      overlay.style.opacity = "1";
      deleteBtn.style.display = "block";
    };

    singleCont.onmouseleave = function() {
      singleCard2.style.filter = "blur(0px)";
      overlay.style.opacity = "0";
      deleteBtn.style.display = "none";
    };

    deleteBtn.onmouseenter = function() {
      overlay.style.background = "rgba(245, 4, 4, 0.678)";
      overlayText.textContent = "Remove city";
    };

    deleteBtn.onmouseleave = function() {
      overlay.style.background = "rgba(12, 98, 226, 0.678)";
      overlayText.textContent = "See the forecast";
    };

    fetchGif(gifUrl);
    // saveToLocalStorage(userID, cards);

    deleteBtn.addEventListener("click", function() {
      deleteCard();
    });

    function deleteCard() {
      cards = cards.filter(item => {
        return item.id !== card.id;
      });

      setDeletedTrue();
      window.deletedBtn = true;
      saveToLocalStorage(userID, cards);
      renderCards(userID, cards);
    }

    function fetchGif(url) {
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          gifResult(result);
        })
        .catch(error => {
          console.log("klaida", error);
        });
    }

    function gifResult(finalResult) {
      const gifUrlResult = finalResult.data.images.fixed_height_small.url;
      const urlString = `url('${gifUrlResult}')`;
        const singleCard = document.querySelector(`.singleCard${card.id}`);
        
      singleCard.style.backgroundImage = urlString;
      singleCard.style.backgroundSize = "cover";
      singleCard.style.backgroundRepeat = "no-repeat";
    }

    const pressOverlay = document.querySelector(`.overlay${card.id}`);

    pressOverlay.addEventListener("click", function() {
      fetchForecast(forecastUrl);
    });

    function fetchForecast(url) {
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          forecastResult(result);
        })
        .catch(error => {
          console.log("klaida", error);
        });
    }

    function forecastResult(result) {
      console.log(result);
      const { list } = result;
      list.splice(0, 1);

      const dayOfWeek = (dayNumber, timeStampId) => {
        dayNumber != undefined
          ? (timeStampId = listChunks[dayNumber][0].dt)
          : timeStampId;
        const a = new Date(timeStampId * 1000);
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        const dayOfWeek = days[a.getDay()];
        return dayOfWeek;
      };

      const listChunks = list.reduce(function(result, value, index) {
        if (
          !index ||
          dayOfWeek(undefined, result[result.length - 1][0].dt) !==
            dayOfWeek(undefined, value.dt)
        ) {
          return result.concat([[value]]);
        }
        result[result.length - 1].push(value);
        return result;
      }, []);
      console.log(listChunks);

      const forecastTemp = dayNumber => {
        const temp = Math.round(
          listChunks[dayNumber].reduce((result, value) => {
            return result + value.main.temp;
          }, 0) / listChunks[dayNumber].length
        );
        return temp;
      };

      const dayIcon = dayNumber => {
        let iconCode;
        listChunks[dayNumber].forEach(threeHours => {
          const a = new Date(threeHours.dt_txt);
          const hour = a.getHours();
          if (hour === 12) {
            iconCode = threeHours.weather[0].icon;
          }
        });
        if (!iconCode) {
          iconCode =
            listChunks[dayNumber][listChunks[dayNumber].length - 1].weather[0]
              .icon;
        }
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      };

      const dayDescr = dayNumber => {
        let desc;
        listChunks[dayNumber].forEach(threeHours => {
          const a = new Date(threeHours.dt_txt);
          const hour = a.getHours();
          if (hour === 12) {
            desc = threeHours.weather[0].description;
          }
        });
        if (!desc) {
          desc =
            listChunks[dayNumber][listChunks[dayNumber].length - 1].weather[0]
              .description;
        }

        return desc;
      };

      const templateForecast = `
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Weather forecast</h2>
                <div class='daysList'>
                    <div>
                        <p>${dayOfWeek(0)}</p>
                        <img src=${dayIcon(0)}>
                        <p>${forecastTemp(0)}&#8451;</p>
                        <p>${dayDescr(0)}</p>
                    </div>
                    <div>
                        <p>${dayOfWeek(1)}</p>
                        <img src=${dayIcon(1)}>
                        <p>${forecastTemp(1)}&#8451;</p>
                        <p>${dayDescr(1)}</p>
                    </div>
                    <div>
                        <p>${dayOfWeek(2)}</p>
                        <img src=${dayIcon(2)}>
                        <p>${forecastTemp(2)}&#8451;</p>
                        <p>${dayDescr(2)}</p>
                    </div>
                    <div>
                        <p>${dayOfWeek(3)}</p>
                        <img src=${dayIcon(3)}>
                        <p>${forecastTemp(3)}&#8451;</p>
                        <p>${dayDescr(3)}</p>
                    </div>
                    <div>
                        <p>${dayOfWeek(4)}</p>
                        <img src=${dayIcon(4)}>
                        <p>${forecastTemp(4)}&#8451;</p>
                        <p>${dayDescr(4)}</p>
                    </div>
                </div>    
            </div>
        </div>
        `;

      output.insertAdjacentHTML("afterend", templateForecast);
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      };
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
  });
  saveToLocalStorage(userID, cards);
};

export { renderCards };
