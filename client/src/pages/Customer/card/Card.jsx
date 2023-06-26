import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import "./Card.css"
export default function Card(props) {
  return (
    <MDBCard>
    <MDBCardImage className='img' src={props.img} position='top' alt='...' />
    <MDBCardBody>
      <MDBCardTitle>{props.title}</MDBCardTitle>
      <MDBCardText>
        {props.desc}
      </MDBCardText>
      <Link to={props.link}><MDBBtn>{props.func}</MDBBtn></Link>
    </MDBCardBody>
  </MDBCard>
  );
}