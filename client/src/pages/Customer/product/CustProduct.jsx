import React,{useEffect,useState} from 'react'
// import Card from '../../components/card/Card'

// import { useStateContext } from '../../context'
import "./CustProduct.css"
import {
  MDBSpinner
} 
from 'mdb-react-ui-kit';

import { getCustProduct } from '../../../services/api.js';
import Custcards from '../dashboard/cards/Custcards';
const CustProduct = () => {

  const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  // const {getProducts} = useStateContext()
  useEffect(() => {
      const getAllp = async() => {
        setIsLoading(true)
      
        const data = await getCustProduct();
        // console.log(data)
        setProducts(data.data)
        setIsLoading(false)
      }
      getAllp()
  }, [])
  
    
    return (
        <div className="product-container">
         { isLoading ?  <MDBSpinner role='status' style={{height:"30vh"}}>
                        <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>:
    <>
    {
        products.map(ele=>{
            console.log(ele)
            return(<div><Custcards productname={ele.name} price={ele.price} id={ele._id} category = {ele.category} manufacturerName = {ele.distributerName} date={ele.createdAt} pro = {ele}/></div>)})
    }
    </>
   }
    </div>
  )
}

export default CustProduct