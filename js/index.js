/*
moment.updateLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});
*/
moment.locale('es');
const apiKey = '5ea80a3a5da74b767f1e1bd67efdadb8',
  apikeyGeoDataSource = "KJWZNNFWHFTRDADK3CT0AVQ5TZWC7IZ8",
  btnForm = document.querySelector("form button"),
  htmlBtnForm = {
    normal: "Buscar <i class='bx bx-search-alt'></i>",
    loader: "Cargando <i class='bx bx-loader-alt bx-spin bx-flip-horizontal' ></i>"
  }


const getNameCity = (lat, lon) => {
  return new Promise((resolve, reject) => {

    fetch(`https://geodatasource-geodatasource-location-search-web-service-v1.p.rapidapi.com/city?lat=${lat}&key=${apikeyGeoDataSource}&lng=${lon}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "geodatasource-geodatasource-location-search-web-service-v1.p.rapidapi.com",
          "x-rapidapi-key": "4527db0930msh15fa8c8225abb6bp1ce087jsn33e4fe29efb4"
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.error(err);
      });
  })

  /*
      fetch(`https://api.geodatasource.com/v2/city?key=KJWZNNFWHFTRDADK3CT0AVQ5TZWC7IZ8&lat=21.1743&lng=-86.8466`,{
        method:'GET'
      })
        .then(res => res.json())
        .then(data => {
          console.log("pasa")
          resolve(data)
        })
        .catch(error => reject(""))
        */

}

//FUNCION PARA LA GEOLOCALIZACIÓN
const getGeolocation = () => {

  //OPCIONES
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  //USUARIO A ACEPTÓ LA GEOLOCALIZACIÓN
  function success(location) {
    btnForm.innerHTML = htmlBtnForm.loader;

    let lat = location.coords.latitude,
      lon = location.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=es&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        //FUNCIÓN PARA INSERTAR LAS CARDS CON LOS DATOS
        getNameCity(lat, lon)
          .then(resName => resName.json())
          .then(resNameCity => {
            handleCardsWeather(datos, resNameCity)
          })
          .catch(() => {
            handleCardsWeather(datos, "")
          })
      })
      .catch(error => {
        btnForm.innerHTML = htmlBtnForm.normal;

        console.log(error.message)
      })
  }

  //USUARIO NO ACEPTO LA GEOLOCALIZACIÓN
  function error(err) {
    console.log(err)
  };


  navigator.geolocation.getCurrentPosition(success, error, options)
}


//LLAMADO DE LA FUNCIÓN PARA LOCALIZAR AL USUARIO AUTOMATICAMENTE SI LO AUTORIZA
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  getGeolocation()
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    dataForm = new FormData;
    dataForm.append("city", form.querySelector('input[type="text"]').value)
    fetchWeather(dataForm.get("city"))
  })
});

const fetchWeather = (city) => {
  btnForm.innerHTML = htmlBtnForm.loader;
  fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=1&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      //RETORNO DE LOS DATOS
      let lat = data.city.coord.lat,
        lon = data.city.coord.lon;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=es&appid=${apiKey}`)
        .then(res => res.json())
        .then(datos => {
          //FUNCIÓN PARA INSERTAR LAS CARDS CON LOS DATOS
          getNameCity(lat, lon)
            .then(resName => resName.json())
            .then(resNameCity => {
              handleCardsWeather(datos, resNameCity)
            })
            .catch(() => {
              handleCardsWeather(datos, "")
            })
          //.then(resp => console.log(resp))

        })
        .catch(error => {
          btnForm.innerHTML = htmlBtnForm.normal;

          console.log(error.message)
        })
    })
    .catch(error => {
      btnForm.innerHTML = htmlBtnForm.normal;

      console.log(error)
    })

}

const handleCardsWeather = (datos, dataCityName) => {
  let city = "",
    country = "";

  if (dataCityName != "") {
    city = dataCityName.city;
    country = dataCityName.country;
  }
  let { daily } = datos,
  dateNow = datos.current,
    templateCards = {
      "templateLeft": "",
      "templateRight": ""
    };
  daily.forEach((day, i) => {

    if (i == 0) {
      templateCards.templateLeft = `
      <div class="card">
      <p>${city},${country}</p>
      <span class="date">Hoy: ${moment(dateNow.dt*1000).format('LT a')}</span>
          
          <figure>
            <img src="http://openweathermap.org/img/wn/${dateNow.weather[0].icon}@2x.png" alt="${dateNow.weather[0].main}" />
            <figcaption>${dateNow.weather[0].description}</figcaption>
          </figure>
          <p class="title-sect">Temperatura actual de ${parseInt(dateNow.temp)} °C</p>
          <p class="title-sect">Sensación térmica de ${parseInt(dateNow.feels_like)}°C</p>
      </div>
    `;
    } else {
      templateCards.templateRight += `
       <div class="card">
             <p>${city},${country}</p>

             <span class="date">${moment(day.dt*1000).format('dddd')}</span>
           
           <figure>
               <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${dateNow.weather[0].main}" />
               <figcaption>${day.weather[0].description}</figcaption>
           </figure>
           <h4 class="title-sect" >Temperatura</h4>
           <p class="temp-max">Maxima: ${parseInt(day.temp.max)}°C</p>
           <p class="temp-min">Minima: ${parseInt(day.temp.min)}°C</p>
           <div class="more-inf">
               <button type="button" class="btn">
                   <i class='bx bxs-down-arrow'></i>
               </button>
           <div class="feels-like">
               <h5 class="title-sect" >Sensación termica</h5>
               <p>Mañana: ${parseInt(day.feels_like.day)}°C</p>
               <p>Tarde: ${parseInt(day.feels_like.eve)}°C</p>
               <p>Noche: ${parseInt(day.feels_like.night)}°C</p>
            </div>
          </div>
        </div>
      </div>
      
      `;

    }

  })
  //return new Promise((resolve, reject)=>{
  //  resolve(templateCards)
  //})
  btnForm.innerHTML = htmlBtnForm.normal;

  document.querySelector("#wrap-cards-form").innerHTML = templateCards.templateLeft;
  document.querySelector("#wrap-cards").innerHTML = templateCards.templateRight;
  handleMoreInf()
}
const handleMoreInf = () => {
  let cards = document.querySelectorAll(".card");
  cards.forEach((card, i, list) => {
    if (i != 0) {
      card.querySelector(".more-inf button").addEventListener("click", (e) => {

        cards.forEach((cardMore, f) => {
          if (f != 0) {
            let moreInf = cardMore.querySelector(".more-inf");
            if (i == f) {
              moreInf.classList.toggle("active")
            } else {
              moreInf.classList.remove("active")
            }
          }
        })

      })

    }
  })
}
/*
 
function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return "The local time for city"+ city +" is "+ nd.toLocaleString();
}

alert(calcTime('Bombay', '+5.5'));
*/