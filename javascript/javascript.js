class AjaxData{
constructor(){
    this.apiKey= `42146ed74f3ee6c7c1cd9026f46ee00a`;
}
    async getDataweather(inputform){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputform}&APPID=${this.apiKey}&units=metric`;
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
    
}

class Display{
constructor(){
     this.displaycontent = document.querySelector(".content-display");
     this.city = document.getElementById("cityName");
     this.countryname = document.getElementById("countryName");
     this.desc= document.getElementById("description");
     this.icons = document.getElementById("weatherIcon");
     this.temp = document.getElementById("temp");
     this.tempmax = document.getElementById("temp-max");
     this.tempmin = document.getElementById("temp-min");
}
showWeather(data){
    const {
        name,
        sys: {country},
        main: {temp, temp_min, temp_max}
    } = data;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    console.log(name);
    this.displaycontent.classList.add("show");
    this.city.textContent = name;
    this.countryname.textContent = country;
    this.desc.textContent = description;
    this.temp.textContent = temp;
    this.tempmax.textContent = temp_max;
    this.tempmin.textContent = temp_min;
    this.icons.src = `http://openweathermap.org/img/w/${icon}.png`;
}
}
(function() {
const searchname = document.getElementById("searchfor-coutry");
const form =  document.getElementById("submit-form");
const error = document.querySelector(".error-message");
const displaycontent = document.querySelector(".content-display");
const errorlist = document.querySelector(".error-message-content");
const ajax = new AjaxData();
const display = new Display();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
        const inputform = searchname.value;
        
        if(inputform.length === 0){

            showerrormessage("City value cannot be empty");
        }
        else{
            error.classList.remove("show");
            ajax.getDataweather(inputform).then(data => {
                if(data.message === 'city not found'){
                    showerrormessage(`City not found`);
                    displaycontent.classList.remove("show");
                }
                else{
                     display.showWeather(data)
                }
            }
        );}
    });

    function showerrormessage(text){
        error.classList.add("show");
        errorlist.innerHTML = `<li>${text}</li>`;
    }
})();
