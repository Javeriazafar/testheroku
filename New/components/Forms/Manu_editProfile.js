import React from 'react';
import { Button, Form, Container,Table} from 'semantic-ui-react';
import {abi,bytecode} from '../../AdminUserartufact';
import web3 from '../../web3';




  function Manu_editProfile({changeToFalse}){

  
        const { Header, Row, HeaderCell,Body}=Table;
      
  
        return ( 
  
      <Container style={{width:'900px'}}>

        
          <h1 style={{marginTop: '60px'}}>Add Profile Details</h1>
          <div className="formDiv" style={{backgroundColor:'#eae6f0', padding:'20px', borderRadius:'5px', border:'1px solid purple'}}>
             
  
    <Form >
  
      <Form.Group unstackable widths={2} >
  
        <Form.Input type='text' label='Company Name' placeholder='Company Name' />
        <Form.Input type='text'label='Company Address' placeholder='Company Address' />
  
      </Form.Group>
  
      <Form.Group widths={2}>
        <Form.Input type='text'label='Phone No' placeholder='Phone No'  /> 
        <Form.Input  type='text' label='Email Address' placeholder='Email Address'/>
  
      </Form.Group>
  
      <Form.Group widths={2}>

      <Form.Input type='text' label='Description' placeholder='Description' />
      <Form.Input type='file' label='Add Image' placeholder='Add Image' />
        
      </Form.Group>

       <Button  type='submit' style={{border:'1px solid purple',marginLeft:'300px', width:'150px' }}>Save</Button>
       <Button  type='submit' onClick={()=>changeToFalse()} style={{border:'1px solid purple', width:'150px' }}>Go back</Button>
    </Form>
    </div>
    
  
  
     
      {/* <Button onClick={this.clickme}></Button> */}
  </Container>
  
        )}


export default Manu_editProfile;
