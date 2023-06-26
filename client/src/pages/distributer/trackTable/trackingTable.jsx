import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './trackingTable.css'
import { getRequestedDis } from '../../../services/api';
import { useStateContext } from '../../../context';
// import Card from './cards/cards';
// import cart from "../../../images/cart.jpg"
// import track from "../../../images/track.jpg"
import { ethers } from 'ethers';


import {useNavigate} from "react-router-dom"

export default function TrackingTable() {

    const proState = ["Manufactured",
    "PurchasedByDistributer",
    "ShippedByManufacturer",
    "ReceivedByDistributer",
    "PurchasedByCustomer",
    "ShippedByDistributer",
    "ReceivedByCustomer"];

    const {distributer , contract} = useStateContext()
    const [pro,setPro] = useState(null)
    useEffect(() => {
        const getpro = async() => {
            const data = await getRequestedDis(distributer._id)
            console.log(data)
            // const arr = [data.data].filter(ele => ele.obj !== undefined)
            let x = [...Object.values(data.data)]
            setPro(x)

        }
        getpro()
    },[])
    const navigate = useNavigate()


    const handleClick = async(obj) => {
        // const pid = obj._id;
        // let len = await contract.call("fetchProductHistoryLength",[pid])
        // // len = ethers.utils.formatEther(len)
        // len = len * 1e18
    // let state = await contract.call("fetchProductState",[pid])
    // console.log("state = ",pid)
    // if(state <= 2)
    //     window.alert("Product not received by distributer yet")
    // else if (state == 3)
    //     window.alert("Received by distributer")
    // else if (state == 4)
    //     window.alert("Purchased by Customer")
    // else 
    //     window.alert(proState[state])

    navigate("/mapping")
    
  }

  return (
    <div className='distributer-trackingTable-container'>
        <h1 className='distributer-trackingTable-head'>Select Order To Track</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Product Id</th>
            <th scope='col'>Manufacturer Name</th>
            <th scope='col'>Distributer Name</th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Product Category</th>
            <th scope='col'>Total Bill</th>
            <th scope='col'>Track</th>

            </tr>
        </MDBTableHead>
        
        {   
            pro?.length == 0 ? <h1 style={{textAlign:"center",color:"black"}}>No Product to Track</h1>:
            pro?.map((ele,i)=>{ 
            
                return(
                <MDBTableBody className='table-body'>
                <tr>
                <td>1</td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{ele?._id}</p>
    
                    </div>
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{ele?.manufacturerName}</p>

    
                    </div>
                    </div>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{distributer.name}</p>
                    <p className='text-muted mb-0'>{ele?.name}</p>
                </td>
                <td> {ele?.category}</td>
                {/* <td>Senior</td> */}
                <td>
                {ele?.price}
                </td>
                <td>
                    <MDBBtn pill style={{fontSize:'1.2rem', backgroundColor:'#bbe3fc'}} onClick={(ele)=>{handleClick(ele)}} >
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

