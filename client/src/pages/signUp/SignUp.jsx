
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBTextArea,

}
from 'mdb-react-ui-kit';
import ManuPic from "../../images/manufacturer.jpg";
import { useStateContext } from '../../context';
import { addManufacturer, addDistributer } from '../../services/api';

function SignUp() {
  const navigate = useNavigate()
  const {lat,lng,addManufactureRole,addDistributeRole,addCustomRole} = useStateContext()
  let initial = {
    fullname:"",
    walletaddress:"",
    password:"",
    Role:"Manufacturer",
    latitude:lat,
    longitude:lng,
    description:"",
  }

  const [manufacturer,setManufacturer] = useState(initial);
  const changeHandler = (e) => {
    setManufacturer({...manufacturer,[e.target.name]:e.target.value})
    
  }

  const submitHandler = async() =>{
    if(manufacturer.Role === "Manufacturer") {
      console.log("hello")
      const data = await addManufactureRole(manufacturer.walletaddress);
      console.log(data,"data")
      
      const obj = {fullname:manufacturer.fullname,desc:manufacturer.description,password:manufacturer.password,walletaddress:manufacturer.walletaddress,latitude:lat,longitude:lng}
      console.log(obj)
      const datadb = await addManufacturer(obj)
      console.log(datadb,"datadb")
    }
    else if(manufacturer.Role === "Distributer") {
      const data = await addDistributeRole(manufacturer.walletaddress);
      console.log(data,"data")
      
      const obj = {...manufacturer,latitude:lat,longitude:lng}
      console.log(obj)
      const datadb = await addDistributer(obj)
      console.log(datadb,"datadb")
    }
    else {
      const data = await addCustomRole(manufacturer.walletaddress);
      console.log(data,"data")
      
      const obj = {...manufacturer,latitude:lat,longitude:lng}
      const datadb = await addCustomer(obj)
      console.log(datadb,"datadb")
    }
    navigate("/signin")
  }

  return (
    <MDBContainer fluid  style={{padding: "3rem", backgroundColor:"#BBE3FF", fontFamily: 'Noto Sans'}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol>

          <MDBCard className='my-3'>

            <MDBRow className='g-0'>

              <MDBCol md='6' className="d-none d-md-block">
                <MDBCardImage src={ManuPic} alt="Sample photo" className="rounded-start" fluid/>
              </MDBCol>

              <MDBCol md='6'>

                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 fw-bold">WELCOME TO dSCM</h3>

                  <MDBRow>
                       
                    <MDBInput wrapperClass='mb-4' label='Full Name' size='lg' name='fullname' id='form1' type='text'  onChange={(e) => changeHandler(e)}/>
                    <MDBInput wrapperClass='mb-4' label='Wallet Address' name='walletaddress' size='lg'id='form3'type='text' onChange={(e) => changeHandler(e)}/>
                    <MDBInput wrapperClass='mb-4' label='Password' name='password' size='lg'id='form3'type='text' onChange={(e) => changeHandler(e)}/>
                    
                  </MDBRow>

                  

                  <div className='d-md-flex ustify-content-start align-items-center mb-4'>
                    <h6 class="fw-bold mb-0 me-4">Role: </h6>
                    <MDBRadio name='Role' id='inlineRadio1' value='Manufacturer' label='Manufacturer' inline  onChange={(e) => changeHandler(e)} />
                    <MDBRadio name='Role' id='inlineRadio2' value='Distributer' label='Distributer' inline  onChange={(e) => changeHandler(e)}/>
                    {/* <MDBRadio name='Role' id='inlineRadio3' value='Customer' label='Customer' inline  onChange={(e) => changeHandler(e)} /> */}
                  </div>
                  <MDBRow>

                  <MDBCol md='6'>
                    <MDBInput wrapperClass='mb-4' name='latitude' label='Latitude' size='lg' id='form1' type='text' value={""+lat} onChange={(e) => changeHandler(e)}/>
                  </MDBCol>

                  <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' name='longitude' label='Longitude' size='lg' id='form3' type='text' value={""+lng} onChange={(e) => changeHandler(e)}/>
                  </MDBCol>

                  </MDBRow>

                <MDBTextArea wrapperClass='mb-4' name='description' label='Description' size='lg' id='form6' type='text' onChange={(e) => changeHandler(e)}/>

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color='light' size='lg'>Reset all</MDBBtn>
                    <MDBBtn className='ms-2' bgColor='#BBE3FA' size='lg' onClick={submitHandler}>Submit form</MDBBtn>
                  </div>

                </MDBCardBody>

              </MDBCol>
            </MDBRow>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default SignUp;