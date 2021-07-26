import React from 'react';
import { Button, Form, Container,Table} from 'semantic-ui-react';

class Manu_stock_form extends React.Component {

    render(){
        const { Header, Row, HeaderCell,Body}=Table;
      
  
        return ( 
  
      <Container style={{width:'800px'}}>
          <h1 style={{marginTop: '60px'}}>Add Items</h1>
          <div className="formDiv" style={{backgroundColor:'#eae6f0', padding:'20px', borderRadius:'5px', border:'1px solid purple'}}>
             
  
    <Form >
  
      <Form.Group unstackable widths={2} >
  
        <Form.Input type='text' label='Product ID' placeholder='Product ID' />
        <Form.Input type='text'label='Product Type' placeholder='Product Type' />
  
      </Form.Group>
  
  
      <Form.Group widths={2}>
        
        <Form.Input  type='text' label='Color' placeholder='Color' />
        <Form.Input type='text' label='Quantity' placeholder='Cost' />
  
      </Form.Group>


       <Button  type='submit' style={{border:'1px solid purple',marginLeft:'300px', width:'150px' }}>Submit</Button>
    </Form>
    </div>
    
  
  
      <Table style={{marginTop:"40px",  border: '2px solid Purple' }}>
          <Header>
              <Row> 
                  
                  <HeaderCell>Product ID</HeaderCell>
                  <HeaderCell>Product Type</HeaderCell>
                  <HeaderCell>Color</HeaderCell>
                  <HeaderCell>Quantity</HeaderCell>
              </Row>
          </Header>
     </Table>
      {/* <Button onClick={this.clickme}></Button> */}
  </Container>
  
        )}
}

export default Manu_stock_form;