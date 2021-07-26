import React, { useState, map } from "react";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";

// import  QrcodeReader from 'react-qr-reader';
const isBrowser = typeof window != 'undefined';

if (isBrowser) {
  var QrReader = require('react-qr-reader');
}
import {
  Paper, TextField,

} from "@material-ui/core";


export default function Scan(props) {

const[value,setValue]=useState('')
  const[scan,scanresult]=useState('')

  const styel={
    height:'400px',
    width: '400px',
    display:'flex',

  }

  const camstyle={
    
    
    justifyContent:'center',
marginTop:'-5px'
  }
 const handlescan=(result)=>{
    if(result){scanresult(result)}

}

  return (
    <>
      <PageHeader

      
        title="SCAN"
        
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper style={{ margin: "2px", padding: "2px" }}>
     
       { isBrowser && (
          <div style={camstyle}>
            <QrReader
              delay={300}
              onScan={handlescan}
              
              style={styel}
            />
            <h3>scan result: {scan}</h3>

          </div>
        )}
      </Paper>
      
      
    </>
  );
}
