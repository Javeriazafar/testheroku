import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Table ,Container} from 'semantic-ui-react';
import AdminMain from '../components/Forms/Admin/AdminMain';
import SideMenu from '../components/sideMenu/SideMenu';
import TestHeader from '../components/Headers/TestHeader';
import web3 from '../web3';
import { useState } from "react";
import Axios from "axios";
//import {abi,bytecode} from '../artifact';

class AdminPage extends Component{

    // static async getInitialProps(props){
    //     const user_contract = new web3.eth.Contract(
    //         JSON.parse(abi),
    //         '0xedAFDc4DD016A2427E58Eb8Fc40A0aFd135A3fAc' );console.log(props); 
    // }
  
   

render(){
    const { Header, Row, HeaderCell,Body}=Table;
    
    return(     
  <>
   <SideMenu />
   <TestHeader />
   <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
  <AdminMain/>
   </div>
  </>
    )}
};

export default AdminPage;