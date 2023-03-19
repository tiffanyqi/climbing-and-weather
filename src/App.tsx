import * as React from "react";
import HourWeatherCard from "./components/HourWeatherCard";

import Map from "./components/Map/Map";
import Modal from "./components/Modal";
import Spinner from "./components/Spinner";
import WeatherCard from "./components/WeatherCard";
import "./styles.css";
import { fetchCurrentData, fetchPrevData } from "./util/data";
import { getDateString } from "./util/time";

const DEFAULT_LONGITUDE = -122.63268;
const DEFAULT_LATITUDE = 37.88859;
const DEFAULT_LOCATION = `Mickey's Beach`;
const dayMillisecondOffset = 24 * 60 * 60 * 1000;
const USE_DATASET = false;

export default function App() {
  const [prevWeatherData, setPrevWeatherData] = React.useState([]);
  const [currentWeatherData, setCurrentWeatherData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [timestampInModal, setTimestampInModal] = React.useState(0);
  const [coordinates, setCoordinates] = React.useState({
    longitude: DEFAULT_LONGITUDE,
    latitude: DEFAULT_LATITUDE
  });
  const [location, setLocation] = React.useState(DEFAULT_LOCATION);
  const [isLoading, setIsLoading] = React.useState(true);

  function generateDateString(timestamp) {
    const dateObject = new Date(timestamp);
    const calibratedMonth = dateObject.getMonth() + 1;
    const month = calibratedMonth > 9 ? calibratedMonth : `0${calibratedMonth}`;
    return `${dateObject.getUTCFullYear()}-${month}-${dateObject.getDate()}`;
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleShowHourBreakdown(timestamp) {
    setTimestampInModal(timestamp);
    setShowModal(true);
  }

  function handleGenerateWeather(properties) {
    const { latitude, longitude, location } = properties;
    setCoordinates({ latitude, longitude });
    setIsLoading(true);
    setLocation(location);
  }

  React.useEffect(() => {
    setIsLoading(true);
    const today = new Date().getTime();
    const yesterday = today - dayMillisecondOffset;
    const twoDaysAgo = today - 2 * dayMillisecondOffset;
    const yesterdayString = generateDateString(yesterday);
    const todayString = generateDateString(today);
    const twoDaysAgoString = generateDateString(twoDaysAgo);
    const twoDaysFromToday = today + 14 * dayMillisecondOffset;
    const twoDaysFromTodayString = generateDateString(twoDaysFromToday);

    const fetchPrev = async () => {
      await fetchPrevData(
        USE_DATASET,
        coordinates.latitude,
        coordinates.longitude,
        twoDaysAgoString,
        yesterdayString
      ).then((res) => {
        setPrevWeatherData(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    };
    fetchPrev();

    const fetchCurrent = async () => {
      await fetchCurrentData(
        USE_DATASET,
        coordinates.latitude,
        coordinates.latitude,
        todayString,
        twoDaysFromTodayString
      ).then((res) => {
        setCurrentWeatherData(res);
      });
    };
    fetchCurrent();
  }, [coordinates]);

  const date = getDateString(timestampInModal);

  return (
    <div className="root">
      <Map
        longitude={coordinates.longitude}
        latitude={coordinates.latitude}
        generateWeather={handleGenerateWeather}
      />
      <div className="placeholder" />
      {isLoading ? (
        <div className="loading-container">
          <Spinner />
          Generating the Weather
        </div>
      ) : (
        <div className="container">
          <div className="title">Weather for {location}</div>
          <div className="weather-cards">
            {currentWeatherData?.map((cardData, idx) => {
              const {
                timestamp,
                category,
                precip,
                precipitationProbability,
                tempmax,
                tempmin
              } = cardData;

              const yesterday = [...prevWeatherData, ...currentWeatherData][
                idx + 1
              ];
              const twoDaysAgo = [...prevWeatherData, ...currentWeatherData][
                idx
              ];
              let pastPrecipitation = yesterday?.precip + twoDaysAgo?.precip;
              return (
                <WeatherCard
                  key={timestamp}
                  timestamp={timestamp}
                  category={category}
                  tempmax={tempmax}
                  tempmin={tempmin}
                  precipitationProbability={precipitationProbability}
                  pastPrecipitation={pastPrecipitation.toFixed(2)}
                  precipitation={precip}
                  showHourBreakdownFn={() => handleShowHourBreakdown(timestamp)}
                />
              );
            })}
          </div>
        </div>
      )}
      {showModal && (
        <Modal closeModal={handleCloseModal}>
          <div className="hour-weather-cards-container">
            <div className="hour-weather-cards-title">
              <div>{date}</div>
            </div>
            <div className="hour-weather-cards">
              {currentWeatherData
                .find((cardData) => {
                  return cardData.timestamp === timestampInModal;
                })
                .hours?.map((cardData) => {
                  const {
                    timestamp,
                    category,
                    precip,
                    precipitationProbability,
                    temp,
                    windspeed
                  } = cardData;
                  return (
                    <HourWeatherCard
                      key={timestamp}
                      timestamp={timestamp}
                      category={category}
                      temp={temp}
                      precipitationProbability={precipitationProbability}
                      precipitation={precip}
                      windspeed={windspeed}
                    />
                  );
                })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
