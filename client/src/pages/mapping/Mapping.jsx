import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';

// // --- (1), (2) & (3): install and import ---
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// --- ---------------------------------- ---

export function Mapping() {
  // Berlin coordinates
  // const [lat,setLat] = useState(null)
  // const [lng,setLng] = useState(null)
  // useEffect(()=>{
  //   const getLocation = () => {
      
  //     if(navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((pos) => {
  //         console.log(pos.coords)
  //         setLat(pos.coords.latitude)
  //         setLng(pos.coords.longitude)
  //       })  
        
  //     }
  //   }
  //   getLocation()
  // },[])
  var position = [25.4358,81.8463]
  // [location, setLocation] = useState(position)

  // --- (6) Create a custom marker ---
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [20, 20],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  })

  return (
    
    <section className='map-component' >
      {/* --- (5) Add leaflet map container --- */}
      <div className='map'>
      <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
          // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          // --- -------------------------------------------------------------------------------------- ---
        />
        <Marker position={position}
          icon={customIcon}
        >
          <Popup>
            THIS IS a popup
          </Popup>
        </Marker>
      </MapContainer>
      {/* --- ---------------------------- --- */}
      </div>
    </section>
  )
}
export default Mapping;