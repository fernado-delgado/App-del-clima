'use strict'

const input = document.querySelector("#input-city");
const btn = document.querySelector("#btn");
const apiKey = '5ea80a3a5da74b767f1e1bd67efdadb8';
const cards = document.querySelector(".cards")
/*alert("La resolución de tu pantalla es: " + screen.width + " x " + screen.height) ;


var fecha = new Date();
console.log(fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear())
*/
btn.addEventListener("click", (e) => {
  e.preventDefault();  

  
  const inputCity = input.value;


  fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q='+inputCity+'&units=metric&cnt=7&lang=es&appid='+apiKey+'')
  .then(response => response.json())
  .then(data => {
    if(input.value == ""){
      return false
    }

if(data['cod'] == "404"){
      return alert("La ciudad no sea encontrado")
    }

    weatherCards(data)
    dataDayOpenWeather(data);
    document.querySelector(".container-right").style.display = "block";
    createCardLeft(data);
    document.querySelector(".card-left").style.display = "block";
    cardData(data);
    imgLeft(data);

      
      document.querySelector("#city").textContent = data['city']['name'];
      imgs(data);
      addDataTempMax(data);
      addDataTempMin(data);
      document.title = "Clima de " + data['city']['name'];


/**card left */
      
const weatherLeft = document.querySelector(".open-weather-left");
const wrapWeathersLeft = document.querySelector(".weather-left");
const clickOpenMoreInfLeft = function (e){

  let contInfLeft = e.target.closest('div');
  if(contInfLeft.style.transform == '') {
      contInfLeft.style.transform = "translateY(-175px)";
  } else {
      contInfLeft.style.transform = '';
  }
}

weatherLeft.addEventListener("click", clickOpenMoreInfLeft)


/** cards right*/
      const weather = document.querySelectorAll(".open-weathers");
      const clickOpenMoreInf = function (e){
        const wrapWeathers = document.querySelectorAll(".weathers");
        wrapWeathers.forEach( contInf => {
          if(e.target.closest('div') != contInf) {
              contInf.style.transform = '';
          }
        })
        let contInf = e.target.closest('div');
        if(contInf.style.transform == '') {
            contInf.style.transform = "translateY(-165px)";
        } else {
            contInf.style.transform = '';
        }
      }
     
      weather.forEach(boton =>{
        boton.addEventListener("click", clickOpenMoreInf);
      })

    }
  )
.catch(error => alert("ingrese una ciudad"));

btn.addEventListener("click", ()=>{
  let removeDivs = [document.querySelector(".card")];
  if (removeDivs.length == 1) {
    for (let i = 0; i < 7; i++) {
        document.querySelector(".card").remove(this);
      
    }
  }
})

})




function weatherCards(data) {


    for ( let i = 2; i < 8; i++) {
    const parrafoCountryCity = document.createElement("p");
    const parrafoTempMin = document.createElement("p");
    const parrafoTempMax = document.createElement("p");
    const imgs = document.createElement("img");
    const card = document.createElement("div");
    const divDataWeather = document.createElement("div");

    divDataWeather.setAttribute("class", "card-wrap-info")
    parrafoCountryCity.setAttribute("class", "parrafo-country-city");
    imgs.classList.add(`img${i}`)
    parrafoTempMax.classList.add(`card-parrafo-max${i}`);
    parrafoTempMin.classList.add(`card-parrafo-min${i}`);
    card.setAttribute("class" ,"card");

    cards.appendChild(card);
    card.appendChild(divDataWeather);
    divDataWeather.appendChild(parrafoCountryCity);
    divDataWeather.appendChild(imgs);
    divDataWeather.appendChild(parrafoTempMax);
    divDataWeather.appendChild(parrafoTempMin); 
    parrafoCountryCity.textContent = data['city']['name'] + ", "+  data['city']['country'];


    // more inf weather
    const divOpenWeather = document.createElement("div");
    const imgOpenWeather =document.createElement("img");
    const tempDay = document.createElement("p");
    const tempMorn = document.createElement("p");
    const tempNight = document.createElement("p");

    divOpenWeather.setAttribute("class", "weathers");
   /* imgOpenWeather.classList.add(`open-weathers${i}`);*/
    imgOpenWeather.setAttribute("class", "open-weathers")
    imgOpenWeather.src="./icon/sort-down-solid.svg";
    tempDay.classList.add(`temp-day${i}`);
    tempMorn.classList.add(`temp-morn${i}`);
    tempNight.classList.add(`temp-night${i}`);


    divDataWeather.appendChild(divOpenWeather);
    divOpenWeather.appendChild(imgOpenWeather);
    divOpenWeather.appendChild(tempDay);
    divOpenWeather.appendChild(tempMorn);
    divOpenWeather.appendChild(tempNight);

} 
  
}

