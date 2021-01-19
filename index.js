const $input = searchDom('#input');
const $form = searchDom('#form');
const $temperature = searchDom('#temperature');
const $cityName = searchDom('#cityName');
const $descriptionWeather = searchDom('#descriptionWeather');
const $humidity = searchDom('#humidity');
const $speed = searchDom('#speed');
const $tempmax = searchDom('#tempmax');
const $tempmin = searchDom('#tempmin');

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8f5e6de9230285a98d0544d469bd972b';

$form.addEventListener('submit', (event)=> {
  event.preventDefault();

  const nameCityInput = $input.value;

  if(nameCityInput == ''){
    alert("field cannot be empty");
    return;
  }

  callApi(nameCityInput)

  $input.value = '';
})


function callApi(nameCity){
  fetch(`${baseUrl}?q=${nameCity}&appid=${apiKey}`)
      .then((response)=> {  
        return response.json();
      })
      .then((data)=> {
        manipulateData(data);
      })
      .catch((error)=>{
        console.log('Deu ruim: ', error)
      })
}


function manipulateData(data){
  const newTem = transformKelvinToCelcius(data.main.temp.toFixed(0));
  $temperature.innerText = `${newTem}º`

  $cityName.innerText = data.name;
  $descriptionWeather.innerText = data.weather[0].description;
  $humidity.innerText = `${data.main.humidity}%`;

  const newSpeed = transformMsToKm(data.wind.speed.toFixed(0))
  $speed.innerText = `${newSpeed} km/h`;

  const newTempMax = transformKelvinToCelcius(data.main.temp_max.toFixed(0));
  $tempmax.innerText = `${newTempMax}º`;

  const newTempMin = transformKelvinToCelcius(data.main.temp_min.toFixed(0));
  $tempmin.innerText = `${newTempMin}º`;

}

function transformKelvinToCelcius(temp){
  const tempInCelcius =  temp - 273.15;
  return tempInCelcius.toFixed(0)
}

function transformMsToKm(speed){
  const speedInKm = speed * 3.6;
  return speedInKm;
}

function searchDom(caminho){
  const elementDom = document.querySelector(caminho);
  return elementDom;
}
