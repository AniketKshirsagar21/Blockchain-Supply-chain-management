import React from 'react'
import HomePic from "../../images/home.jpg"
import "./Homee.css"

// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from 'https://cdn.esm.sh/react-leaflet'

const Home = () => {
  return (
    <div className='home-container'>
        <div className='home-img'>
            <img src = {HomePic} alt="image"/>
        </div>
        <div className='home-text'>
            <div className='home-head'>Supply Chain<br></br> Management</div>
            <div className='home-desc'>Supply chain management is the coordination of activities involved in the production and delivery of goods and services, from start to finish. Its goal is to optimize operations, reduce costs, and enhance customer satisfaction through collaboration and technology.</div>
        </div>
    </div>
  )
}

export default Home