import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';

// DO NOT REMOVE THIS CSS FILE.
// IF YOU MOVE IT MAKE SURE THE MARKERS AND THE MAP CAN REFERENCE THIS
// BECAUSE THERE IS BLACK MAGIC HAPPENING WITH THE CSS THAT IS ESSENTIAL
import 'mapbox-gl/dist/mapbox-gl.css';
import MapModal from '../components/MapModal/MapModal';

// VITE Automatically looks into ENV files.  Anything prefixed with VITE_ can be used like this:
const MAPBOX_TOKEN = import.meta.env.VITE_MAP_BOX_API_KEY;
const GEONAME_USERNAME = import.meta.env.VITE_GEONAME_API_USERNAME;

const Map = () => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | Map';

    return () => document.title = oldTitle;
  }, []);

  const [postalCode, setPostalCode] = useState('');
  const [viewport, setViewport] = useState({
    longitude: -122.85374,
    latitude: 49.188362,
    zoom: 9,

  });
  const [markers, setMarkers] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const closeModal = (e) => {
    setOpenModal('');
    
    // This right here took me an hour to figure out.
    e.stopPropagation();
  };

  // We have to call geonames when we search for postal code in input component.
  const handlePostalCode = function(e) {
    const newPostalCode = e.target.value;
    setPostalCode(newPostalCode);
    console.log("postalCode", newPostalCode);
    axios.get(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${newPostalCode}&maxRows=1&username=${GEONAME_USERNAME}`)
      .then(response => {

        if (response.data.postalCodes[0]) {
          const lng = response.data.postalCodes[0].lng;
          const lat = response.data.postalCodes[0].lat;
          // console.log("lng", lng, "lat", lat);
          setViewport(prevViewPort => ({
            ...prevViewPort,
            latitude: lat,
            longitude: lng
          }));
        }
      }).catch(error => {
        console.log(error);
      });


  };


  // make api call to fetch properties
  // use state to update the list of properties
  // in render,  {markers.map((marker) => (...) where markers is the useState state
  useEffect(() => {

    axios.get('/api/getAllProperties')
      .then(response => {
        convertTomarkerInfo(response.data);
      });

  }, []);

  /* We want an array that looks like this:
    Each array item is an object with postal code. Each postal code object contains its location data + all landlords
    that have a property on that postal code.
    [
     {
      postalCode: 'V5N-2C4',
      lat: 54.441951751709,
      long: -124.247741699219,
      landlords: [{ landlord1... }, { landlord2... } ...]
     }
    ]
  */
  const convertTomarkerInfo = async function(data) {
    if (!data) {
      return;
    }

    const populatedPostalCodes = [];

    for (const postalData of data) {
      const landlordData = {
        ...postalData.landlordId,
        streetName: postalData.streetName,
        streetNumber: postalData.streetNumber
      };

      const foundIndex = populatedPostalCodes.findIndex(postal => postalData.postalCode === postal.postalCode);

      // populatedPostalCodes has postal code set up already. Append this landlord to the list of landlords.
      if (foundIndex >= 0) {
        populatedPostalCodes[foundIndex].landlords.push(landlordData);
        continue;
      }

      // First postal code populatedPostalCodes has seen, set it up as array.
      populatedPostalCodes.push({
        postalCode: postalData.postalCode,
        long: postalData.location.coordinates[1],
        lat: postalData.location.coordinates[0],
        landlords: [landlordData]
      });
    }

    console.log('populatedPostalCodes:', populatedPostalCodes);
    setMarkers([...populatedPostalCodes]);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={evt => setViewport((prevState) => evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: 650 }}
      >
        <ul>
          {markers.map(marker => {

            const postalCode = marker.postalCode;
            const landlords = marker.landlords;

            return (
              <li key={postalCode}>
                <Marker
                  latitude={marker.lat}
                  longitude={marker.long}
                  offsetLeft={10}
                  offsetTop={10}>
                  <div
                    // TODO Launch Modal here.  'details' has all info
                    onClick={() => setOpenModal(() => postalCode)}
                    className="marker">{ marker.landlords.length }
                    {openModal === postalCode && <MapModal landlords={landlords} openModal={openModal} closeModal={closeModal} />}
                  </div>
                </Marker>
              </li>
            );
          })}
        </ul>
      </ReactMapGL>
      <input
        className="pl-4 bg-transparent border-solid border-2 border-white rounded-full h-11 mt-5 focus:outline-none text-slate-200"
        placeholder="Enter a Postal Code"
        required
        value={postalCode}
        onChange={(e) => handlePostalCode(e)}
      />
    </div>
  );
};

export default Map;