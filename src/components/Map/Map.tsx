import * as React from "react";
import Map, { Source, Layer } from "react-map-gl";

import buttonStyle from "../Button.module.scss";

import {
  SPORT_DATA_LAYER,
  SPORT_LAYER_ID,
  SPORT_LAYER_STYLE
} from "./DataLayer";
import style from "./Map.module.scss";

export default function MapBox(props) {
  // A circle of 100 mile radius of the bay area
  // const GEOFENCE = turf.circle([props.longitude, props.latitude], 100, {
  //   units: "miles"
  // });

  const [coordinates] = React.useState({
    longitude: props.longitude,
    latitude: props.latitude,
    zoom: 7
  });

  const [hoverInfo, setHoverInfo] = React.useState(null);

  const onHover = React.useCallback((event) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      setHoverInfo({ feature: hoveredFeature, x, y });
    } else {
      setHoverInfo(null);
    }
  }, []);

  const handleButtonClick = (properties) => {
    props.generateWeather(properties);
  };

  const Tooltip = ({ properties, x, y }) => {
    return (
      <div className={style.tooltip} style={{ left: x, top: y }}>
        <div className={style.name}>
          {properties.name},{` `}
          {properties.grade}
        </div>
        <div>
          <a href={properties.url} target="_blank" rel="noreferrer">
            {properties.location}
          </a>
        </div>
        <div>Avg Stars: {properties.avgStars} / 5</div>
        <div>{properties.pitchInfo}</div>
        <button
          onClick={() => handleButtonClick(properties)}
          className={buttonStyle.btn}
        >
          Check Weather
        </button>
      </div>
    );
  };

  return (
    <Map
      initialViewState={coordinates}
      onMouseMove={onHover}
      interactiveLayerIds={[SPORT_LAYER_ID]}
      style={{
        height: `50%`,
        width: `100%`,
        position: `fixed`
      }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <Source id="sports-data" type="geojson" data={SPORT_DATA_LAYER}>
        <Layer {...SPORT_LAYER_STYLE} />
      </Source>
      {hoverInfo && (
        <Tooltip
          properties={hoverInfo.feature.properties}
          x={hoverInfo.x}
          y={hoverInfo.y}
        />
      )}
    </Map>
  );
}
