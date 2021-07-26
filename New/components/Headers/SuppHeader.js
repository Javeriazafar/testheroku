import React, { Component } from 'react';
import { Menu , Container} from 'semantic-ui-react';

export default class SuppHeader extends Component {
    state = {}
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return ( 
          
        <Menu style={{
            margin: '10px 10px 5px 5px',
            border: '2px solid Purple',
            color:'black'
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
          >
            Logo
          </Menu.Item>
  
         
  
          <Menu.Menu position='right'>
          <Menu.Item
             
              name='Add_Product'
              active={activeItem === 'Add_Product'}
              onClick={this.handleItemClick}
            >
              Add Product
            </Menu.Item>

            <Menu.Item
              name='Manage_Requests'
              active={activeItem === 'Manage_Requests'}
              onClick={this.handleItemClick}
            >
             Manage Requests
            </Menu.Item>

            <Menu.Item
              name='Sign_Out'
              active={activeItem === 'Sign_Out'}
              onClick={this.handleItemClick}
            >
            Sign Out
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        
      )
    }
  }
  