import React,{useState,useEffect} from 'react';
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import {abi,bytecode} from '../contracts/AdminUser.json';
import Provider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import Axios from 'axios';

import Inventory from './Inventory';

const genderItems = [
    { id: 'Male', title: 'Male' },
    { id: 'Female', title: 'Female' },
    { id: 'Other', title: 'Other' },
]
const getRoles =[
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
  ]
  const getrole_idCollection =[
    { id: 'Development', title: 'Development' },
    { id: 'Marketing', title: 'Marketing' },
    { id: 'Accounting', title: 'Accounting' },
    { id: 'HR', title: 'HR' },
]

const initialFValues = {
    user_id: 0,
    user_name: '',
    email: '',
    password: '',
    account_address: '',
    gender: 'male',
    role_id: '',
    newuser_name:'',
    newEmail:'',
    newpassword:'0',
    newaccount_address:'',
    newGender:'',
    newrole_id:'',
    privateKey: '52dc8848ff04da7239a974e9343cdb1a0b801fe55688304a4844687e01ee3188',
        infuraKey :  'https://rinkeby.infura.io/v3/10cfdc60e2c841e4b03a5adf4abae931' 
   // date: new Date()
}

export default function InventoryForm(props){
    const {addOrEdit,setOpenPopup,recordForEdit}=props;

    
    const validate = (fieldValues = values) => {
        console.log('validation success')
        let temp = { ...errors }
        if ('user_name' in fieldValues)
            temp.user_name = fieldValues.user_name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 9 ? "" : "Minimum 10 numbers required."
        if ('role_id' in fieldValues)
            temp.role_id = fieldValues.role_id.length != 0 ? "" : "This field is required."
            console.log('validation success')
        setErrors({
            ...temp
        })

        if (fieldValues == values)
        console.log(temp)
            return Object.values(temp).every(x => x == "");
            console.log('validation success')
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues , true, validate);
    
    //const[newuser_name,setNewuser_name]=useState("");
    // const[newEmail,setNewEmail]=useState("0");
    // const[newpassword,setNewpassword]=useState("0");
    // const[newaccount_address,setNewaccount_address]=useState("0");
    // const[newGender,setNewGender]=useState("0");
    // const[newrole_id,setNewrole_id]=useState("0");
    const[userList,setUserList]=useState([]);

   

     const addUser=async(e)=>{

        const id=values.user_id;
        e.preventDefault();
        ({loading:true});
console.log('ADDED')
        if(id==0){
            
        // try{
    
        //     // let data=[...values.data];
        //     // console.log({userList})
        //     const provider= new Provider(values.privateKey,values.infuraKey);
        //     const web3 =new Web3(provider);
        //     const user_contract=   new web3.eth.Contract((abi),'0x9898BA4F1157E3E86490C68E8b498fB1009477dD');
        //     console.log(user_contract)
        //     const accounts = '0x406cec9d151290688812cd6ccfa0e808a9352569';
        //     console.log(web3.eth.getBalance(accounts).then(console.log));
        //     const reciept = await user_contract.methods.setUser(values.account_address,values.user_name,values.password,values.email,values.location,values.role_id).send({
        //       from:accounts
        //     });
        //     console.log(reciept.transactionHash)
        //     console.log(reciept)
        //     const log =reciept.events.LogNewUser.returnValues[6];
    
        //      ({hash:log})
        //     const output =await  user_contract.methods.getdata(log).call();
        //     const {us_name,email,location,password,role,Createdby}= output
        //     // setUserList({
        //     //   user_name: us_name,
        //     //   email: email,
        //     //   location: location,
        //     //   password:password,
        //     //   role_id: role,
        //     //   account_address: Createdby
        //     // });
        //     // console.log({userList})
        //     // ({userList:setUserList});
        //     // console.log({data})
        //     Axios.post('http://localhost:5000/user/createuser',
        //     {user_name:us_name,
        //     password:password,
        //     role_id:role,
        //     account_address:Createdby,
        //     email:email,
        //     location:location
        //    // date:values.date
        // }).then(()=>{
        //     console.log("success");
        // });
            // fetch('http://localhost:5000/user/createuser', {
            //   method: "POST",
            //   body: JSON.stringify(values.account_address,values.user_name,values.password,values.email,values.location,values.role_id),
            //   headers: {"Content-type": "application/json; charset=UTF-8"}
            // })
            // .then(function (response) {
            //   console.log(response);
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
            
    
        //     ({loading:false});
        // }
        // catch(error){
        // console.log(error)
        // }
       
}
else{
    console.log(id);
    console.log(values.name);
    console.log(values.email);
    console.log(values.password);
    console.log(values.account_address);
    console.log(values.gender);
    console.log(values.role_id);
    Axios.put('http://localhost:3001/update',
    {name:values.name,email:values.email,password:values.password,account_address:values.account_address,gender:values.gender,role_id:values.role_id,id:id}).then((response)=>{
         setUserList(userList.map((val)=>{
           return val.id === id ? {id:val.id,name:newName,email:newEmail,password:newpassword,account_address:newaccount_address,gender:newGender,role_id:newrole_id}:val;
         }))
        });
}
    };

  


    const handleSubmit = e => {
        e.preventDefault()
        
        addUser(e);
        if (validate()){
            console.log('success submit2')
           addOrEdit(values,resetForm);
           console.log('success submit3')
           setOpenPopup(false);
           console.log('success submit1')
        }
        console.log('success submit')
    }

    useEffect(()=>{
        if(recordForEdit!=null)
        setValues({
            ...recordForEdit
        })
    },[recordForEdit])
   
    return(
        <Form onSubmit={handleSubmit}>
            
        <Grid container>
        <Grid item xs={6}>
            <Controls.Input
                name="user_name"
                label="User Name"
                value={values.user_name}
                onChange={handleInputChange}
                error={errors.user_name}
            />
            <Controls.Input
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
            />
            

            <Controls.Select
                label="Role"
                name="role_id"
                value={values.role_id}
                onChange={handleInputChange}
                options={getRoles}
                error={errors.role_id}
            />
            </Grid>
            <Grid item xs={6}>
            <Controls.Input
                label="Account Address"
                name="account_address"
                value={values.account_address}
                onChange={handleInputChange}
            />
         
            <Controls.Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                
            />
            <Controls.Input
                name="location"
                label="Location"
                value={values.location}
                onChange={handleInputChange}
            />
            </Grid>

            <div>
                <Controls.MainButton
                    type="submit"
                    text="Submit"
                    onClick={handleSubmit} 
                    />
                <Controls.MainButton
                    text="Reset"
                    color="default"
                    onClick={resetForm}
                     />
            </div>
        
    </Grid>
        </Form>
    )

    
}