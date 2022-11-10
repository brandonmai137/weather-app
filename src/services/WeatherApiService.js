const GEO_API_URL = `http://api.openweathermap.org/geo/1.0`;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5` ;
// `weather?lat={lat}&lon={lon}&appid={API key}`


// export async function getCurrentForecast(latitude,longitude) {
//     const init = {
//         method: "GET",
//         headers: {
//             'X-RapidAPI-Key': '271be92f92mshe54a69c1e3d349cp114562jsn338fb94f1398',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//         }
//     };
//     const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude},${longitude}`, init);
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject();
//     }
// }

// export async function getCurrentDataByCity(city) {
//     const init = {
//         method: "GET",
//         headers: {
//             'X-RapidAPI-Key': '271be92f92mshe54a69c1e3d349cp114562jsn338fb94f1398',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//         }
//     };
//     const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=4`, init);
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject();
//     }
// }
export async function getLocationByCityCountryName(city, country){
    const response = await fetch(`${GEO_API_URL}/direct?q=${city},${country}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}


export async function getLocationByCityName(city){
    const response = await fetch(`${GEO_API_URL}/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function getDataByCoordinates(lat,lon){
    const response = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}

export async function getFutureDataByCoordinates(lat,lon){
    const response = await fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject();
    }
}
