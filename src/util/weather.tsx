export function getIcon(category) {
  if (category === "rain") {
    return (
      <img
        alt="rain-icon"
        src="https://ssl.gstatic.com/onebox/weather/48/rain.png"
      />
    );
  }

  if (category === "snow") {
    return (
      <img
        alt="snow-icon"
        src="https://ssl.gstatic.com/onebox/weather/48/snow_light.png"
      />
    );
  }

  if (category === "partly-cloudy-day") {
    return (
      <img
        alt="partly-cloudy-icon"
        src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
      />
    );
  }

  if (category === "clear-day") {
    return (
      <img
        alt="sunny-icon"
        src="https://ssl.gstatic.com/onebox/weather/48/sunny.png"
      />
    );
  }

  if (category === "cloudy") {
    return (
      <img
        alt="cloudy-icon"
        src="https://ssl.gstatic.com/onebox/weather/48/cloudy.png"
      />
    );
  }

  if (category === "partly-cloudy-night") {
    return (
      <img
        alt="cloudy-night-icon"
        src="https://icons.iconarchive.com/icons/icons8/android/512/Weather-Partly-Cloudy-Night-icon.png"
        style={{ height: "48px", width: "48px" }}
      />
    );
  }

  if (category === "clear-night") {
    return (
      <img
        alt="clear-night-icon"
        src="https://cdn.iconscout.com/icon/free/png-256/weather-clear-night-3186139-2681199.png"
        style={{ height: "48px", width: "48px" }}
      />
    );
  }
}
