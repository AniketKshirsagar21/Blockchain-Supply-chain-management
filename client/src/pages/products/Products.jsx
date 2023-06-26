import React,{useEffect,useState} from 'react'
import Card from '../../components/card/Card'
import { useStateContext } from '../../context'
import "./Products.css"
import {
  
  MDBSpinner
} 
from 'mdb-react-ui-kit';
import { getAllProduct } from '../../services/api'
const Products = () => {

  const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  // const {getProducts} = useStateContext()
  useEffect(() => {
      const getAllp = async() => {
        setIsLoading(true)
      
        const data = await getAllProduct();
        console.log(data)
        setProducts(data.data)
        setIsLoading(false)
      }
      getAllp()
  }, [])
  
    // const products = [{
    //     productName : "headphones",
    //       price : 1500,
    //       quantity : 3,
    //       category : "electronics",
    //       manufacturerName : "John"
    //     },
    //     {
    //       productName : "smartphones",
    //       price : 15000,
    //       quantity : 5,
    //       category : "electronics",
    //       manufacturerName : "John"
    //     },
    //     {
    //       productName : "laptop",
    //       price : 50000,
    //       quantity : 5,
    //       category : "electronics",
    //       manufacturerName : "John"
    //     },
    //     {
    //       productName : "smartphones",
    //       price : 15000,
    //       quantity : 5,
    //       category : "electronics",
    //       manufacturerName : "John"
    //     },
    //     {
    //         productName : "smartphones",
    //         price : 15000,
    //         quantity : 5,
    //         category : "electronics",
    //         manufacturerName : "John"
    //       }
    //   ]
    let data = [1,2,3,4,5]
    return (
        <div className="product-container">
         { isLoading ?  <MDBSpinner role='status' style={{height:"80vh"}}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>:
    <>
    {
        products.map(ele=>{return(<div><Card productname={ele.productName} price={ele.price} id={ele._id} category = {ele.category} manufacturerName = {ele.manufacturerName} date={ele.createdAt} pro = {ele}/></div>)})
    }
    </>
   }
    </div>
  )
}

export default Products