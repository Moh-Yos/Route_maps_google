import React , {useEffect,useState} from 'react';
import {Autocomplete} from '@react-google-maps/api';



const TableItems = ({destinationRef,originRef, setDirectionsResponse,setDirections,latitude,setLatitude,longitude,setLongitude})=>{

  const [duration,setDuretion] = useState('');
  const [distance,setDistance] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log("position",position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);    
        })
      },[])

      const routes = async()=>{
        alert('are you sure');
      const directionsService = new window.google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: new window.google.maps.LatLng(    latitude, longitude),
        destination:new window.google.maps.LatLng( latitude, (longitude-2)),
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      setDirections(results);
      setDistance(results.routes[0].legs[0].distance.text)
      setDuretion(results.routes[0].legs[0].duration.value)
      }


      async function calculateRoute (){
        if(originRef.current.value ==='' || destinationRef.current.value ===''){
          return
        }
        alert("are you sure");
        const directionsService2=new window.google.maps.DirectionsService()
        const results = await directionsService2.route({
          origin:originRef.current.value,
          destination: destinationRef.current.value,
          travelMode: window.google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text)
        setDuretion(results.routes[0].legs[0].duration.value)
      }
    
      function clearRoute (){
        setDirectionsResponse(null);
        setDirections(null);
        setDistance('');
        setDuretion('');
        originRef.current.value='';
        destinationRef.current.value='';
      }
    return(
        <div className='input'>
        <button className='click' onClick={routes}>Route my loacation</button>
        <button className='click clear ' onClick={clearRoute}>Clear</button>
        <button className='click click-auto' onClick={calculateRoute}>Click auto-complete</button>
    
        <Autocomplete >
        <input type='text' placeholder='Origin' ref={originRef}></input>
        </Autocomplete>
    
        <Autocomplete >
        <input type='text' placeholder='destination' ref={destinationRef}></input>
        </Autocomplete>
    
    <div className='Duration-distance'>
        <h2>Distance: {distance}</h2>
        <h2>Duration: {duration} minutes</h2>
    </div>
    </div>
    )
}

export default TableItems;