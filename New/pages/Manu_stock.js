import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Table ,Container} from 'semantic-ui-react';
import ManuHeader from '../components/Headers/ManuHeader';
import Manu_stock_form from '../components/Forms/Manu_stock_form';

class ManufacturerStockPage extends Component{

    render(){
      return(
      <div>
         <ManuHeader/>
         <Manu_stock_form/>
      </div>
      )
    }}

    export default ManufacturerStockPage;