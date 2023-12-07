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

    const response = axios.get('/api/getAllProperties')
      .then(response => {
        const markerInfo = convertTomarkerInfo(response.data);
      });

  }, []);

  // We want an array that looks like this:
  // [
  //   {
  //     'v6x1p2': {
  //       streetName: 'charm',
  //       streetNumber: '42',
  //       landlordFirstName: 'Bossman',
  //       landlordLastName: 'Boss',
  //       long: 42.2,
  //       lat: -123.4
  //     },
  //     'v4b1q4': {
  //       streetName: '...',
  //     },
  //   },
  // ];
  const convertTomarkerInfo = async function(data) {

    // data looks like this:
    // [
    //   {
    //     landlordId: { ...landlordRelatedFields },
    //     postalCode: 'V6X1p5',
    //     streetName: 'Charm St',
    //     streetnum: 42
    //   }
    // ];
    if (data) {
      const markersArray = [];

      // TODO throttling myself
      // Just do 5 properties
      for (let i = 0; i < data.length; i++) {
        if (i <= 4) {
          const property = data[i];

          // if it doesn't exist
          const postalCode = property.postalCode;
          const foundObject = markersArray.find(obj =>
            Object.keys(obj)[0] === postalCode);

          if (!foundObject) {

            // TODO: do this call on property creation.  Very expensive to do this on every property fetch.
            const response = await axios.get(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${postalCode}&maxRows=1&username=shumbum`);

            if (response.data.postalCodes) {
              // if it can't find lat long, don't create a marker.
              const coords = response.data.postalCodes[0];
              if (coords) {
                const lng = coords.lng;
                const lat = coords.lat;

                markersArray.push({
                  [postalCode]: {
                    landlordId: property.landlordId._id,
                    streetName: property.streetName,
                    streetNumber: property.streetNumber,
                    long: lng,
                    lat: lat,
                    firstName: property.landlordId.firstName,
                    lastName: property.landlordId.lastName,
                  }
                });
              }
            }
          } else {
            // TODO for future dev who cares about data integrity:
            // if there is an existing postal code
            // AND if any of the following are different,
            //   the street number, street address, landlord first name, last name
            // we would add that to part of the postal code
            // right now the postal code is an object, with one entry, it should be an array.
          }
        }
      }
      setMarkers(markersArray);
    }
  };

  return (
    <div>

      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={evt => setViewport(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ top: 0, left: 0, width: "100vw", position: 'absolute', height: "100vh", zIndex: 0 }}
      >
        <ul>
          {markers.map(marker => {

            const firstKey = Object.keys(marker)[0];
            const details = marker[firstKey];

            return (
              <li key={firstKey}>
                <Marker
                  latitude={details.lat}
                  longitude={details.long}
                  offsetLeft={10}
                  offsetTop={10}>
                  <div
                    // TODO Launch Modal here.  'details' has all info
                    onClick={() => setOpenModal(() => details.landlordId)}
                    className="marker">1
                    {openModal === details?.landlordId && <MapModal data={details} openModal={openModal} closeModal={closeModal} />}
                  </div>
                </Marker>
              </li>
            );
          })}
        </ul>
      </ReactMapGL>
      <input
        className="pl-4 border-solid border-2 border-white rounded-full h-11 mt-5 focus:outline-none text-slate-200 absolute z-50 bottom-10 bg-red-400 transform -translate-x-1/2 left-1/2 placeholder-white"
        placeholder="Enter a Postal Code"
        required
        value={postalCode}
        onChange={(e) => handlePostalCode(e)}
      />
    </div>
  );
};

export default Map;