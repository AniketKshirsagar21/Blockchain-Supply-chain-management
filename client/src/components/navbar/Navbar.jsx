// import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import React, { useEffect, useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';

import logoDark from '../../images/logo-dark.jpg'
import { useStateContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const [showNavText, setShowNavText] = useState(false);
    const {loggedin,setLoggedin} = useStateContext()
    const handleLogout = () => {
      window.localStorage.removeItem('logged');
        setLoggedin(false)
        navigate("/")
    }
    useEffect(() => {
      console.log(loggedin)
    },[])
    const handleGoTo = () => {
      const det = JSON.parse(window.localStorage.getItem("logged"))
      if(det.role == "manufacturer") {
        navigate("/manufacturerdashboard")
        return
      }
      else if(det.role === "distributer") {
        navigate("/distributerdashboard")
        return
      } 
      else {
        navigate("/customerdashboard")
        return
      }
    }
  return (
    <MDBNavbar expand='lg' dark bgColor='black' style={{boxShadow: "3px 5px 4px #9E9E9E",
                                                        justifyContent: 'space-between',fontFamily: 'Noto Sans'}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
        <img
              src={logoDark}
              height='50'
              alt='dscm logo'
              loading='lazy'
            />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavText(!showNavText)}
        >
          <MDBIcon icon='bars' fas  href='/'/>
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavText}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0' style={{marginLeft: '55rem',
                                                                  fontSize: '1.3rem'}}>
            
            {
              window.location.href != 'http://127.0.0.1:5173/' && <MDBNavbarItem >
              <MDBNavbarLink active aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
              </MDBNavbarItem>
            }
            
            <MDBNavbarItem className={`NavBtn ${loggedin? "hidebutton":""}`}>
              <MDBNavbarLink active aria-current='page' href='/signin' style= {{ color: "black"}}>
                Login
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem  className={`NavBtn ${loggedin? "hidebutton":""}`}>
              <MDBNavbarLink active aria-current='page' href='/signup' style= {{ color: "black"}}>
                Sign Up
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem  className={`NavBtn ${!loggedin? "hidebutton":""}`} style={{width:"8rem",fontSize:"0.8rem"}}>
              <MDBNavbarLink active aria-current='page' style= {{ color: "black", cursor:"pointer"}} onClick={handleGoTo}>
                Go to DashBoard
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem  className={`NavBtn ${!loggedin? "hidebutton":""}`}>
              <MDBNavbarLink active aria-current='page' style= {{ color: "black", cursor:"pointer"}} onClick={handleLogout}>
                Logout
              </MDBNavbarLink>
            </MDBNavbarItem>

          

          <span className='navbar-text'>
          </span>
          </MDBNavbarNav> 
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  );
}

export default Nav