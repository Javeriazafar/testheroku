import React from 'react';
import { Button, Form, Container,Table} from 'semantic-ui-react';

class Supp_inv_form extends React.Component {

    render(){
        const { Header, Row, HeaderCell,Body}=Table;
      
  
        return ( 
  
      <Container>
          <h1 style={{marginTop: '60px'}}>Add Products</h1>
          <div className="formDiv" style={{backgroundColor:'#eae6f0', padding:'20px', borderRadius:'5px', border:'1px solid purple'}}>
             
  
    <Form >
  
      <Form.Group unstackable widths={2} >
  
        <Form.Input type='text' label='Product Name' placeholder='Product Name' />
        <Form.Input type='text'label='Product Code-SKU' placeholder='Product Code-SKU' />
  
      </Form.Group>
  
      <Form.Group widths={2}>
        <Form.Input type='text'label='Color' placeholder='Color' /> 
        <Form.Input  type='text' label='Price' placeholder='Price' />
  
      </Form.Group>
  
      <Form.Group widths={2}>

      <Form.Input type='text' label='Style Code' placeholder='Style Code' />
      <Form.Input type='text' label='Quality' placeholder='Quality' />
        
      </Form.Group>

      <Form.Group widths={2}>
        <Form.Input  type='text' label='Quantity Available' placeholder='Quantity Available' />
        <Form.Input type='text' label='Durability' placeholder='Durability' />
  
      </Form.Group>

      <Form.Group widths={2}>
        
      <Form.Input type='text' label='Composition' placeholder='Composition'/>
      <Form.Input type='text' label='Add Image' placeholder='Add Image'/>
  
      </Form.Group>

       <Button  type='submit' style={{border:'1px solid purple',marginLeft:'465px', width:'150px' }}>Submit</Button>
    </Form>
    </div>
    
  
  
      <Table style={{marginTop:"40px",  border: '2px solid Purple' }}>
          <Header>
              <Row> 
                  
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Product Name</HeaderCell>
                  <HeaderCell>Product Code-SKU</HeaderCell>
                  <HeaderCell>Color</HeaderCell>
                  <HeaderCell>Price</HeaderCell>
                  <HeaderCell>Style Code</HeaderCell>
                  <HeaderCell>Quantity Available</HeaderCell>
              </Row>
          </Header>
     </Table>
      {/* <Button onClick={this.clickme}></Button> */}
  </Container>
  
        )}
}

export default Supp_inv_form;