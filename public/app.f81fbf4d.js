parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Eb7p":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getWeather=void 0;var e=function(e){return fetch(e).then(function(e){return e.json()})};exports.getWeather=e;
},{}],"cB6n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.endpointCoordOpenWeather=exports.forecastEndpoint=exports.gifStaticEndpoint=exports.gifEndpoint=exports.endpoint=void 0;var t="790dff15e5ecdde73da819196a127634",e="metric",o="6LkxF8Jv5CrI70LWPSHapYnfCiU40Hfh",n={getByCityName:function(o){return"https://api.openweathermap.org/data/2.5/weather?q=".concat(o,"&units=").concat(e,"&appid=").concat(t)}};exports.endpoint=n;var a={getByCoord:function(o,n){return"https://api.openweathermap.org/data/2.5/weather?lat=".concat(o,"&lon=").concat(n,"&units=").concat(e,"&appid=").concat(t)}};exports.endpointCoordOpenWeather=a;var r={getByWeatherCondition:function(t){return"http://api.giphy.com/v1/gifs/random?api_key=".concat(o,"&tag=").concat(t)}};exports.gifEndpoint=r;var p={getByWeatherCondition:function(t){return"http://api.giphy.com/v1/stickers/random?api_key=".concat(o,"&tag=").concat(t)}};exports.gifStaticEndpoint=p;var i={getByCityName:function(o){return"http://api.openweathermap.org/data/2.5/forecast?q=".concat(o,"&units=").concat(e,"&appid=").concat(t)}};exports.forecastEndpoint=i;
},{}],"XtO9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ELEMENTS=void 0;var e={output:document.querySelector(".cards"),form:document.querySelector(".controller"),submit:document.querySelector('[type="submit"]'),loader:document.querySelector(".loading"),containerHeight:document.querySelector(".cards-container"),cardsHeight:document.querySelector(".cards"),refresh:document.querySelector(".refresh")};exports.ELEMENTS=e;
},{}],"Cf6Q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCardsFromLocalStorage=exports.saveToLocalStorage=void 0;var e=function(e,o){var t=JSON.stringify(o);localStorage.setItem(e,t)};exports.saveToLocalStorage=e;var o=function(e){return localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):[]};exports.getCardsFromLocalStorage=o;
},{}],"avWY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.renderCards=void 0;var n=require("./elements"),e=require("/localStorage"),t=require("/http/endpoints"),a=require("/app"),c=n.ELEMENTS.output,o=function n(o,i){c.innerHTML="",i.forEach(function(r){var s=r.main,l=r.weather,d=r.name,p=l[0].main;"Clear"===p&&(p="Sky");var u=t.gifEndpoint.getByWeatherCondition(p),y=t.forecastEndpoint.getByCityName(d),v=(new Date,"\n    <div class='singleCont".concat(r.id,"'>\n        <div class='singleCard").concat(r.id,"' id='singleCard'>\n            <h2><span>").concat(r.name,"</span></h2>\n            <p><span>Temperature: ").concat(Math.round(s.temp)," &#8451;</span></p>\n            <p><span>Feels like: ").concat(Math.round(s.feels_like)," &#8451;</span></p>\n            <p><span>Description: ").concat(l[0].description,"</span></p>\n            <p><span>Humidity: ").concat(s.humidity,"%</span></p>\n            <p><span>").concat(r.retrieved,"</span></p>\n        </div>\n        <button class=delete").concat(r.id,'>\n            <span class="line"></span>\n            <span class="line"></span>\n        </button>\n        <div class="overlay').concat(r.id,'">\n        <h1>See the forecast</h1>\n        </div>\n    </div>\n    '));c.insertAdjacentHTML("afterbegin",v);var g=document.querySelector("[class^='singleCard']"),m=document.querySelector("[class^='singleCont']"),f=document.querySelector("[class^='overlay']"),h=document.querySelector("[class^='overlay'] h1"),b=document.querySelector(".delete".concat(r.id));f.style.width="249px",f.style.padding="18px",f.style.margin="6px",f.style.position="absolute",f.style.top="0",f.style.left="0",f.style.bottom="0",f.style.background="rgba(12, 98, 226, 0.678)",f.style.opacity="0",f.style.transition=".3s all",f.style.borderRadius="12px",m.onmouseenter=function(){g.style.filter="blur(2px)",f.style.opacity="1",b.style.display="block"},m.onmouseleave=function(){g.style.filter="blur(0px)",f.style.opacity="0",b.style.display="none"},b.onmouseenter=function(){f.style.background="rgba(245, 4, 4, 0.678)",h.textContent="Remove city"},b.onmouseleave=function(){f.style.background="rgba(12, 98, 226, 0.678)",h.textContent="See the forecast"},fetch(u).then(function(n){return n.json()}).then(function(n){var e,t,a;e=n.data.images.fixed_height_small.url,t="url('".concat(e,"')"),(a=document.querySelector(".singleCard".concat(r.id))).style.backgroundImage=t,a.style.backgroundSize="cover",a.style.backgroundRepeat="no-repeat"}).catch(function(n){console.log("klaida",n)}),b.addEventListener("click",function(){i=i.filter(function(n){return n.id!==r.id}),(0,a.setDeletedTrue)(),window.deletedBtn=!0,(0,e.saveToLocalStorage)(o,i),n(o,i)}),document.querySelector(".overlay".concat(r.id)).addEventListener("click",function(){fetch(y).then(function(n){return n.json()}).then(function(n){!function(n){console.log(n);var e=n.list;e.splice(0,1);var t=function(n,e){null!=n&&(e=a[n][0].dt);var t=new Date(1e3*e),c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()];return c},a=e.reduce(function(n,e,a){return a&&t(void 0,n[n.length-1][0].dt)===t(void 0,e.dt)?(n[n.length-1].push(e),n):n.concat([[e]])},[]);console.log(a);var o=function(n){var e=Math.round(a[n].reduce(function(n,e){return n+e.main.temp},0)/a[n].length);return e},i=function(n){var e;return a[n].forEach(function(n){var t=new Date(n.dt_txt),a=t.getHours();12===a&&(e=n.weather[0].icon)}),e||(e=a[n][a[n].length-1].weather[0].icon),"http://openweathermap.org/img/wn/".concat(e,"@2x.png")},r=function(n){var e;return a[n].forEach(function(n){var t=new Date(n.dt_txt),a=t.getHours();12===a&&(e=n.weather[0].description)}),e||(e=a[n][a[n].length-1].weather[0].description),e},s='\n        <div id="myModal" class="modal">\n            <div class="modal-content">\n                <span class="close">&times;</span>\n                <h2>Weather forecast</h2>\n                <div class=\'daysList\'>\n                    <div>\n                        <p>'.concat(t(0),"</p>\n                        <img src=").concat(i(0),">\n                        <p>").concat(o(0),"&#8451;</p>\n                        <p>").concat(r(0),"</p>\n                    </div>\n                    <div>\n                        <p>").concat(t(1),"</p>\n                        <img src=").concat(i(1),">\n                        <p>").concat(o(1),"&#8451;</p>\n                        <p>").concat(r(1),"</p>\n                    </div>\n                    <div>\n                        <p>").concat(t(2),"</p>\n                        <img src=").concat(i(2),">\n                        <p>").concat(o(2),"&#8451;</p>\n                        <p>").concat(r(2),"</p>\n                    </div>\n                    <div>\n                        <p>").concat(t(3),"</p>\n                        <img src=").concat(i(3),">\n                        <p>").concat(o(3),"&#8451;</p>\n                        <p>").concat(r(3),"</p>\n                    </div>\n                    <div>\n                        <p>").concat(t(4),"</p>\n                        <img src=").concat(i(4),">\n                        <p>").concat(o(4),"&#8451;</p>\n                        <p>").concat(r(4),"</p>\n                    </div>\n                </div>    \n            </div>\n        </div>\n        ");c.insertAdjacentHTML("afterend",s);var l=document.getElementById("myModal"),d=document.getElementsByClassName("close")[0];l.style.display="block",d.onclick=function(){l.style.display="none"},window.onclick=function(n){n.target==l&&(l.style.display="none")}}(n)}).catch(function(n){console.log("klaida",n)})})}),(0,e.saveToLocalStorage)(o,i)};exports.renderCards=o;
},{"./elements":"XtO9","/localStorage":"Cf6Q","/http/endpoints":"cB6n","/app":"A2T1"}],"X1jC":[function(require,module,exports) {
var e=document.querySelector("nav"),o=document.querySelector(".portfolio");window.addEventListener("scroll",function(){window.scrollY>0?e.style.height="50px":e.style.height="60px"});
},{}],"xced":[function(require,module,exports) {
module.exports="/rain.b307f698.jpg";
},{}],"bkRT":[function(require,module,exports) {
module.exports="/clear-sky.109e1cc8.png";
},{}],"e1Dl":[function(require,module,exports) {
module.exports="/clouds.ce71e2ea.jpg";
},{}],"A2T1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setDeletedTrue=void 0;var e=require("./http/http"),t=require("./http/endpoints"),n=require("./view/elements"),r=require("./view/views");require("./view/effects.js");var o=require("./localStorage"),c=l(require("./img/rain.jpg")),a=l(require("./img/clear-sky.png")),i=l(require("./img/clouds.jpg"));function l(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){s(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=[];O(),M();var m={deleted:!1},y=function(){m.deleted=!0};exports.setDeletedTrue=y;var g=function(){m.deleted=!1},p="default",v=n.ELEMENTS.form,h=n.ELEMENTS.submit,b=n.ELEMENTS.loader,C=n.ELEMENTS.refresh,S=document.querySelector(".signOut");function w(){for(var e=!1;!e;){var t=prompt("Enter your username");""===t?(e=!1,alert("Username can not be blank")):null===t?(0!==(f=(0,o.getCardsFromLocalStorage)(p)||[]).length&&(0,r.renderCards)(p,f),e=!0):(p=t,e=!0)}f=(0,o.getCardsFromLocalStorage)(p)||[],(0,r.renderCards)(p,f),f===[]&&(0,o.saveToLocalStorage)(p,f),0!==f.length&&P(),"default"!==p&&(S.textContent="".concat(p),S.onmouseenter=function(){S.textContent="Change user"},S.onmouseleave=function(){S.textContent="".concat(p)}),w.called=!0}S.addEventListener("click",w);var E=function(){var e=document.querySelector(".show-more");e.style.display="block",e.addEventListener("click",function(){var t=document.querySelector(".cards-container").offsetHeight,n=document.querySelector(".cards").offsetHeight;n>t&&(document.querySelector(".cards-container").style.height="".concat(n,"px"),e.style.display="none")})};function q(e){e.preventDefault(),P();var n=e.path[0].elements.cityName.value,r=f.find(function(e){return e.name.toLowerCase()===n.trim().toLowerCase()});if(!n.trim())return alert("please insert correct city name"),null;if(r)return alert("this city already exists, enter something new :)"),null;var o=t.endpoint.getByCityName(n);N(o),document.getElementById("myForm").reset(),q.called=!0,window.submitBtn=!0}function O(){P(),O.called=!0}v.addEventListener("submit",function(e){q(e)}),C.addEventListener("click",O);var k=20,j=k;setInterval(function(){x(j),j--,(!0===O.called||!0===q.called||!0===w.called||m.deleted)&&(j=k,O.called=!1,q.called=!1,w.called=!1,g()),j<=0&&(P(),j=k)},1e3);var L=!0;function x(e){1==L&&(C.textContent="Update in: ".concat(e))}function P(){(f=(0,o.getCardsFromLocalStorage)(p)).forEach(function(e){var n=e.name,r=t.endpoint.getByCityName(n);N(r)}),f.length=0,(0,r.renderCards)(p,f),M()}C.onmouseenter=function(){L=!1,C.textContent="Update now"},C.onmouseleave=function(){L=!0};var D,T,N=function(t){h.style.display="none",b.style.display="flex",(0,e.getWeather)(t).then(function(e){if(b.style.display="none",h.style.display="inline-block","404"===e.cod)throw new Error(e.message);var t=new Date,n=d({},e,{id:t.getTime(),retrieved:"Updated on ".concat(t.toLocaleString())});f.push(n),(0,r.renderCards)(p,f);var o=document.querySelector(".cards-container").offsetHeight;document.querySelector(".cards").offsetHeight>o&&E()}).catch(function(e){console.log(e),alert("Your city was not found, please check the spelling")})};function M(){navigator.geolocation.getCurrentPosition(B)}function B(e){D=e.coords.latitude,T=e.coords.longitude,F(t.endpointCoordOpenWeather.getByCoord(D,T))}function F(e){fetch(e).then(function(e){return e.json()}).then(function(e){U(e)}).catch(function(e){console.log("klaida",e)})}0!==f.length&&(0,r.renderCards)(p,f);var H=document.querySelector("body"),I=document.createElement("img");function U(e){var t=e.main,n=e.weather,r=e.name,o=e.id,l=n[0].main,u=t.temp,d=n[0].description,s=r,f=n[0].icon;switch(l){case"Rain":H.style.background="url(".concat(c.default,")"),H.style.backgroundSize="cover";break;case"Clear":H.style.background="url(".concat(a.default,")"),H.style.backgroundSize="cover";break;case"Clouds":H.style.background="url(".concat(i.default,")"),H.style.backgroundSize="cover"}document.querySelector(".currentTemp").textContent="".concat(Math.round(u)," ℃"),document.querySelector(".currentDesc").textContent="".concat(d),I.src="http://openweathermap.org/img/wn/".concat(f,"@2x.png"),6955406===o&&(s="Vilnius"),document.querySelector(".currentCity").textContent="".concat(s,":")}I.className="currLocIcon",document.querySelector(".currentInfo").appendChild(I);
},{"./http/http":"Eb7p","./http/endpoints":"cB6n","./view/elements":"XtO9","./view/views":"avWY","./view/effects.js":"X1jC","./localStorage":"Cf6Q","./img/rain.jpg":"xced","./img/clear-sky.png":"bkRT","./img/clouds.jpg":"e1Dl"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.f81fbf4d.js.map