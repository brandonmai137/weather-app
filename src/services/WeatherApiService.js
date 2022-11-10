const GEO_API_URL = `http://api.openweathermap.org/geo/1.0`;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5` ;

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
