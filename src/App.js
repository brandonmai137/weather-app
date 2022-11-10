import './App.css';
import FutureDates from './components/FutureDates';
import CurrentDate from './components/CurrentDate';
import { useEffect, useState, useRef } from "react";
import { getLocationByCityName, getDataByCoordinates, getFutureDataByCoordinates, getLocationByCityCountryName } from "./services/WeatherApiService"
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Footer from './components/Footer';


function App() {
  const [city, setCity] = useState("Las Vegas");
  const [country, SetCountry] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(null);
  const [futureData, setFutureData] = useState(null);
  const [errs, setErrs] = useState([]);
  const [tempUnits, setTempUnits] = useState("F")
  const newCity = useRef(city);
  const checkbox = useRef(null);

  // useEffect(() => {
  //   if (city) {
  //     getCurrentDataByCity(city)
  //       .then(setData)
  //       .then(() => setErrs([]))
  //       .catch(() => setErrs(["oops something went wrong"]))
  //   }
  // }, [city])
  useEffect(() => {
    if (city && country) {
      getLocationByCityCountryName(city, country)
        .then((location) => {
          setLatitude(location[0].lat);
          setLongitude(location[0].lon);
        })
        .then(() => setErrs([]))
        .catch(() => setErrs(["Invalid Location, Try again. (\"city\" or \"city,country code\")"]))
    }

    else if (city) {
      getLocationByCityName(city)
        .then((location) => {
          setLatitude(location[0].lat);
          setLongitude(location[0].lon);
        })
        .then(() => setErrs([]))
        .catch(() => setErrs(["Invalid Location, Try again. (\"city\" or \"city,country code\")"]))

    }
  }, [city, country])

  // useEffect(() => {
  //   if (city) {
  //     getLocationByCityName(city)
  //       .then((location) => {
  //         setLatitude(location[0].lat);
  //         setLongitude(location[0].lon);
  //       })
  //       .then(() => setErrs([]))
  //       .catch(() => setErrs(["Invalid Location, Try again. (\"city\" or \"city,country code\")" ]))

  //   }
  // }, [city])

  useEffect(() => {
    if (latitude && longitude) {
      getDataByCoordinates(latitude, longitude).then(setData);
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (latitude && longitude) {
      getFutureDataByCoordinates(latitude, longitude).then(setFutureData);
    }
  }, [latitude, longitude])


  function handleLocationChange(evt) {
    if (!((newCity.current.value).includes(","))) {
      let newLocation = newCity.current.value;
      setCity(newLocation);
    }
    else {
      let locationArray = (newCity.current.value).split(",")
      setCity(locationArray[0]);
      SetCountry(locationArray[1]);

    }
  }

  function handleTempUnitsChange() {
    if (tempUnits == "F") {
      setTempUnits("C")
    }
    else {
      setTempUnits("F");
    }

  }

  function handleKeyDown(evt) {
    if (evt.key === 'Enter') {
      return true;
    }
    return false;
  }

  return (
    <div>
      <div className='header'>
        <Header />
        <div className='search'>
          {
            errs.length !== 0 &&
            <div className='errors'>
              {errs.map(err => <p key={err}>{err}</p>)}
            </div>
          }
          <input
            className='search-input'
            placeholder='Enter a City'
            ref={newCity}
            onKeyDown={evt => {
              if (evt.key === 'Enter') {
                handleLocationChange();
              }
            }}></input>
          <button className="search-button" onClick={handleLocationChange}><FontAwesomeIcon icon={faSearch} /></button>
        </div>
        <div className='temp-switch'>
          <label class="switch">
            <input type="checkbox" ref={checkbox} onClick={handleTempUnitsChange}></input>
            <span class="slider round">
              <div>
                {"\u00B0"}C
              </div>
              <div>
                {"\u00B0"}F
              </div>
            </span>
          </label>
        </div>
      </div>

      {data && futureData &&
        <div className='main'>

          <main>
            <CurrentDate data={data} daysFromToday={0} tempUnits={tempUnits} />
          </main>


          <div className='future-date-container'>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={1} tempUnits={tempUnits} /></div>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={2} tempUnits={tempUnits} /></div>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={3} tempUnits={tempUnits} /></div>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={4} tempUnits={tempUnits} /></div>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={5} tempUnits={tempUnits} /></div>
            <div className="future-date"><FutureDates data={futureData} daysFromToday={6} tempUnits={tempUnits} /></div>
          </div>
        </div>
      }
      <Footer />
    </div>

  );
}

export default App;
