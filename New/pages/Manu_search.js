import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Table ,Container,Icon} from 'semantic-ui-react';
import ManuHeader from '../components/Headers/ManuHeader';
import Supp_Card from '../components/Cards/Supp_Card';
import SearchExampleStandard from '../components/Search/search_Supp';

class Manu_search extends Component{

    render(){
      return(
      <div>
         <ManuHeader/>
         <Container>
         <h1 style={{marginTop:'50px',marginBottom:'50px'}}>Suppliers Available</h1>
        <SearchExampleStandard/>
        <Supp_Card/>
         </Container>
      </div>
      )
    }}

    export default Manu_search;