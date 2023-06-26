import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './trackingTable.css'
// import Card from './cards/cards';
// import cart from "../../../images/cart.jpg"
// import track from "../../../images/track.jpg"


export default function TrackingTable() {

  const data = [1,2,3,4,5];

  return (
    <div className='customer-trackingTable-container'>
        <h1 className='customer-trackingTable-head'>Select Order To Track</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Manifacturer Name</th>
            <th scope='col'>Distributer Name</th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Requested Quantity</th>
            <th scope='col'>Total Bill</th>
            <th scope='col'>Track</th>

            </tr>
        </MDBTableHead>
        {
            data.map(ele=>{return(
                <MDBTableBody className='table-body'>
                <tr>
                <td>1</td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>John Doe</p>
                        <p className='text-muted mb-0'>latitude</p>
                        <p className='text-muted mb-0'>longitude</p>
    
                    </div>
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>John Doe</p>
                        <p className='text-muted mb-0'>latitude</p>
                        <p className='text-muted mb-0'>longitude</p>
    
                    </div>
                    </div>
                </td>
                <td>
                    <p className='fw-normal mb-1'>Software engineer</p>
                    <p className='text-muted mb-0'>Category</p>
                </td>
                <td> Active</td>
                {/* <td>Senior</td> */}
                <td>
                   bhejo
                </td>
                <td>
                    <MDBBtn pill style={{fontSize:'1.2rem', backgroundColor:'#bbe3fc'}}>
                    📌
                    </MDBBtn>
                    
                </td>
                </tr>
            </MDBTableBody>
            )
            })
        }
        </MDBTable>
        </div>
    </div>
  );
}

