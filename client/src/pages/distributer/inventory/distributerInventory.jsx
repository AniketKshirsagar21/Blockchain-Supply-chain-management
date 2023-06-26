import React, { useEffect, useState } from 'react';
import './distributerinventory.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getDistProduct } from '../../../services/api';
import { useStateContext } from '../../../context';

export default function DistributerInventory() {
  const [pro,setPro] = useState([])
  const {distributer} = useStateContext()
  useEffect(() => {
    const getpro = async() => {
      const data = await getDistProduct(distributer._id)
      // console.log(data)
      setPro([data.data])
    }
    getpro()
  },[])
  return (
    <div className='distributer-inventory-container'>
      <h1 className='distributer-inventory-head'>Distributer Inventory</h1>

      <div className='request-table'>
        <MDBTable bordered borderColor="black" >
          <MDBTableHead className ='table-head'>
            <tr>
              <th scope='col'><b>SR. NO.</b></th>
              <th scope='col'><b>Product Name</b></th>
              <th scope='col'><b>ProductType</b></th>
              <th scope='col'><b>Product Price</b></th>
              <th scope='col'><b>Product ID</b></th>

            </tr>
          </MDBTableHead>
          <MDBTableBody className='table-body'>
            {
              pro.map(ele => {return(
                <tr>
              <th scope='row'>1</th>
              <td>{ele?.name}</td>
              <td>{ele?.category}</td>
              <td>{ele?.price}</td>
              <td>{ele?._id}</td>

            </tr>
              )})
            }
          </MDBTableBody>
        </MDBTable>
        </div>
    </div>
  );
}