import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './ManufacturerDashboard.css'
import Card from './card/Card';
import track from "../../../images/track.jpg"
import view from "../../../images/view.jpg"
import edit from "../../../images/edit.jpg"
import { useStateContext } from '../../../context';
import { Contract, ethers } from 'ethers';
import { addRequestDis, getRequest, shipProduct } from '../../../services/api';

export default function ManufacturerDashboard() {

    const [req,setReq] = useState([])
    const {manufacturer,ship_to_distributer,contract} = useStateContext()
    useEffect(() => {
        const getR = async() => {
            const datadb = await getRequest(manufacturer._id)
            let x = [...Object.values(datadb.data)]
            console.log("db = ",x)
            setReq(x)

            const data = await contract.call("fetchProductCount");
            console.log("fetch" , data);
        }

        getR()
    },[])

    const handleClick = async(obj) => {
        // console.log(obj)
        const o = {
            _uid : obj._id,
            _amount : obj.price,
        }
        const datasm = await ship_to_distributer(o)
        const data = await shipProduct(obj,obj.mid)
        const addtodis = await addRequestDis(obj,obj.did)
        
    }
    
  return (
    <div className='manufacturer-dashboard-container'>
         <h1 className='manufacturer-dashboard-head'>Manufacturer Dashboard</h1>
        <div className='dashboard-cards-container'>
            <div className='dashboard-cards'>
            <Card img = {edit} title="Add Your Product" desc="Click on the button to add product" func="Add" link="/manufacture"/>
            <Card img = {view} title="View Available Products" desc="Click on the button to view products" func="View" link="/manufacturerinventory"/>
            <Card img = {track} title="Track Shipment" desc="Click on the button to track shipment" func="Track"link="/manufacturertracktable"/>
            </div>
        </div>
        <div>
        <h1 className='manufacturer-dashboard-head'>Distributor Request Details</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Product Name</th>
            <th scope='col'>Product Price</th>
            <th scope='col'>Category</th>
            <th scope='col'>Distributer Id</th>
            <th scope='col'>Product Id</th>
            <th scope='col'>Send Shipment</th>

            </tr>
        </MDBTableHead>

        {
            
            req.length == 0 ? <div>No requests</div> : <>
            {

                req.map((ele,i)=>{
                    console.log("req = ",req)
                    return(
                    
                    <MDBTableBody className='table-body'>
                    <tr>
                    <td>
                        <div className='d-flex align-items-center'>
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{ele?.name}</p>
                           
        
                        </div>
                        </div>
                    </td>
                    <td>
                        <p className='fw-normal mb-1'>{ele?.price}</p>
                        
                    </td>
                    <td> {ele?.category}</td>
                    <td>{ele?.did}</td>
                    <td>
                       {ele?._id}
                    </td>
                    <td>
                        <MDBBtn color='white' pill style={{fontSize:'1.2rem'}} onClick = {() => {handleClick(ele)}}>
                        ✅
                        </MDBBtn>
                        
                    </td>
                    </tr>
                </MDBTableBody>
                )
                
                })
                
            }
            </>
        }
        </MDBTable>
        </div>
        </div>
    </div>
  );
}

