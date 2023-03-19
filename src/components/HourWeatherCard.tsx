import { getTimeString } from "../util/time";
import { getIcon } from "../util/weather";

import style from "./HourWeatherCard.module.scss";

type HourWeatherCardProps = {
  timestamp: number;
  category: string;
  temp: number;
  precipitation: number;
  precipitationProbability: number;
  windspeed: number;
};

export default function HourWeatherCard(props: HourWeatherCardProps) {
  const time = getTimeString(props.timestamp);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div>{time}</div>
      </div>
      {getIcon(props.category)}
      <div>{props.temp}F</div>
      <div>{props.precipitation} in</div>
      <div>{props.precipitationProbability}%</div>
      <div>{props.windspeed} mph</div>
    </div>
  );
}
