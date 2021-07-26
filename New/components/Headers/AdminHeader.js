import React, { Component } from 'react';
import { Menu , Container} from 'semantic-ui-react';
//import Head from 'Head/Next';
import Image from 'next/image';

export default class AdminHeader extends Component {
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
         <div style={{backgroundColor:'#1d4354',height:'5opx',color:'white'}}>
           <Container>
  <Menu style={{
      color:'White',
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
    <Menu.Item
       
        name='Manage_Supplier'
        active={activeItem === 'Manage_Supplier'}
        onClick={this.handleItemClick}
        style={{color:'white'}}
      >
        <b>Manage Supplier</b>
      </Menu.Item>
      <Menu.Item
        name='Manage_Manufacturer'
        active={activeItem === 'Manage_Manufacturer'}
        onClick={this.handleItemClick}
        style={{color:'white'}}
      >
      <b> Manage Manufacturer</b>
      </Menu.Item>

      <Menu.Item
        name='Manage_Brands'
        active={activeItem === 'Manage_Brands'}
        onClick={this.handleItemClick}
        style={{color:'white'}}
      >
      <b>Manage Brands</b>
      </Menu.Item>

      <Menu.Item
        name='Sign_Out'
        active={activeItem === 'Sign_Out'}
        onClick={this.handleItemClick}
        style={{color:'white'}}
      >
     <b> Sign Out</b>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
  </Container>
        </div> 
        
      )
    }
  }
  
 