import React,{useState,useEffect} from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../controls/Controls';
import { useForm, Form } from '../../useForm';
import Axios from 'axios';
import supplychain_contract from '../factory';

export default function ManuForm(props){
    const {addOrEdit,setOpenPopup,recordForEdit}=props;

    const getRoles =[
        { id: '1', title: 'Brand' },
        { id: '2', title: 'Supplier' },
        { id: '3', title: 'Manufacturer' },
      ]
      const getActions =[
        { id: 'Passed', title: 'Passed' },
        { id: 'Pending', title: 'Pending' },
        
      ]

      const initialFValues = {
        desc:'',
        _upc:'',
        id:0,
        hash:'',
        machine:'',
        productupc:'',
        newRole:'0',
        merch_id:'',
        product_id:'',
        treatments:'',
        empaddress:'',
        product_id:0,
        createdAt:'',
        stitchcode:'',
        cost_sku:'',
        pattern:'',
        quality_inspection:'',
        sewing:'',
        newSewing:'',
        newcutting:'',
        cutting:'',
        newWasing:'',
        newFinishing:'',
        washing:'',
        finishing:'',
        quantity:'',
        price: "",
        privatekey:'9ad55ba5bbefece176836f98bc15d15fdab54eecc7ba8f6e76d8e70fec27610c',
        infuraKey :'wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931'
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('_upc' in fieldValues)
            temp._upc = fieldValues._upc ? "" : "This field is required."
        if ('product' in fieldValues)
            temp.productupc = fieldValues.productupc ? "" : "This field is required."
        if ('merch_id' in fieldValues)
            temp.merch_id = fieldValues.merch_id !=0? "" : "This field is required."
        if ('empaddress' in fieldValues)
            temp.empaddress = fieldValues.empaddress.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues , true, validate);

    const[userList,setUserList]=useState([]);

    

    const addProduct=async(e)=>{

        const id=values.product_id;
        e.preventDefault();
        if(id==0){
        try{
            console.log()
    const accounts = '0x6829b48374596ada2b7cba811697454ed950c71e'
    const product= await supplychain_contract.methods.processedItemByManufacturer(values._upc,values.machine,values.productupc,values.merch_id,values.treatments,values.empaddress).send({
        from:accounts
    })
    console.log(product.transactionHash)
    
//     const output=receipt.events.logNewItem
//  const productupc =output.returnValues[0]
//  const sku=output.returnValues[2]
//  const sender=output.returnValues[3]
//  const treatments= output.returnValues[4]
//  const batch=output.returnValues[10]
//  console.log(product.events.logNewItem)
//  addOrEdit(product.transactionHash,resetForm);

            Axios.post('http://localhost:5000/user/createproduct',
            {
                  rawitemupc: values._upc,
                 merch_id: values.merch_id,
                 employee_id:values.empaddress,
                 treatements:values.treatments,
                 productupc:values.productupc,
                 machine_id:values.machine,
                  createdAt: values.createdAt,
                 stitchcode: values.stitchcode,
                 cost_sku:values.cost_sku,
                 quality_inspection:values.quality_inspection,
  
        }).then(()=>{

            console.log("success");
        });
 
           // ({loading:false});
        }
        catch(error){
        console.log(error)
        }
        }   

else{

   Axios.put('http://localhost:5000/user/updateproduct',
   {
    cost_sku:values.cost_sku,
    quantity:values.quantity,
    id:id})
    .then((response)=>{
       
        setUserList(userList.map((val)=>{
          return val.product_id === id ? {id:val.product_id,sewing:newRole,washing:newRole,finishing:newRole,cutting:newRole}:val;
        }))
       });
}
   };

 


   const handleSubmit = async(e) => {
       e.preventDefault()
      try{addProduct(e)
        if (validate()){
            console.log(values.hash)
           addOrEdit(values,resetForm);
           setOpenPopup(false);
            
        }}
        catch(error){
            console.log(error)
        }
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
                name="_upc"
                label="Raw Materials used"
                value={values._upc}
                onChange={handleInputChange}
                error={errors._upc}
            />
            <Controls.Input
                label="Merchandizers"
                name="merch_id"
                value={values.merch_id}
                //options={getRoles}// get merch from db
                onChange={handleInputChange}
                error={errors.merch_id}
            />
            

            <Controls.Input
                label="Employees invloved"
                name="empaddress"
                value={values.empaddress}
                onChange={handleInputChange}
                //options={getRoles}// get employees from db
                error={errors.empaddress}
            />
            </Grid>
            <Grid item xs={6}>
            <Controls.Input
                label="Treatements"
                name="treatments"
                value={values.treatments}
                onChange={handleInputChange}
            />
            <Controls.Input
            label="Production Date"
            name="createdAt"
            value={values.createdAt}
            //options={getRoles}// get merch from db
            onChange={handleInputChange}
            error={errors.createdAt}
        />
         
           
            </Grid>

           
        
    </Grid>
    <Grid container>
        <Grid item xs={6}>
            <Controls.Input
                name="stitchcode"
                label="Stitch Code"
                value={values.stitchcode}
                onChange={handleInputChange}
                error={errors.stitchcode}
            />
            <Controls.Input
                label="Quantity"
                name="quantity"
                value={values.quantity}
                //options={getRoles}// get merch from db
                onChange={handleInputChange}
                error={errors.quantity}
            />
            <Controls.Input
            label="Price"
            name="cost_sku"
            value={values.cost_sku}
            //options={getRoles}// get merch from db
            onChange={handleInputChange}
            error={errors.cost_sku}
        />
            
            <Controls.Select
                label="Product quality_inspection"
                name="quality_inspection"
                //value={values.quality_inspection}
                onChange={handleInputChange}
                options={getActions}// get employees from db
                error={errors.quality_inspection}
            />
            <Controls.Input
            name="productupc"
            label="Product UPC"
            value={values.productupc}
            onChange={handleInputChange}
            
        />
        <Controls.Input
            name="machine"
            label="Machines used in total ?"
            value={values.machine}
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
)}