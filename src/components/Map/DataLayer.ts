import bayAreaRopeData from "../../db/bay-rope.json";
import { BLUE } from "../../theme/colors";

export const SPORT_LAYER_ID = `sport-data`;
export const SPORT_DATA_LAYER = {
  type: "FeatureCollection",
  features: bayAreaRopeData
    .filter((data) => {
      return data["Route Type"].includes("Sport");
    })
    .map((data) => {
      const locationSplit = data.Location.split(` >`);
      const location = `${locationSplit[0]}, ${locationSplit[1]}`;
      const pitchString =
        data.Pitches > 1 ? `${data.Pitches} pitches` : `1 pitch`;
      let pitchInfo = `${pitchString}`;
      if (data.Length) {
        pitchInfo += `, ${data.Length} feet`;
      }
      const longitude = data[`Area Longitude`];
      const latitude = data[`Area Latitude`];
      return {
        type: `Feature`,
        geometry: {
          type: `Point`,
          coordinates: [longitude, latitude]
        },
        properties: {
          name: data.Route,
          location,
          url: data.URL,
          avgStars: data[`Avg Stars`],
          grade: data.Rating,
          pitchInfo,
          longitude,
          latitude
        }
      };
    })
};
export const SPORT_LAYER_STYLE = {
  id: SPORT_LAYER_ID,
  type: `circle`,
  paint: {
    "circle-radius": 10,
    "circle-color": BLUE
  }
};
