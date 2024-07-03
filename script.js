const apiKey = 'f518674d26417788c0b9426dccc02aaa';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
iconSrc = 'https://openweathermap.org/img/wn/';

const Location = document.querySelector('#city-name');
const description = document.querySelector('#desc');
const dateTime = document.querySelector('#date-time');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const temperature = document.querySelector('#temp');
const icon = document.querySelector('#icon');


const searchloc = document.querySelector('#city');
document.querySelector('#searchLocation').addEventListener('click', async ()=>{
    console.log(searchloc.value);
    const newapiUrl = apiUrl + `?q=${searchloc.value.trim()}&appid=${apiKey}`;
    const res = await fetch(newapiUrl).then((result)=>{
        if(result.status == 200){
            const date = new Date();
            result.json().then((data)=>{
                // console.log(data.id, data.name);
                Location.innerHTML = `City name: ${data.name}`;
                dateTime.innerHTML = `${date.toLocaleString()}`;
                description.innerHTML = `Description: ${data.weather[0].description}`;
                humidity.innerHTML = `Humidity: ${data.main.humidity}`;
                windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
                temperature.innerHTML = `Temperature: ${(data.main.temp-273.15).toPrecision(4)} &#8451`;
                const newSrc = iconSrc + `${data.weather[0].icon}` + '@2x.png';
                console.log(newSrc);
                icon.setAttribute('src', newSrc);
            });
        }
        else{
            document.querySelector('.weather-info').innerHTML = '';
            const p = document.createElement('p');
            p.setAttribute('style', 'font-size: 1.3em');
            p.innerHTML = "City does not exist. Try again.";
            document.querySelector('.weather-info').appendChild(p);
        }
    });
})

document.querySelector('#city').addEventListener("keyup", (e)=>{
    if (e.keyCode == 13){
        searchLocation.click();
    }
})