function createCardLeft(data) {

  const cardLeft = document.querySelector(".card-left");
  const cardWrapInfo = document.createElement("div");
const cardDivLeft = document.createElement("div");
const parrafoCountryCityLeft = document.createElement("p");
const imgLeft = document.createElement("img");
const parrafoTempMaxLeft = document.createElement("p");
const parrafoTempMinLeft = document.createElement("p");

  cardDivLeft.setAttribute("class", "card");
  cardWrapInfo.setAttribute("class", "card-wrap-info")
  parrafoCountryCityLeft.setAttribute("class", " parrafo-country-city");
  imgLeft.setAttribute("class", "img1");
  parrafoTempMaxLeft.setAttribute("class", "card-parrafo-max1");
  parrafoTempMinLeft.setAttribute("class", "card-parrafo-min1");

  cardDivLeft.appendChild(cardWrapInfo)
  cardWrapInfo.appendChild(parrafoCountryCityLeft);
  cardWrapInfo.appendChild(imgLeft);
  cardWrapInfo.appendChild(parrafoTempMaxLeft);
  cardWrapInfo.appendChild(parrafoTempMinLeft);
  cardLeft.appendChild(cardWrapInfo)

  moreInfoLeft(cardWrapInfo,data)
}

function moreInfoLeft(cardWrapInfo,data) {
  const weatherLeft = document.createElement("div");
  const imgOpenWeathersLeft = document.createElement("img");
  const tempDayLeft = document.createElement("p");
  const tempMornLeft = document.createElement("p");
  const tempNightLeft = document.createElement("p");

  weatherLeft.setAttribute("class", "weather-left");
  imgOpenWeathersLeft.setAttribute("class", "open-weather-left");
  tempDayLeft.setAttribute("class", "temp-day-left");
  tempMornLeft.setAttribute("class", "temp-morn-left");
  tempNightLeft.setAttribute("class", "temp-night-left");

  cardWrapInfo.appendChild(weatherLeft);
  weatherLeft.appendChild(imgOpenWeathersLeft);
  weatherLeft.appendChild(tempDayLeft);
  weatherLeft.appendChild(tempMornLeft);
  weatherLeft.appendChild(tempNightLeft);
  imgOpenWeathersLeft.src="./icon/sort-down-solid.svg";
  tempDayLeft.textContent = 'Temperatura en el dia: ' + parseInt(data['list'][0]['temp']['day']);
  tempMornLeft.textContent = 'Temperatura en la tarde: ' + parseInt(data['list'][0]['temp']['morn']);
  tempNightLeft.textContent = 'Temperatura en la noche: ' + parseInt(data['list'][0]['temp']['night']);

}

function cardData(data) {
  const cardCountryCityLeft1 = document.querySelector(".parrafo-country-city");
  const cardParrafoMaxLeft1 = document.querySelector(".card-parrafo-max1");
  const cardParrafoMinLeft1 = document.querySelector(".card-parrafo-min1");

  cardCountryCityLeft1.textContent = data['city']['name'] + ", " + data['city']['country'];
  cardParrafoMaxLeft1.textContent = 'Temperatura maxíma ' +  parseInt(data['list'][0]['temp']['max']) + "°C";
  cardParrafoMinLeft1.textContent = 'Temperatura minima ' +  parseInt(data['list'][0]['temp']['min']) + "°C";
}


function imgLeft(data) {
  const img1 = document.querySelector(".img1");
  img1.src = "https://openweathermap.org/img/wn/" + data['list'][0]['weather'][0]['icon'] +".png"  
}

