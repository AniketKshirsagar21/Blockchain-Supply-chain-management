import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './customerDashboard.css'
// import CustCards from './cards/Custcards';
import cart from "../../../images/cart.jpg"
import track from "../../../images/track.jpg"
// import Custcards from './cards/Custcards';
import Card from '../card/Card';

export default function CustomerDashboard() {

  const data = [1,2,3,4,5];

  return (
    <div className='customer-dashboard-container'>
         <h1 className='customer-dashboard-head'>Customer Dashboard</h1>
        <div className='dashboard-cards-container'>
            <div className='dashboard-cards'>
            <Card img = {cart} title="Buy a Product" desc="Click on the button to purchase product" func="Buy" link="/custproduct"/>
            {/* <Card  title="View Available Products" desc="Click on the button to view products" func="View" link="/#"/> */}
            <Card  img = {track} title="Track Shipment" desc="Click on the button to track shipment" func="Track" link="/customertracktable"/>
            </div>
        </div>
        <div>
        <h1 className='customer-dashboard-head'>Customer Order History</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Manifacturer Name</th>
            <th scope='col'>Distributer Name</th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Requested Quantity</th>
            {/* <th scope='col'>Available Quantity</th> */}
            <th scope='col'>Total Bill</th>
            {/* <th scope='col'>Return</th> */}

            </tr>
        </MDBTableHead>
        {
            data.map(ele=>{return(
                <MDBTableBody className='table-body'>
                <tr>
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
                {/* <td>
                    <MDBBtn color='white' pill style={{fontSize:'1.2rem'}}>
                    ❌
                    </MDBBtn>
                    
                </td> */}
                </tr>
            </MDBTableBody>
            )
            })
        }
        </MDBTable>
        </div>
        </div>
    </div>
  );
}

