import React, { useState,useEffect,useRef } from 'react'

import { GoogleMap, LoadScript ,Marker , DirectionsRenderer,Autocomplete,  useJsApiLoader,} from '@react-google-maps/api';
import TableItems from './Components/TableItems';
const containerStyle = {
  width: '100%',
  height: '800px'
};
const onLoad = marker => {
  console.log('marker: ', marker)
}
const App = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })
  const [directions,setDirections]= useState(null);
  const [latitude,setLatitude] = useState('');
  const [longitude , setLongitude] = useState('');
  const [directionsResponse , setDirectionsResponse] = useState(null);
  const originRef = useRef();
  const destinationRef = useRef()


  const center = {
    lat: latitude,
    lng:longitude
  };
  const position = {
    lat: latitude,
    lng:longitude
  }
  
  const position2 = {
    lat: latitude,
    lng:longitude-1
  }
if (!isLoaded) {
  return <div>map is not loaded</div>
}
  return (
    <div>
<TableItems  
 destinationRef={destinationRef}
 originRef={originRef}
 setDirectionsResponse={setDirectionsResponse}
 setDirections={setDirections}
 latitude={latitude}
 setLatitude={setLatitude}
 longitude={longitude}
 setLongitude={setLongitude}
/>


        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>

    

          <Marker
      onLoad={onLoad}
      position={position}
    />

     <Marker
      onLoad={onLoad}
      position={position2}
    />

{directions && (
              <DirectionsRenderer directions={directions} 
               options={{
                 polylineOptions:{
                   zIndex:50,
                   strokeColor:"black",
                   strokeWeight:5
                 }
               }}
  
              />
            )}

  {directionsResponse && <DirectionsRenderer directions={directionsResponse}

        options={{
                 polylineOptions:{
                   zIndex:50,
                   strokeColor:"black",
                   strokeWeight:5
                 }
               }}


  />}

        </GoogleMap>
      {/* </LoadScript> */}
    </div>
  )
}

export default App