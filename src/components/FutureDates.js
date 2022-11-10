import { useState, useEffect } from "react";
import "../styles/css/weather-icons-wind.css";
import "../styles/css/weather-icons-wind.min.css";
import "../styles/css/weather-icons.css";
import "../styles/css/weather-icons.min.css";



function FutureDates(data, daysFromToday, tempUnits) {

    const [dateIndex, setDateIndex] = useState(null);
    const [day, setDay] = useState("");

    let currentDate = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDayNum = currentDate.getDay();
    let currentDay = weekday[currentDate.getDay()];


    let degreesCelcius = "\u00B0C";
    let degreesFarenheit = "\u00B0F";

    useEffect(() => {
        if (data.daysFromToday) {
            switch (data.daysFromToday) {
                case 1: setDateIndex(3);
                    break;
                case 2: setDateIndex(11);
                    break;
                case 3: setDateIndex(19);
                    break;
                case 4: setDateIndex(27);
                    break;
                case 5: setDateIndex(35);
                    break;
                case 6: setDateIndex(39);
                    break;
            }
        }
    }, [daysFromToday])

    useEffect(() => {
        if (data.daysFromToday) {
            let dayNum = getForecastDay(currentDayNum, data.daysFromToday);
            setDay(weekday[dayNum]);
        }


    }, [daysFromToday])


    function getForecastDay(currentDayNum, daysFromToday) {
        let forecastDay = 0;
        if (currentDayNum + daysFromToday < 7) {
            forecastDay = currentDayNum + daysFromToday;
            return forecastDay;
        }

        forecastDay = currentDayNum + daysFromToday - 7;
        return forecastDay;
    }

    function weatherDataMainToIcon(weatherType) {
        switch (weatherType) {
            case "Thunderstorm": return <i className="wi wi-thunderstorm"></i>
            case "Drizzle": return <i className="wi wi-sprinkle"></i>
            case "Rain": return <i className="wi wi-showers"></i>
            case "Snow": return <i className="wi wi-snow"></i>
            case "Clear": return <i className="wi wi-day-sunny"></i>
            case "Clouds": return <i className="wi wi-cloudy"></i>
        }
    }

    function farenheitToCelcius(tempF){
        let tempC = ((tempF - 32) * 5 / 9).toFixed(2);
        return tempC;
    }


    return (
        <div>
            {dateIndex &&
                <div className="forecast">
                    <div className="forecast-day">{day}</div>
                    {weatherDataMainToIcon(data.data.list[dateIndex].weather[0].main)}
                    <div className="forecast-temp">{data.tempUnits == "F" ? data.data.list[dateIndex].main.temp + degreesFarenheit: farenheitToCelcius(data.data.list[dateIndex].main.temp) + degreesCelcius} {}</div>
                </div>
            }
        </div>
    )
}

export default FutureDates;