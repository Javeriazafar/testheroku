import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import Admin from './Admin';
import Manu_inventory from './Manu_inventory';
import Supp_inventory from './Supp_inventory';

export default function Main(){
    const [role_id,setRoleId]=useState("");
    Axios.defaults.withCredentials=true;

    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
            if(response.data.loggedIn==true){
        setRoleId(response.data.user[0].role_id);
            }
        })
    },[])

    return(<div>
      {role_id == "1" && <Manu_inventory/>},
      {role_id == "2" && <Supp_inventory/>},
      {role_id == "3" && <Admin/>}
      </div>)
}