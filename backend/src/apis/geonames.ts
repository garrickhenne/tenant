import axios from "axios";
import { ILocation } from "../model/Property";

axios.defaults.timeout = 120000;
export const getCoordinateByPostalCode = async(postalCode: string): Promise<ILocation> => {
  const GEONAME_KEY = process.env.GEONAME_API_USERNAME;
  const coordinate: ILocation = {
    type: 'Point',
    coordinates: [1, 1]
  };

  return axios.get(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${postalCode}&maxRows=1&username=${GEONAME_KEY}`)
    .then(response => response.data)
    .then(responseCoordinate => {
      console.log(responseCoordinate);
      if (!responseCoordinate || !responseCoordinate.postalCodes || !responseCoordinate.postalCodes[0]) {
        return coordinate;
      }

      console.log('Coordinate retrieval successful for postalcode', postalCode);
      coordinate.coordinates[0] = responseCoordinate.postalCodes[0].lat;
      coordinate.coordinates[1] = responseCoordinate.postalCodes[0].lng;

      return coordinate;
    })
    .catch(err => {
      console.log('Coordinate generation failed, returned blank coordinates. Error: ', err);
      return coordinate;
    });
};