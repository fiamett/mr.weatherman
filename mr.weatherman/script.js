var city = document.getElementById('city');
var submit = document.getElementById('submit');
var results = document.getElementById('results');
var here = document.getElementById('here')
var hist = document.getElementById('history');


function weather(loc) {  
    here.textContent=loc 
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ loc + '&cnt=40&appid=43b46d02b1f98c66bff2d913a3dfb977')
        .then(function (response) {
            res = response.json()
            console.log(res);
            return res;
        })
        .then(function (data) {
            console.log(data)
            if (data.cod == '200'){
            hist.appendChild(document.createElement('li'))
            hist.lastChild.textContent = loc
            hist.lastChild.addEventListener('click',()=>{weather(loc)})
           // adds the current place to the history list then adds an event listener to call the weather function with the input value of it's respective city

            results.innerHTML = '';
            //cleasr the old results when a new one is made
            for (var i = 0 ; i<5 ; i++){
                results.appendChild(document.createElement('ul'))
                results.lastChild.textContent = ('date: '+ moment().add(i, 'days').format('DD/MM/YYYY'));
                results.lastChild.appendChild(document.createElement('li'))
                results.lastChild.lastChild.textContent = ('temp: '+data.list[i*8].main.temp);
                results.lastChild.appendChild(document.createElement('li'))
                results.lastChild.lastChild.textContent = ('humidity: '+data.list[i*8].main.humidity);
                results.lastChild.appendChild(document.createElement('li'))
                results.lastChild.lastChild.textContent = ('wind speed: '+data.list[i*8].wind.speed);
                results.lastChild.appendChild(document.createElement('li'))
                results.lastChild.lastChild.textContent = ('weather: '+data.list[i*8].weather[0].main);
                //creates a li for each respective weather info and fills it with the needed info 
            }}
            else{
                results.innerHTML = '<h1>no city here! (or mispelling)</h1>'
            }
        })
}

submit.addEventListener('click',()=>{weather(city.value)});