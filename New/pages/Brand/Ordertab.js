import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import TextField from "@material-ui/core/TextField";
import Notification from '../../components/Notification';

import axios from "axios";

export default function ManuOrderDetailsForm(props) {
  const { material, upc } = props;

  const initialFValues = {
    
    description: "",
    
    infuraKey: "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("merchandizer" in fieldValues)
      temp.merchandizer = fieldValues.merchandizer
        ? ""
        : "This field is required.";
    if ("quantity" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";
    if ("desc" in fieldValues)
      temp.desc = fieldValues.desc ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const [users, setUsers] = useState([]);
  const [file, setfile] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const newRequest = async (e) => {
    e.preventDefault();
    
        try {
          console.log();
          const data= new FormData();
        
          data.append('file',file)
          data.append('description',values.description)
          data.append('user_id',36)
          axios.post("http://localhost:5000/user/createbrandorder", 
         data
        ).then((res) => {
          
          console.log("success");
        }).catch(err=>console.log(err));
        
        }
          catch (error) {
            console.log(error);
          }
        
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      newRequest(e);   
      if (validate()) {
        console.log('validates')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container>
        <Grid item xs={6}>
          <TextField
            label="Order Description"
            name="description"
            value={props.description}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Controls.Input
          accept=".doc"
          name="file"
          id="file"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setfile(file);
            console.log(file);
          }}
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
    <Notification notify={notify} setNotify={setNotify} />
    </div>
    
    
  );
}
