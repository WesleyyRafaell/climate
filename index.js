const $input = searchDom('#input');
const $form = searchDom('#form');
const $temperature = searchDom('#temperature');
const $cityName = searchDom('#cityName');
const $descriptionWeather = searchDom('#descriptionWeather');
const $humidity = searchDom('#humidity');
const $speed = searchDom('#speed');
const $tempmax = searchDom('#tempmax');
const $tempmin = searchDom('#tempmin');
const $cardError = searchDom('.cardError');
const $closeCardErro = searchDom('.closeCardErro');
const $textError = searchDom('.textError');

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8f5e6de9230285a98d0544d469bd972b';

$form.addEventListener('submit', (event)=> {
  event.preventDefault();

  const nameCityInput = $input.value;

  if(nameCityInput == ''){
    cityNotFound("field cannot be empty");
    return;
  }

  callApi(nameCityInput)

  $input.value = '';
})

$closeCardErro.addEventListener('click', ()=>{
  cityNotFound();
})


function callApi(nameCity){
  fetch(`${baseUrl}?q=${nameCity}&appid=${apiKey}`)
      .then((response)=> {  
        return response.json();
      })
      .then((data)=> {
        createDataStructure(data);
      })
      .catch((error)=>{
        // console.log('Deu ruim: ', error)
        cityNotFound("City not found");
      })
}


function createDataStructure({main, name, weather, wind}){
  const  weatherInformation = {
    temperature: transformKelvinToCelcius(main.temp.toFixed(0)),
    cityName: name,
    descriptionClimate: weather[0].description,
    humidity: main.humidity,
    speed: transformMsToKm(wind.speed.toFixed(0)),
    tempmax: transformKelvinToCelcius(main.temp_max.toFixed(0)),
    tempmin: transformKelvinToCelcius(main.temp_min.toFixed(0))
  }

<<<<<<< HEAD
  const newTempMin = transformKelvinToCelcius(data.main.temp_min.toFixed(0));
  $tempmin.innerText = `${newTempMin}º`;
=======
  insertInformationIntoDom(weatherInformation)
}

function insertInformationIntoDom({temperature, cityName, descriptionClimate, humidity, speed, tempmax, tempmin}){
  $temperature.innerText = `${temperature}º`
  $cityName.innerText = cityName;
  $descriptionWeather.innerText = descriptionClimate;
  $humidity.innerText = `${humidity}%`;
  $speed.innerText = `${speed} km/h`;
  $tempmax.innerText = `${tempmax}º`;
  $tempmin.innerText = `${tempmin}º`;
>>>>>>> c78d30d9356566395eb0ff9c77e094b8ad21da02
}

function transformKelvinToCelcius(temp){
  const tempInCelcius =  temp - 273.15;
  return tempInCelcius.toFixed(0)
}

function transformMsToKm(speed){
  const speedInKm = speed * 3.6;
  return speedInKm;
}


function cityNotFound(textError){
  if(textError != null){
    $textError.innerText = textError
  }
  $cardError.classList.toggle('toggleCardError')
}

function searchDom(caminho){
  const elementDom = document.querySelector(caminho);
  return elementDom;
}
