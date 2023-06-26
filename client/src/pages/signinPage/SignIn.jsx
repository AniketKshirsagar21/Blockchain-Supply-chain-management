import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useContractRead } from "@thirdweb-dev/react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSpinner
} 
from 'mdb-react-ui-kit';
import "./Signin.css";
import logoLight from '../../images/logo-light-remove.png';
import image1 from '../../images/image1.jpg';
import { useStateContext } from '../../context';
import { loginCustomer, loginDistributer, loginManufacturer } from '../../services/api';

function SignIn() {

  let initial = {
    walletaddress:"",
    password:""
  }
  const navigate = useNavigate()
  const [input,setInput] = useState({initial})
  const {contract,setManufacturer,setDistributer,setCustomer,setLoggedin} = useStateContext()
  const [isLoading,setIsLoading] = useState(false);
  const changeHandler= (e) => {
    setInput({...input,[e.target.name]: e.target.value})
  }
  
  const submitHandler = async() => {
    console.log(input)
    // console.log(input.walletaddress.length)
    console.log(input.walletaddress)
    setIsLoading(true);
    // console.log(conn?.data.account)
    let data = await contract.call("hasManufacturerRole",[input.walletaddress])
    if(data) {
      console.log("here")
      const datadb = await loginManufacturer(input.walletaddress)
      console.log(datadb.data[0].password)
      if(datadb.data[0].password === input.password) {
        window.localStorage.setItem('logged', JSON.stringify({log:true,role:"manufacturer"}));
        setLoggedin(true)
        window.localStorage.setItem('manufacturer', JSON.stringify(datadb.data[0]));
        setManufacturer(datadb.data[0])
        setIsLoading(false)
        navigate("/manufacturerdashboard")
        return
        // console.log(navigate)
      }
      
    }
    data = await contract.call("hasDistributerRole",[input.walletaddress])
    if(data) {

      const datadb = await loginDistributer(input.walletaddress)
      console.log(datadb.data[0].password)
      if(datadb.data[0].password === input.password) {
        window.localStorage.setItem('logged', JSON.stringify({log:true,role:"distributer"}));
        setLoggedin(true)
        window.localStorage.setItem('distributer', JSON.stringify(datadb.data[0]));
        setDistributer(datadb.data[0])
        setIsLoading(false)
        navigate("/distributerdashboard")
        return
        // console.log(navigate)
      }
      
      
    }
    data = await contract.call("hasCustomerRole",[input.walletaddress])
    if(data){
      const datadb = await loginCustomer(input.walletaddress)
      console.log(datadb.data[0].password)
      if(datadb.data[0].password === input.password) {
        window.localStorage.setItem('logged', JSON.stringify({log:true,role:"customer"}));
        setLoggedin(true)
        window.localStorage.setItem('customer', JSON.stringify(datadb.data[0]));
        setCustomer(datadb.data[0])
        setIsLoading(false)
        navigate("/customerdashboard")
        return
        // console.log(navigate)
      }
    }
    else {
      setIsLoading(false)
      window.alert("Address not found!")
    }
  }

  return (
    <MDBContainer className="my-5 gradient-form" style={{fontFamily: 'Noto Sans'}}>

     {
      isLoading ?  <MDBSpinner role='status'>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner> :  <MDBRow>

<MDBCol col='6' className="mb-5">
  <div className="d-flex flex-column ms-5">

    <div className="text-center">
      <img src={logoLight}
        style={{width: '185px'}} alt="logo" />
      <h4 className="mt-1 mb-5 pb-1">Welcome To dSCM</h4>
    </div>

    <p>Please login to your account</p>


    <MDBInput wrapperClass='mb-4' name='walletaddress' label='Wallet address' id='form1' type='email' onChange={(e) => changeHandler(e)}/>
    <MDBInput wrapperClass='mb-4' name='password' label='Password' id='form2' type='password' onChange={(e) => changeHandler(e)}/>


    <div className="text-center pt-1 mb-5 pb-1">
      <MDBBtn className="mb-4 w-100" bgColor='#BBE3FA' onClick={submitHandler} >Sign in</MDBBtn>
    </div>

    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
      <p className="mb-0">Don't have an account?</p>
      <MDBBtn outline className='mx-2' bgColor='#BBE3FA' href='/signUp'>
        Register
      </MDBBtn>
    </div>

  </div>

</MDBCol>

<MDBCol col='6' className="mb-5">
  <div className="d-flex flex-column  justify-content-center h-100 mb-4">
    <img src={image1} style={{width: '500px'}} alt="Image"/>
  </div>

</MDBCol>

</MDBRow>
     }

    </MDBContainer>
  );
}

export default SignIn;