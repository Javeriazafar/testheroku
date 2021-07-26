import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";
import TextField from "@material-ui/core/TextField";
import supplychain_contract from "../../../components/Forms/factory";
import Notification from "../../../components/Notification";

import axios from "axios";

export default function ManuOrderDetailsForm(props) {
  const { material, upc } = props;

  const initialFValues = {
    merchandizer: "",
    desc: "",
    quantity: "",
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
 
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const addUser = async (e) => {
    const response = await supplychain_contract.methods
      .orderByManufacturer(values.desc)
      .call();
    console.log(response.description);

    console.log(response.transactionHash);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(e);
    axios
      .post("http://localhost:5000/user/createrequestmanu", {
        upc: props.upc,
        merchandizer: values.merchandizer,
        material: props.material,
        description: values.desc,
        Suser_id:props.user_id,//supplier user_id
        user_id: user_id, //35 - Manufacturer id
        quantity: values.quantity,
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setNotify({
          isOpen: true,
          message: `Request Sent`,
          type: "success",
        });
      });
  };

  return (
    <div>
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            label="Raw Material"
            name="material"
            value={props.material}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="upc"
            label="Item Code"
            value={props.upc}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Merchandizer"
            name="merchandizer"
            value={values.merchandizer}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="standard-number"
            label="Quantity in PCs"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Let us know your Requirements "
            name="desc"
            value={values.desc}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
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
