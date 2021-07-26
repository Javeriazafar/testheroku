import React from 'react';
import { Button, Form, Container,Table} from 'semantic-ui-react';

class Manu_inv_form extends React.Component {

    render(){
        const { Header, Row, HeaderCell,Body}=Table;
      
  
        return ( 
  
      <Container>
          <h1 style={{marginTop: '60px'}}>Add Products</h1>
          <div className="formDiv" style={{backgroundColor:'#eae6f0', padding:'20px', borderRadius:'5px', border:'1px solid purple'}}>
             
  
    <Form >
  
      <Form.Group unstackable widths={3} >
  
        <Form.Input type='text' label='Product ID' placeholder='Product ID' />
        <Form.Input type='text'label='Product-Line ID' placeholder='Product-Line ID' />
        <Form.Input type='text'label='Product Type' placeholder='Product Type' />
  
      </Form.Group>
  
      <Form.Group widths={3}>
        
        <Form.Input  type='text' label='Length' placeholder='Length' />
        <Form.Input type='text' label='Style Code' placeholder='Style Code' />
        <Form.Input type='text' label='Pattern' placeholder='Pattern' />
  
      </Form.Group>
  
      <Form.Group widths={3}>
        
        <Form.Input  type='text' label='Cost SKU' placeholder='Cost SKU' />
        <Form.Input type='text' label='Time Stamp' placeholder='Time Stamp' />
        <Form.Input type='text' label='Location' placeholder='Location'/>
  
      </Form.Group>

      <Form.Group widths={3}>
        
        <Form.Input  type='text' label='Quality Inspection' placeholder='Quality Inspection' />
        <Form.Input type='text' label='Manufacturer ID' placeholder='Manufacturer ID' />
        <Form.Input type='text' label='Contractor ID' placeholder='Contractor ID'/>
  
      </Form.Group>

       <Button  type='submit' style={{border:'1px solid purple',marginLeft:'500px', width:'150px' }}>Submit</Button>
    </Form>
    </div>
    
  
  
      <Table style={{marginTop:"40px",  border: '2px solid Purple' }}>
          <Header>
              <Row> 
                  
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Product Line ID</HeaderCell>
                  <HeaderCell>Product Type</HeaderCell>
                  <HeaderCell>Style Code</HeaderCell>
                  <HeaderCell>Cost SKU</HeaderCell>
                  <HeaderCell>Contractor ID</HeaderCell>
                  <HeaderCell>Quality Inspection</HeaderCell>
              </Row>
          </Header>
     </Table>
      {/* <Button onClick={this.clickme}></Button> */}
  </Container>
  
        )}
}

export default Manu_inv_form;