function imgs(data) {
  

  const img2 = document.querySelector(".img2");
  const img3 = document.querySelector(".img3");
  const img4 = document.querySelector(".img4");
  const img5 = document.querySelector(".img5");
  const img6 = document.querySelector(".img6");
  const img7 = document.querySelector(".img7");


  img2.src = "https://openweathermap.org/img/wn/" + data['list'][1]['weather'][0]['icon'] +".png";
  img3.src = "https://openweathermap.org/img/wn/" + data['list'][2]['weather'][0]['icon'] +".png"; 
  img4.src = "https://openweathermap.org/img/wn/" + data['list'][3]['weather'][0]['icon'] +".png"; 
  img5.src = "https://openweathermap.org/img/wn/" + data['list'][4]['weather'][0]['icon'] +".png"; 
  img6.src = "https://openweathermap.org/img/wn/" + data['list'][5]['weather'][0]['icon'] +".png"; 
  img7.src = "https://openweathermap.org/img/wn/" + data['list'][6]['weather'][0]['icon'] +".png"; 

}
function addDataTempMax(data) {

    const cardParrafoMax2 = document.querySelector(".card-parrafo-max2");
    const cardParrafoMax3 = document.querySelector(".card-parrafo-max3");
    const cardParrafoMax4 = document.querySelector(".card-parrafo-max4");
    const cardParrafoMax5 = document.querySelector(".card-parrafo-max5");
    const cardParrafoMax6 = document.querySelector(".card-parrafo-max6");
    const cardParrafoMax7 = document.querySelector(".card-parrafo-max7");

    
    cardParrafoMax2.textContent = 'Temperatura maxíma ' + parseInt(data['list'][1]['temp']['max']) + "°C";
    cardParrafoMax3.textContent = 'Temperatura maxíma ' + parseInt(data['list'][2]['temp']['max']) + "°C";
    cardParrafoMax4.textContent = 'Temperatura maxíma ' + parseInt(data['list'][3]['temp']['max']) + "°C";
    cardParrafoMax5.textContent = 'Temperatura maxíma ' + parseInt(data['list'][4]['temp']['max']) + "°C";
    cardParrafoMax6.textContent = 'Temperatura maxíma ' + parseInt(data['list'][5]['temp']['max']) + "°C";
    cardParrafoMax7.textContent = 'Temperatura maxíma ' + parseInt(data['list'][6]['temp']['max']) + "°C";

}
function addDataTempMin(data) {

  const cardParrafoMin2 = document.querySelector(".card-parrafo-min2");
  const cardParrafoMin3 = document.querySelector(".card-parrafo-min3");
  const cardParrafoMin4 = document.querySelector(".card-parrafo-min4");
  const cardParrafoMin5 = document.querySelector(".card-parrafo-min5");
  const cardParrafoMin6 = document.querySelector(".card-parrafo-min6");
  const cardParrafoMin7 = document.querySelector(".card-parrafo-min7");

  cardParrafoMin2.textContent = 'Temperatura minima ' + parseInt(data['list'][1]['temp']['min']) + "°C";
  cardParrafoMin3.textContent = 'Temperatura minima ' + parseInt(data['list'][2]['temp']['min']) + "°C";
  cardParrafoMin4.textContent = 'Temperatura minima ' + parseInt(data['list'][3]['temp']['min']) + "°C";
  cardParrafoMin5.textContent = 'Temperatura minima ' + parseInt(data['list'][4]['temp']['min']) + "°C";
  cardParrafoMin6.textContent = 'Temperatura minima ' + parseInt(data['list'][5]['temp']['min']) + "°C";
  cardParrafoMin7.textContent = 'Temperatura minima ' + parseInt(data['list'][6]['temp']['min']) + "°C";
  
}

function dataDayOpenWeather(data) {
const tempDay2 = document.querySelector(".temp-day2");
const tempDay3 = document.querySelector(".temp-day3");
const tempDay4 = document.querySelector(".temp-day4");
const tempDay5 = document.querySelector(".temp-day5");
const tempDay6 = document.querySelector(".temp-day6");
const tempDay7 = document.querySelector(".temp-day7");

tempDay2.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][1]['temp']['day'])  + "°C";
tempDay3.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][2]['temp']['day'])  + "°C";
tempDay4.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][3]['temp']['day'])  + "°C";
tempDay5.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][4]['temp']['day'])  + "°C";
tempDay6.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][5]['temp']['day'])  + "°C";
tempDay7.textContent = 'Temperatura en el dia: ' +parseInt(data['list'][6]['temp']['day'])  + "°C";


    dataMornOpenWeather(data);
    dataNightOpenWeather(data);

    
}
function dataMornOpenWeather(data) {
  
const tempMonr2 = document.querySelector(".temp-morn2");
const tempMonr3 = document.querySelector(".temp-morn3");
const tempMonr4 = document.querySelector(".temp-morn4");
const tempMonr5 = document.querySelector(".temp-morn5");
const tempMonr6 = document.querySelector(".temp-morn6");
const tempMonr7 = document.querySelector(".temp-morn7");

  tempMonr2.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][1]['temp']['morn'])  + "°C";
  tempMonr3.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][2]['temp']['morn'])  + "°C";
  tempMonr4.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][3]['temp']['morn'])  + "°C";
  tempMonr5.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][4]['temp']['morn'])  + "°C";
  tempMonr6.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][5]['temp']['morn'])  + "°C";
  tempMonr7.textContent = 'Temperatura en la tarde: ' +parseInt(data['list'][6]['temp']['morn'])  + "°C";

}
function dataNightOpenWeather(data) {
const tempNight2 = document.querySelector(".temp-night2");
const tempNight3 = document.querySelector(".temp-night3");
const tempNight4 = document.querySelector(".temp-night4");
const tempNight5 = document.querySelector(".temp-night5");
const tempNight6 = document.querySelector(".temp-night6");
const tempNight7 = document.querySelector(".temp-night7");

  tempNight2.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][1]['temp']['night'])  + "°C";
  tempNight3.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][2]['temp']['night'])  + "°C";
  tempNight4.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][3]['temp']['night'])  + "°C";
  tempNight5.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][4]['temp']['night'])  + "°C";
  tempNight6.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][5]['temp']['night'])  + "°C";
  tempNight7.textContent = 'Temperatura en la noche: ' +parseInt(data['list'][6]['temp']['night'])  + "°C";

}
