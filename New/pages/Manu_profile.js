import React, { Component, useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Table ,Container,Icon} from 'semantic-ui-react';
import ManuHeader from '../components/Headers/ManuHeader';
import Manu_editProfile from '../components/Forms/Manu_editProfile';


//class ManufacturerProfile extends Component{
  function ManufacturerProfile(){
  const[editMode, setEditMode] = useState(false);
  
  const changeToFalse=()=>{
    setEditMode(false);
  }

   
      return(
        
      <div className='outerBox'>
        <ManuHeader/>
        {editMode?(<div>
          <Manu_editProfile changeToFalse={changeToFalse}/>
        </div>): (

            <Container style={{width:'900px'}}>

            <div style={{marginTop:'70px'}}>
              <img src="zillion.PNG" />
            <h1>Zillion Exports</h1><hr/>
            <p style={{fontSize:'18px'}}>Zillion Exports a Professional Denim Jeans and Denim Apparels manufacturer and exporters
            based in an Industrial Area of Karachi - Pakistan, Specialising in Fashion Garments
            (Non-Denim & Denim) for All Ages</p>
            <p style={{fontSize:'18px'}}><Icon name='map marker alternate'/><span style={{paddingLeft:'30px'}}/>PLOT DP 90-A SECTOR 12-C، North Karachi Industrial Area Sector 11 G North Karachi Twp,
            Karachi, Sindh 75850</p>
            <p style={{fontSize:'18px'}}><Icon name='phone'/><span style={{paddingLeft:'25px'}}/> 0345-8855231</p>
            <p style={{fontSize:'18px'}}><Icon name='mail'/><span style={{paddingLeft:'20px'}}/>sirajali@zillionexports.com</p>
            </div>

            <Button  type='submit' onClick={()=>setEditMode(true)}
            style={{ border:'1px solid purple',marginLeft:'300px', width:'150px',cursor:'pointer' }}>Edit</Button>
            </Container>

        )} 
      </div>
      )
    }

    export default ManufacturerProfile;