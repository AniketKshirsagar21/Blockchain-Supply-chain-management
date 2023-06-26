import React,{useEffect,useState} from 'react';
import './manifacturerinventory.css'
import { MDBTable, MDBTableHead, MDBTableBody,MDBSpinner } from 'mdb-react-ui-kit';
import { useStateContext } from '../../../context';
import { getProduct } from '../../../services/api';


export default function manifacturerInventory() {
  const {contract,addr,manufacturer} = useStateContext()
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
useEffect(()=>{
    const showProduct = async() => {
        
        console.log(manufacturer._id)
        const data = await getProduct(manufacturer._id)
        setProducts(data.data) 
        setLoading(false)       
    }
    setLoading(true)
    showProduct()
},[])

  return (
    <div className='manifacturer-inventory-container'>
      {
        loading ?  <MDBSpinner role='status'>
         <span className='visually-hidden'>Loading...</span>
       </MDBSpinner> : 
       <><h1 className='manifacturer-inventory-head'>Manufacturer Inventory</h1>

<div className='request-table'>
  <MDBTable bordered borderColor="black" >
    <MDBTableHead className ='table-head'>
      <tr>
        <th scope='col'><b>SR. NO.</b></th>
        <th scope='col'><b>Product Name</b></th>
        <th scope='col'><b>ProductType</b></th>
        <th scope='col'><b>Product Price</b></th>
        <th scope='col'><b>Product code</b></th>

      </tr>
    </MDBTableHead>
    <MDBTableBody className='table-body'>
      {
        products?.map(ele=>{
          return(
            <tr>
            <th scope='row'>1</th>
            <td>{ele.name}</td>
            <td>{ele.category}</td>
            <td>{ele.price}</td>
            <td>{ele.code}</td>
            </tr>
          )
        })
      }
    </MDBTableBody>
  </MDBTable>
  </div></>
      }
      
    </div>
  );
}