import { getDateString } from "../util/time";
import { getIcon } from "../util/weather";

import buttonStyle from "./Button.module.scss";
import style from "./WeatherCard.module.scss";

type WeatherCardProps = {
  timestamp: number;
  category: string;
  tempmin: number;
  tempmax: number;
  pastPrecipitation: number;
  precipitation: number;
  precipitationProbability: number;
  showHourBreakdownFn: () => void;
};

export default function WeatherCard(props: WeatherCardProps) {
  const date = getDateString(props.timestamp);

  let canClimb = "Weather looks good from the past 48 hours!";
  let climbStatus = "Good to Climb!";
  if (props.pastPrecipitation > 0.1) {
    canClimb = `It is forecasted that there will be ${props.pastPrecipitation} inches of precipitation in the last 48 hours. The probability that there will be more precipitation today is ${props.precipitationProbability}%.`;
    climbStatus = "DO NOT CLIMB";
  } else if (props.precipitationProbability > 40) {
    canClimb = `There is a ${props.precipitationProbability}% chance of precipitation today, accumulating ${props.precipitation} inches.`;
    climbStatus = "DO NOT CLIMB";
  } else if (props.pastPrecipitation > 0) {
    canClimb = `Be careful, it is forecasted that there will be ${props.pastPrecipitation} inches of precipitation in the last 48 hours. The probability that there will be more precipitation today is ${props.precipitationProbability}%.`;
    climbStatus = "Climb with Caution";
  } else if (props.precipitationProbability > 0) {
    canClimb = `Be careful, there is a ${props.precipitationProbability}% chance of precipitation today, accumulating ${props.precipitation} inches.`;
    climbStatus = "Climb with Caution";
  }

  const climbStatusClass =
    climbStatus === "Good to Climb!"
      ? `green`
      : climbStatus === "Climb with Caution"
      ? `yellow`
      : `red`;

  function handleButtonClick() {
    props.showHourBreakdownFn();
  }

  return (
    <div className={style.container}>
      <div className={style.topContainer}>
        <div className={style.title}>
          <div>{date}</div>
        </div>
        {getIcon(props.category)}
        <div>
          {props.tempmax}F / {props.tempmin}F
        </div>
        <div className={`${style.climbStatus} ${style[climbStatusClass]}`}>
          {climbStatus}
        </div>
        <div className={style.description}>{canClimb}</div>
      </div>
      <button className={buttonStyle.btn} onClick={handleButtonClick}>
        Hour by Hour Breakdown
      </button>
    </div>
  );
}
