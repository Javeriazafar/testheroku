import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../controls/Controls";
import { useForm, Form } from "../../useForm";
import Axios from "axios";
import supplychain from "../../contracts/Supplychain.json";
import supplychain_contract from "../factory";
import Provider from "@truffle/hdwallet-provider";
import Web3 from "web3";

export default function SuppForm(props) {
  const { addOrEdit, setOpenPopup, recordForEdit } = props;
  // get private_key against roleid to run the contracts

  const initialFValues = {
    imageurl: "",
    code: "",
    scanResult: "",
    item_id: 0,
    upc: "",
    supplier_name: "",
    longitutde: "",
    latitude: "",
    material: "",
    price: "",
    newPrice: "",
    dye: "",
    image: "",

    user_id: 1,
    quantity: "",
    newQuantity: "",
    composition: "",
    privatekey:
      "a7622f5039081bc387aa1c20a79b9a2d0ef0b4bf640c611024783bf9dc7bc482",

    infuraKey: "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("supplier_name" in fieldValues)
      temp.supplier_name = fieldValues.supplier_name
        ? ""
        : "This field is required.";
    if ("product" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";
    if ("suser_id" in fieldValues)
      temp.suser_id =
        fieldValues.suser_id != 0 ? "" : "This field is required.";
    if ("longitutde" in fieldValues)
      temp.longitutde =
        fieldValues.longitutde.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const [userList, setUserList] = useState([]);
  const [file, setfile] = useState();


  const addProduct = async (e) => {
    const id = values.item_id;
    e.preventDefault();
    if (id == 0) {
      try {
        console.log();

        const accounts = "0x17ca0f60ee0d9126f410dba466a659b3fb751496";
        const supplier_provider = new Provider(
          "9176b3b77e8cec54e5406f93ffe839cd9115a7efe36d2a0a53fc71f8721352db",
          values.infuraKey
        );
        const web3s = new Web3(supplier_provider);
        const supplier_contract = new web3s.eth.Contract(
          supplychain.abi,
          "0xCf77731Cb0C5459a5237BEAF5Df65526BE2Ff12a"
        );

        const account = web3s.eth.accounts.privateKeyToAccount(
          "9176b3b77e8cec54e5406f93ffe839cd9115a7efe36d2a0a53fc71f8721352db"
        );
        // const account1 = web3s.eth.accounts.privateKeyToAccount(
        //   "dd0771907b760c1cd6e19acc3bc51e7fe32d2661ab1fa7b4e52cef20cfc051f2"
        // );
        // console.log(account1)
        // const re= web3s.eth.getBalance(account1.address).then((res)=>console.log(res))
        // console.log(re)
        console.log(web3s.eth.getBalance("0x15d95FE28f86773b28424b6Aa045B603b03166Db"))
        console.log(account.address);
        console.log(values.supplier_name,values.material,values.quantity,values.user_id,values.latitude,values.longitutde)
        const receipt = await supplier_contract.methods.itemBySupplier(values.upc,values.supplier_name,values.latitude,values.longitutde,values.material,values.price,values.quantity).send({
            from: accounts
        })
      console.log(receipt.transactionHash)

        //     const output=receipt.events.logNewItem
        //  const quantity =output.returnValues[0]
        //  const sku=output.returnValues[2]
        //  const sender=output.returnValues[3]
        //  const latitude= output.returnValues[4]
        //  const batch=output.returnValues[10]
        //  console.log(product.events.logNewItem)
        //  addOrEdit(product.transactionHash,resetForm);
        const data= new FormData();
        
        data.append('file',file)
        data.append('upc',values.upc)
        data.append('user_id',6)
        data.append('createdAt',values.createdAt)
        data.append('quantity',values.quantity)
        data.append('longitude',values.longitude)
        data.append('latitude',values.latitude)
        data.append('price',values.price)
        data.append('material',values.material)

        
        console.log(data)
        Axios.post("http://localhost:5000/user/createitem", 
         data
        ).then((res) => {
          
          console.log("success");
        }).catch(err=>console.log(err));
      } catch (error) {
        console.log(error);
      }
    } else {
      Axios.put("http://localhost:5000/user/updateitem", {
        quantity: values.quantity,
        price: values.price,

        id: id,
      }).then((response) => {
        console.log(response);
        console.log(values.quantity);
        setUserList(
          userList.map((val) => {
            return val.item_id === id
              ? { id: val.item_id, quantity: newQuantity, price: newPrice }
              : val;
          })
        );
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      addProduct(e);   
      if (validate()) {
        console.log(values.hash);
        addOrEdit(values, resetForm);
        setOpenPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="supplier_name"
            label="Supplier "
            value={values.supplier_name}
            onChange={handleInputChange}
            error={errors.supplier_name}
          />

          <Controls.Input
            label="Item UPC"
            name="upc"
            value={values.upc}
            //options={getRoles}// get merch from db
            onChange={handleInputChange}
            error={errors.upc}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="latitude"
            name="latitude"
            value={values.latitude}
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

          <Controls.Input
            name="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="price"
            label="Price"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />

          <Controls.Input
            name="material"
            label="Materials used in total ?"
            value={values.material}
            onChange={handleInputChange}
          />

          <Controls.Input
            accept=".jpg"
            name="file"
            id="file"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setfile(file);
              console.log(file);
            }}
          />

          <Controls.Input
            label="Longitude"
            name="longitutde"
            value={values.longitutde}
            onChange={handleInputChange}
            //options={getRoles}// get employees from db
            error={errors.longitutde}
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
  );
}
