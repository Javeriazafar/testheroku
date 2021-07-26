import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import SideMenu from '../../components/sideMenu/SideMenu' ;
import TestHeader from '../../components/Headers/TestHeader' ;
import {CssBaseline, makeStyles,createMuiTheme, ThemeProvider} from '@material-ui/core' ;

import Supplier from "../../components/Forms/Supplier/SupplierMain";
const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126'
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526'
      },
      background: {
        default: "#f4f5fd"
      }
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    }
  })
function SuppPage(){

   
        return(
            <div >
            <ThemeProvider theme={theme} >
                <SideMenu />
                <TestHeader />
                <div style={{paddingLeft: '330px',width: '100%',paddingRight: '10px'}} >
                
               <Supplier  
               />
              </div>
              
              <CssBaseline />
              </ThemeProvider>
              </div>
        );
    
   }

   export default SuppPage;