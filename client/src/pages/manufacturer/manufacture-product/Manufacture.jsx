import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { addProductdb } from '../../../services/api';
import {useNavigate} from "react-router-dom"
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea
  } from 'mdb-react-ui-kit';
import "./Manufacture.css"
import { useStateContext } from '../../../context';
const Manufacture = () => {
  const navigate = useNavigate()
  let initial = {
    
    productname:"",
    productcode:"",
    productprice:"",
    productquantity:"",
    productcat:"",
    description:""
  }
  const {addProduct,addr,lat,lng,manufacturer,contract} = useStateContext()
  const [productDetails,setproductDetails] = useState(initial);
  
  const changeHandler = (e) => {
    setproductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(manufacturer)
    let obj = {...productDetails,latitude : lat,longitude : lng,name:manufacturer.name}
    const data = await addProduct(obj)
    let uid = await contract.call("uid")
    // console.log(uid)
    ethers.utils.formatEther(uid)
    uid = uid*1 - 1
    console.log("uid = ", uid)
    obj = {...productDetails,manufacturerId:manufacturer._id,_id:uid}
    const datadb = await addProductdb(obj)
    console.log(datadb)
    navigate("/manufacturerdashboard")
  }

  return (
    <div className='manufacture-container'>
        <h1 className='manufacture-head'>Manufactured Product Details</h1>
    <form>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form6Example1' name='productname' label='Product Name' onChange={(e) => changeHandler(e)}/>
        </MDBCol>
        <MDBCol>
          <MDBInput id='form6Example2' name='productcode' label='Product Code' onChange={(e) => changeHandler(e)}/>
        </MDBCol>
      </MDBRow>

      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form6Example1' name='productprice' label='Product Price' onChange={(e) => changeHandler(e)}/>
        </MDBCol>
        <MDBCol>
          <MDBInput id='form6Example2' name='productquantity' label='Product Quantity'onChange={(e) => changeHandler(e)}/>
        </MDBCol>
      </MDBRow>
      <MDBInput wrapperClass='mb-4' id='form6Example6' name='productcat' label='Product Category' onChange={(e) => changeHandler(e)}/>

      <MDBTextArea wrapperClass='mb-4' id='form6Example7' name='description' rows={4} label='Description' onChange={(e) => changeHandler(e)}/>

      <MDBBtn className='mb-4' type='submit' block onClick={(e) => handleSubmit(e)}>
        Add Product
      </MDBBtn>
    </form>
    </div>
  )
}

export default Manufacture