import setWeatherData from "../db/weather-example.json";

const URL_BASE = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

export const fetchPrevData = async (
  useDataSet,
  latitude,
  longitude,
  twoDaysAgo,
  yesterday
) => {
  let prevData = [];

  const formatData = (day) => {
    return {
      timestamp: day.datetimeEpoch * 1000,
      precip: day.precip
    };
  };

  if (useDataSet) {
    setWeatherData.days.slice(0, 2).forEach((day) => {
      prevData.push(formatData(day));
    });
    return prevData;
  } else {
    await fetch(
      `${URL_BASE}/${latitude}%2C${longitude}/${twoDaysAgo}/${yesterday}?unitGroup=us&include=days&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}&contentType=json`
    )
      .then((res) => res.json())
      .then((result) => {
        result.days.forEach((day) => {
          prevData.push(formatData(day));
        });
      });
    return prevData;
  }
};

export const fetchCurrentData = async (
  useDataSet,
  latitude,
  longitude,
  today,
  twoDaysFromToday
) => {
  let currentData = [];

  const formatData = (day) => {
    return {
      timestamp: day.datetimeEpoch * 1000,
      category: day.icon,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      precipitationProbability: day.precipprob,
      precip: day.precip,
      hours: day.hours.map((hour) => {
        return {
          timestamp: hour.datetimeEpoch * 1000,
          category: hour.icon,
          temp: hour.temp,
          precipitationProbability: hour.precipprob,
          precip: hour.precip,
          windspeed: hour.windspeed
        };
      })
    };
  };

  if (useDataSet) {
    setWeatherData.days.slice(2, 17).forEach((day) => {
      currentData.push(formatData(day));
    });
    return currentData;
  } else {
    await fetch(
      `${URL_BASE}/${latitude}%2C${longitude}/${today}/${twoDaysFromToday}?unitGroup=us&include=days%2Chours&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}&contentType=json`
    )
      .then((res) => res.json())
      .then((result) => {
        result.days.forEach((day) => {
          currentData.push(formatData(day));
        });
      });
    return currentData;
  }
};
