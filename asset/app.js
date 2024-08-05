let search = document.querySelector('.search');
let city = document.querySelector('.city');
let country = document.querySelector('.country');
let value = document.querySelector('.temperature .value');
let shortDesc = document.querySelector('.short-desc');
let visibility = document.querySelector('.visibility span');
let wind = document.querySelector('.wind span');
let humidity = document.querySelector('.humidity span');
let time = document.querySelector('.time');
let content = document.querySelector('.content');
let body = document.querySelector('body');

async function changeWeather(valueInput) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${valueInput}&appid=8ac512538acdc6015db050f518c78280`
    let data = await fetch(apiUrl).then(res=> res.json());
    console.log(data)
    if(data.cod == 200){
        content.classList.remove('hide')    
        city.innerText = data.name
        country.innerText = data.sys.country
        visibility.innerText = data.visibility + '(m)'
        wind.innerText = data.wind.speed + '(m/s)'
        let weatherStatus = data.weather[0].main
        shortDesc.innerText = weatherStatus
        humidity.innerText = data.main.humidity + '(%)'
        value.innerText = (data.main.temp - 273.15).toFixed(0)
        time.innerText = new Date().toLocaleString('vi');
        
        body.setAttribute('class', 'clouds');
        if(weatherStatus == 'Clousd'){
            body.setAttribute('class', 'clouds');
        }
        if(weatherStatus == 'Clear'){
            body.setAttribute('class', 'Sun');
        }
        if(weatherStatus == 'Rain'){
            body.setAttribute('class', 'Rain');
        }
        if(weatherStatus == 'Snow'){
            body.setAttribute('class', 'Snow');
        }


    }else{
        content.classList.add('hide')
        alert("Không thể lấy dữ liệu thời tiết");
    }
}

do {
    changeWeather('Hanoi');
} while (false);

search.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        changeWeather(search.value.trim());
    }
})
