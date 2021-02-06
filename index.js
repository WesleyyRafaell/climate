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
const $containerSpinner = searchDom('.containerSpinner');
const $background = searchDom('.background');
const $cardWeather = searchDom('.cardWeather');

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8f5e6de9230285a98d0544d469bd972b';


function init(){
  callApi('São Luís');
}

init()

$form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameCityInput = $input.value;

    if (nameCityInput == '') {
        cityNotFound("field cannot be empty");
        return;
    }

    callApi(nameCityInput)

    $input.value = '';
})

$closeCardErro.addEventListener('click', () => {
    cityNotFound();
})


function callApi(nameCity) {
  waitApiResponse('wait')
  fetch(`${baseUrl}?q=${nameCity}&appid=${apiKey}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        waitApiResponse(data);
        changeBackground(data.weather[0].description)
    })
    .catch((error) => {
        // console.log('Deu ruim: ', error)
        cityNotFound("City not found");
    })
}


function createDataStructure({main, name, weather,wind}) {
  const weatherInformation = {
      temperature: transformKelvinToCelcius(main.temp.toFixed(0)),
      cityName: name,
      descriptionClimate: weather[0].description,
      humidity: main.humidity,
      speed: transformMsToKm(wind.speed.toFixed(0)),
      tempmax: transformKelvinToCelcius(main.temp_max.toFixed(0)),
      tempmin: transformKelvinToCelcius(main.temp_min.toFixed(0))
  }
  insertInformationIntoDom(weatherInformation)
}

function insertInformationIntoDom({ temperature, cityName, descriptionClimate, humidity, speed, tempmax, tempmin}) {
  $temperature.innerText = `${temperature}º`
  $cityName.innerText = cityName;
  $descriptionWeather.innerText = descriptionClimate;
  $humidity.innerText = `${humidity}%`;
  $speed.innerText = `${speed} km/h`;
  $tempmax.innerText = `${tempmax}º`;
  $tempmin.innerText = `${tempmin}º`;
}

function waitApiResponse(response) {
  if (response === 'wait') {
      $containerSpinner.classList.add('open')
      return
  }
  $containerSpinner.classList.remove('open')

  createDataStructure(response)
}

function transformKelvinToCelcius(temp) {
  const tempInCelcius = temp - 273.15;
  return tempInCelcius.toFixed(0)
}

function transformMsToKm(speed) {
  const speedInKm = speed * 3.6;
  return speedInKm;
}

const knownDescription = [
  'clear sky',
  'few clouds',
  'scattered clouds',
  'broken clouds',
  'shower rain',
  'rain',
  'thunderstorm',
  'snow',
  'mist'
]

function changeBackground(description) {
  knownDescription.map(item => {
    // console.log(item, description)
    if(item === description){
      const str = description.replace(/\s/g, '');
      $background.style.background = `url('images/${str}.jpg')center center/cover no-repeat`;
      $cardWeather.style.background = `url('images/${str}.jpg')center center/cover no-repeat`;
    }
  })
}


function cityNotFound(textError) {
  if (textError != null) {
      $textError.innerText = textError
  }
  $cardError.classList.toggle('toggleCardError')
}

function searchDom(caminho) {
  const elementDom = document.querySelector(caminho);
  return elementDom;
}