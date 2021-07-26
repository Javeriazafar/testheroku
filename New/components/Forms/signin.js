import React,{useEffect, useState} from "react";
import Controls from '../controls/Controls';
// import {makeStyles} from "@material-ui/core";
import { useForm, Form } from '../useForm';
import { Grid } from '@material-ui/core';
import Axios from 'axios';
import {Redirect,Link} from 'react-router-dom';

export default function Signin(){

    const[user_name,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[loginStatus,setLoginStatus]=useState("");

    Axios.defaults.withCredentials=true;

    const login=()=>{
       Axios.post("http://localhost:3001/login",{
         user_name:user_name,
         password:password  
       }).then((response)=>{
           if(response.data.message){
               setLoginStatus(response.data.message);
           } else{
               setLoginStatus(response.data[0].user_name);
           }
        
       });
    };

    useEffect(()=>{
       Axios.get("http://localhost:3001/login").then((response)=>{
           if(response.data.loggedIn==true){
       setLoginStatus(response.data.user[0].user_name);
           }
       })
    },[])

    
    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
            if(response.data.loggedIn==true){
        setRoleId(response.data.user[0].role_id);
            }
        })
    },[])

    const action=()=>{
      if(role_id=="2"){
        <Redirect to='/Main'/>
      }
    };

    return(<>
        <Form style={{marginLeft:'40px', width:'350px',marginTop:'30px'}}>
    <Grid container>
      <Grid item xs={12}>
    <Controls.Input
       name="email"
       label="Email Address"
       onChange={(e)=>{
           setUsername(e.target.value);
       }}
      //  value={values.name}
      //  error={errors.name}
                    />
        
        <Controls.Input 
       name="password"
       label="Password"
       onChange={(e)=>{
        setPassword(e.target.value);
    }}
      //  value={values.name}
      //  error={errors.name}
                    />
        <Controls.MainButton style={{marginLeft:'115px',marginTop:'40px'}}
            type="submit"
            text="Sign In"
            onClick={login,action}
            />
           
        </Grid>
     </Grid>
    </Form>
    <h1>{loginStatus}</h1>
    </>
    )
}