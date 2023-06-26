import React, { useEffect } from "react";
import { ethers } from "ethers";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem
} from "mdb-react-ui-kit";
import "./Card.css";
import { useStateContext } from "../../context";
import { addRequest, addRequestDist, deleteProduct, getRequest } from "../../services/api";
const Card = (props) => {

  const {contract,distributer} = useStateContext()

  
  const handleClick = async(detail) => {
    try {

      /////// add to smart contract that it is purchased
      console.log(detail)
      const pid = detail._id
      let amount = detail.price
      amount = amount.toString()
      let val = "0.";
      for(let i = 0 ; i < 18 - amount.length ; i++) {
        val = val.concat("0");
      }
      val = val.concat(amount)
      console.log(val) 
      const data = await contract.call('purchaseBydistributer', [pid] ,{value:ethers.utils.parseEther(val)});

      
      // console.log(del)
      ///////// add to request array of manufacturer
      const obj = {
        _id : pid,
        did: distributer._id,
        name:detail.name,
        manufacturerName:detail.manufacturer.name,
        mid:detail.manufacturerId,
        price:detail.price,
        category:detail.category
      }
      const d = await addRequest(obj);

      
      const added = await addRequestDist(obj,distributer._id)
      console.log(added)

      // /////// delete from the product list
      const del = await deleteProduct(pid)


    } catch (error) {
      console.log(error)
      window.alert(error)
    }

  }        
   
  return (

    <MDBCard className="card_distributor card">
    <MDBCardBody style={{textAlign: "center"}}>
    <MDBCardTitle>{props.productname} </MDBCardTitle>
            <MDBCardText>This is first product</MDBCardText>
            <MDBListGroup flush>
              <MDBListGroupItem>ID :- {props.id}</MDBListGroupItem>
              <MDBListGroupItem>price :- {props.price}/-</MDBListGroupItem>
              <MDBListGroupItem>Category :- {props.category}</MDBListGroupItem>
              <MDBListGroupItem>manufacturerName :- {props.manufacturerName} </MDBListGroupItem>
              <MDBListGroupItem>manufacturerDate :- {props.date}</MDBListGroupItem>
</MDBListGroup>
  
        <MDBBtn style={{marginTop : "2rem"}} onClick={() => handleClick(props.pro)}>Buy</MDBBtn>
          </MDBCardBody>
          </MDBCard>

        
        );
      };
      
      export default Card;
