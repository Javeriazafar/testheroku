import React from 'react'
import { Card, Icon,Button } from 'semantic-ui-react'

// const description = [
//   'Amy is a violinist with 2 years experience in the wedding industry.',
//   'She enjoys the outdoors and currently resides in upstate New York.',
// ].join(' ')

const Supp_Card = () => (
    <Card.Group>  

<Card fluid style={{backgroundColor:'#e5edf1'}}>
    <Card.Content header='Textile Accesories Supplier' />
    <Card.Content description='Makers of best quality buttons, threads, zippers loacted in North-Area Karachi ' />
    <Card.Content textAlign='right'>
      <Button style={{ width:'100px', backgroundColor:'#9bb4c0',color:'white'}}>View</Button>
    </Card.Content>
  </Card>

  <Card fluid style={{backgroundColor:'#e5edf1'}}>
    <Card.Content header='Thread Suppliers' />
    <Card.Content description='Makers of best quality Threads loacted in North-Area Karachi  '/>
    <Card.Content textAlign='right'>
      <Button style={{ width:'100px', backgroundColor:'#9bb4c0',color:'white'}}>View</Button>
    </Card.Content>
  </Card>

  <Card fluid style={{backgroundColor:'#e5edf1'}}>
    <Card.Content header='QR and BarCode Suppliers' />
    <Card.Content description='Makers of best quality QR and Bar Codes  loacted in North-Area Karachi '/>
    <Card.Content textAlign='right'>
      <Button style={{ width:'100px', backgroundColor:'#9bb4c0',color:'white'}}>View</Button>
    </Card.Content>
  </Card>

  </Card.Group> 
)

export default Supp_Card;
