import { useEffect, useState } from "react";
import "../styles/css/weather-icons-wind.css";
import "../styles/css/weather-icons-wind.min.css";
import "../styles/css/weather-icons.css";
import "../styles/css/weather-icons.min.css";


function CurrentDate(data, tempUnits) {
    //add daysFromToday Prop

    let currentDate = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDay = weekday[currentDate.getDay()];
    let date = currentDate.toLocaleDateString();
    let time = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

    let currentEpochTime = (Math.round(currentDate.getTime() / 1000.0))
    let sunset = data.data.sys.sunset;
    let sunrise = data.data.sys.sunrise;

    let degreesCelcius = "\u00B0C";
    let degreesFarenheit = "\u00B0F";

    function unixTimeConverter(unixTime) {
        let date = new Date(unixTime * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        // let seconds = "0" + date.getSeconds();
        if (hours > 12) {
            hours = hours - 12;
        }
        let formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    function weatherDataMainToIcon(weatherType) {
        switch (weatherType) {
            case "Thunderstorm": return <i className="wi wi-thunderstorm"></i>
            case "Drizzle": return <i className="wi wi-sprinkle"></i>
            case "Rain": return <i className="wi wi-showers"></i>
            case "Snow": return <i className="wi wi-snow"></i>
            case "Clouds": return <i className="wi wi-cloudy"></i>
            case "Clear":
                if (currentEpochTime < data.data.sys.sunset) {
                    return <i className="wi wi-day-sunny"></i>
                }
                return <i className="wi wi-night-clear"></i>
        }
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function farenheitToCelcius(tempF){
        let tempC = ((tempF - 32) * 5 / 9).toFixed(2);
        return tempC;
    }


    return (
        <>
            <div className="current-weather-left">
                <div className="date">{currentDay}, {date} </div>
                <div className="time">{time}</div>
                <div className='city'>{data.data.name},{data.data.sys.country}</div>
                <div className='weather-description'>{toTitleCase(data.data.weather[0].description)}</div>
                <div className="icon">{weatherDataMainToIcon(data.data.weather[0].main)}</div>
                <div className='main-temperature'>
                    {data.tempUnits == "F" ? data.data.main.temp + degreesFarenheit: farenheitToCelcius(data.data.main.temp) + degreesCelcius}
                    </div>
                <div className='main-temperature-high'>H:{data.tempUnits == "F" ? data.data.main.temp_max + degreesFarenheit: farenheitToCelcius(data.data.main.temp_max) + degreesCelcius} </div>
                <div className='main-temperature-low'>L:{data.tempUnits == "F" ? data.data.main.temp_min + degreesFarenheit: farenheitToCelcius(data.data.main.temp_min) + degreesCelcius} </div>            </div>

            <div className='current-weather-right'>
                <div className='feels-like'>
                    <i className="wi wi-thermometer" id="right-icon"></i>
                    <div>
                        <div>Feels Like</div>
                        <div>{data.tempUnits == "F" ? data.data.main.feels_like + degreesFarenheit: farenheitToCelcius(data.data.main.feels_like) + degreesCelcius}</div>
                    </div>
                </div>
                <div className='humidity'>
                    <i className="wi wi-humidity" id="right-icon"></i>
                    <div>
                        <div>Humidity</div>
                        <div>{data.data.main.humidity}%</div>
                    </div>
                </div>
                <div className='wind'>
                    <i className="wi wi-strong-wind" id="right-icon"></i>
                    <div>
                        <div>Wind Speed</div>
                        <div>{data.data.wind.speed} km/hr</div>
                    </div>
                </div>
                <div className='sunrise'>
                    <i className="wi wi-horizon-alt" id="right-icon"></i>
                    <div>
                        <div>Sunrise</div>
                        <div>{unixTimeConverter(data.data.sys.sunrise) + " AM"}</div>
                    </div>
                </div>
                <div className='sunset'>
                    <i className="wi wi-horizon" id="right-icon"></i>
                    <div>
                        <div>Sunset</div>
                        <div>{unixTimeConverter(data.data.sys.sunset) + " PM"}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentDate;