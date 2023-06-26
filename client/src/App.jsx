import React, { useEffect } from 'react'
// import SignUp from './pages/signUp'
import SignUp from './pages/signUp/SignUp'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import SignIn from './pages/signinPage/SignIn'
import "./styles/globals.css"
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import Manufacture from './pages/manufacturer/manufacture-product/Manufacture'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import Products from './pages/products/Products'
import ManufacturerDashboard from './pages/manufacturer/dashboard/ManufacturerDashboard'
import ManifacturerInventory from './pages/manufacturer/inventory/ManifacturerInventory'
import ManufacturerTrackTable from './pages/manufacturer/trackTable/trackingTable'
import DistributerDashboard from './pages/distributer/dashboard/DistributerDashboard'
import DistributerInventory from './pages/distributer/inventory/distributerInventory'
import DistributerTrackTable from './pages/distributer/trackTable/trackingTable'
import CustomerDashboard from './pages/Customer/dashboard/CustomerDashboard'
import CustomerTrackTable from './pages/Customer/trackTable/trackingTable'
import Mapping from './pages/mapping/Mapping'
import Footer from './components/footer/Footer'
import CustProduct from './pages/Customer/product/CustProduct'
import { useStateContext } from './context'

const App = () => {

  const {loggedin} = useStateContext()

    return (
        <>
        
        <BrowserRouter>
        
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={!loggedin?<SignUp />:<Home />} />
            <Route path="/signin" element={!loggedin?<SignIn />:<Home />} />
            <Route path="/manufacture" element={loggedin?<Manufacture/>:<Home />}/>
            <Route path="/products" element={loggedin?<Products/>:<Home />}/>
            <Route path="/manufacturerdashboard" element={loggedin?<ManufacturerDashboard/>:<Home />}/>
            <Route path="/manufacturerinventory" element={loggedin?<ManifacturerInventory/>:<Home />}/>
            <Route path="/manufacturertracktable" element={loggedin?<ManufacturerTrackTable/>:<Home />}/>
            <Route path="/distributerdashboard" element={loggedin?<DistributerDashboard/>:<Home />}/>
            <Route path="/distributerinventory" element={loggedin?<DistributerInventory/>:<Home />}/>
            <Route path="/distributertracktable" element={loggedin?<DistributerTrackTable/>:<Home />}/>
            <Route path="/customerdashboard" element={loggedin?<CustomerDashboard/>:<Home />}/>
            <Route path="/customertracktable" element={loggedin?<CustomerTrackTable/>:<Home />}/>
            <Route path="/mapping" element={loggedin?<Mapping/>:<Home />}/>
            <Route path="custproduct" element = {loggedin?<CustProduct/>:<Home />}/>
          </Routes>
        </BrowserRouter>
        <Footer/>
        </>
      );
}

export default App