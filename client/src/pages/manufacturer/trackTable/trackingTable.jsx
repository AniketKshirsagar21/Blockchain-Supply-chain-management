import React, { useEffect,useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { ethers } from 'ethers';
import './trackingTable.css'
import { getShipped } from '../../../services/api';
import { useStateContext } from '../../../context';

import {useNavigate} from "react-router-dom"


export default function TrackingTable() {

  const proState = ["Manufactured",
    "PurchasedByDistributer",
    "ShippedByManufacturer",
    "ReceivedByDistributer",
    "PurchasedByCustomer",
    "ShippedByDistributer",
    "ReceivedByCustomer"];
  const [pro,setPro] = useState([])
    const {manufacturer,contract} = useStateContext()
    const navigate = useNavigate()

  useEffect(() => {
    const getpro = async() => {
        try {
            const data = await getShipped(manufacturer._id)
            console.log(data)
            setPro([data.data])
        } catch (error) {
            console.log(error)
        }
    }
    getpro()
  },[])

  const handleClick = async(obj) => {
        const pid = obj._id;
        let len = await contract.call("fetchProductHistoryLength",[pid])
        len = ethers.utils.formatEther(len)
        len = len * 1e18
    let state = await contract.call("fetchProductState",[pid])
    if(state <= 2)
        window.alert("Product not received by distributer yet")
    else if (state == 3)
        window.alert("Received by distributer")
    else if (state == 4)
        window.alert("Purchased by Customer")
    else 
        window.alert(proState[state])

    navigate("/mapping")
    
  }

  return (
    <div className='manufacturer-trackingTable-container'>
        <h1 className='manufacturer-trackingTable-head'>Select Order To Track</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Manifacturer Name</th>
            <th scope='col'>Distributer Id</th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Product Id</th>
            <th scope='col'>Total Bill</th>
            <th scope='col'>Track</th>

            </tr>
        </MDBTableHead>
        {
            pro.map((ele,i)=>{return(
                <MDBTableBody className='table-body'>
                <tr>
                <td>1</td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{ele[i]?.manufacturerName}</p>
                    </div>
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{ele[i]?.did}</p>
                   
    
                    </div>
                    </div>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{ele[i]?.name}</p>
                </td>
                <td> {ele[i]?._id}</td>
                {/* <td>Senior</td> */}
                <td>
                   {ele[i]?.price}
                </td>
                <td>
                    <MDBBtn pill style={{fontSize:'1.2rem', backgroundColor:'#bbe3fc'}} onClick={()=>handleClick(ele[i])}>
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

