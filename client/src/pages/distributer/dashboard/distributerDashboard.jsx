import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './distributerDashboard.css'
import Card from './card/card';
import track from "../../../images/track.jpg"
import view from "../../../images/view.jpg"
import edit from "../../../images/edit.jpg"
import { useStateContext } from '../../../context';
import { addCustProduct, addproductdist, getRequestsDis } from '../../../services/api';




export default function DistributerDashboard() {

    const data = [1,2,3,4,5];
    const [pro,setPro] = useState([])
    const {distributer,receive_by_distributer,lat,lng,contract} = useStateContext()
    useEffect(() => {
        console.log("arr")
        const getpro = async() => {
            const data = await getRequestsDis(distributer._id)
            console.log(data.data)
            let arr = [data.data]
            console.log(arr)
            setPro([...arr])
        }
        getpro()
    },[])

    const handleClick = async(obj) => {
        try {
            console.log(obj)
            const did = obj.did;
            console.log(distributer.name)
        console.log(obj)
        const ob = {
            _id:3,
            price:1,
            name:"pro1",
            did:"853817314586460161",
            mid:"853790941400530945",
            category:"cat1",
            distributerName:distributer.name
        }
        const objj = {
            _uid: 3,
            distributerLongitude:lng.toString(),
            distributerLatitude:lat.toString()
        }
        const datasm = await contract.call("receiveBydistributer",[objj._uid,objj.distributerLongitude,objj.distributerLatitude])
        const data = await addproductdist(did,obj)
        const addcust = await addCustProduct(ob)

        } catch (error) {
            console.log(error)
            window.alert(error)
        }
    }

  return (
    <div className='distributer-dashboard-container'>
         <h1 className='distributer-dashboard-head'>Distributer Dashboard</h1>
        <div className='dashboard-cards-container'>
            <div className='dashboard-cards'>
            <Card img = {edit} title="Buy a Product" desc="Click on the button to purchase product" func="Buy" link="/products"/>
            <Card  img = {view} title="View Available Products" desc="Click on the button to view products" func="View" link="/distributerinventory"/>
            <Card  img = {track} title="Track Shipment" desc="Click on the button to track shipment" func="Track"link="/distributertracktable"/>
            </div>
        </div>
        <div>
        <h1 className='distributer-dashboard-head'>Products Shipped by Manufacturer</h1>
        
        <div className='request-table'>
        <MDBTable align='middle'>
        <MDBTableHead>
            <tr>
            <th scope='col'>Product Name</th>
            <th scope='col'>Manufacturer Name</th>
            <th scope='col'>Product Id</th>
            <th scope='col'>Manufacturer Id</th>
            <th scope='col'>Product Price</th>
            <th scope='col'>Receive the product</th>

            </tr>
        </MDBTableHead>
        {
            pro.map((ele,i)=>{
                console.log(ele[i])
                return(
                <MDBTableBody className='table-body'>
                <tr>
                <td>
                    <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{ele[i]?.name}</p>
                    </div>
                    </div>
                </td>
                <td>
                    <p className='fw-normal mb-1'>{ele[i]?.manufacturerName}</p>
                   
                </td>
                <td> {ele[i]?._id}</td>
                <td>{ele[i]?.mid}</td>
                <td>
                   {ele[i]?.price}
                </td>
                <td>
                    <MDBBtn color='white' pill style={{fontSize:'1.2rem'}} onClick={() => handleClick(ele[i])}>
                    ✅
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
    </div>
  );
}

