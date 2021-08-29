'use strict'
const apiKey = '5ea80a3a5da74b767f1e1bd67efdadb8', getGeolocation = ()=>{
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumage: 0,
  },
  success = (position)=>{
    console.log(position)
  },
  error = (err)=>{
    console.log(err)
  };
  navigator.geolocation.getCurrentPosition(success, error, options)
}

 getGeolocation() 
  
const fetchWeather = (city) =>{ fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&lang=es&appid=${apiKey}`)
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    return data
  })
  .catch( error =>{
    console.log(error)
  })
} 

