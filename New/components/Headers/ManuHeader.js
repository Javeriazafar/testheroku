import React, { Component } from 'react';
import { Menu , Dropdown,Container} from 'semantic-ui-react';

export default class ManuHeader extends Component {
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (

        <div style={{backgroundColor:'#1d4354', height:'60px',color:'white',width:'100%'}}>
           <Container>
<Menu style={{
    color:'white',
    backgroundColor:'#1d4354',
    height:'60px'
    }}>

    <link
            async
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.css"
            />
            <script
            async
            src="//cdn.jsdelivr.net/npm/semantic-ui@${props.versions.sui}/dist/semantic.min.js"
            ></script>
  <Menu.Item 
  name='logo'
  active={activeItem === 'logo'}
  onClick={this.handleItemClick}
  style={{color:'white'}}
  >
    <b>Logo</b>
  </Menu.Item>

 

  <Menu.Menu position='right'>
  <Dropdown text='Manage' pointing className='link item' style={{color:'white'}}>
        <Dropdown.Menu style={{backgroundColor:'#e5edf1'}}>
            <Dropdown.Item>Inventory</Dropdown.Item>
            <Dropdown.Item>Stock</Dropdown.Item>
            <Dropdown.Item>Requests</Dropdown.Item>
            <Dropdown.Item>Profile</Dropdown.Item>
        </Dropdown.Menu>
  </Dropdown>

    <Menu.Item
      name='Order'
      active={activeItem === 'Order'}
      onClick={this.handleItemClick}
      style={{color:'white'}}
    >
     <b>Order Raw Materials</b>
    </Menu.Item>

    <Menu.Item
      name='Packaging'
      active={activeItem === 'Packaging'}
      onClick={this.handleItemClick}
      style={{color:'white'}}
    >
   <b>Packaging</b> 
    </Menu.Item>

    <Menu.Item
      name='Deliveries'
      active={activeItem === 'Deliveries'}
      onClick={this.handleItemClick}
      style={{color:'white'}}
    >
    <b>Deliveries</b>
    </Menu.Item>

    <Dropdown text='Documents' pointing className='link item' style={{color:'white'}}>
        <Dropdown.Menu style={{backgroundColor:'#e5edf1'}}>
            <Dropdown.Item>Sales Orders</Dropdown.Item>
            <Dropdown.Item>Purchase Orders</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
   

    <Menu.Item
      name='Sign_Out'
      active={activeItem === 'Sign_Out'}
      onClick={this.handleItemClick}
      style={{color:'white'}}
    >
    <b>Sign Out</b>
    </Menu.Item>

  </Menu.Menu>
</Menu>
</Container> 

          
        </div>
        
      )
    }

}

 