import React, { useState, map } from "react";
import PageHeader from "../../PageHeader";
import TextField from "@material-ui/core/TextField";
import {useSelector, useDispatch} from 'react-redux';

import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
//import { connect } from 'react-redux';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from "@material-ui/core";
import useTable from "../../../components/useTable";
import { useForm, Form } from "../../../components/useForm";
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { toggleCartHidden, togglefLAG } from "../../../redux/item/item.actions";


const headCells = [
  { id: "upc", label: "Client" },

  { id: "quantity", label: "Description" },
  { id: "quantitys", label: "Merchandizer" },
  { id: "location", label: "Product UPC" },
  //{id:'date', label: 'Date'},

  { id: "action", label: "Action" },
];

export default function NegotiateRequest(props) {
  const buttonclick = useSelector(state => state.item)


  const dispatch = useDispatch()

  console.log(props);
  const { addOrEdit, setOpenPopup, recordForEdit } = props;
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const initialFValues = {
    merchandizer: "",
    options:''
    
    
  };
  const[set, isset]=useState('')
  const [search, setSeach] = useState("");
  const [users, setUsers] = useState([]);
  const [productupc, setproductupc] = useState([]);
  const [options, setoptions] = useState("");

  const [userList, setUserList] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("quantity" in fieldValues)
      temp.merchandizer = fieldValues.merchandizer ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );

  const handleSearch = (e) => {
    e.preventDefault();
    let target = e.target;
    setSeach(target.value);
    // console.log(search)
    // users.map((i)=>{
    //     if(i.user_name==search){
    //         console.log (i.user_id)
    //     }})
    //         let  holder = users.filter(item=>item.user_name.toLowerCase().includes(search.toLowerCase()))
    //   setholder(holder)
    //   console.log(holder)

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.user_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  React.useEffect(() => {

    setUsers([recordForEdit]);
    axios.get('http://localhost:5000/user/getallproducts')
        .then((response)=>{
            console.log(response)
            setproductupc(response.data)
            
        });
    console.log(recordForEdit);
  }, []);

  const acceptOrder = async (item) => {

    console.log(item,values.options,values.merchandizer);
    axios
      .get("http://localhost:5000/user/acceptbrandorder", {
        params: {
          sample: item.sample,
          merchandizer: values.merchandizer,
          productupc: values.options,
          req_id : item.breq_id
          //pass user id of supplier currently logged in
        },
      })
      .then((response) => {
        console.log(item.breq_id);
        
        addOrEdit([values,item],resetForm);
        dispatch(toggleCartHidden(item.breq_id))
        
      });
    
    
    setOpenPopup(false);
  };

  return (
    <>
      <PageHeader
        title="New User"
        subTitle="Adding users for Access"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper style={{ margin: "2px", padding: "2px" }}>
        <Toolbar>
          <Controls.Input
            style={{ width: "50%" }}
            label="Search Users"
            //   className={classes.SerachInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.MainButton
            style={{ position: "absolute", right: "10px" }}
            text="Add New"
            //    className={classes.newButton}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item) => (
              <TableRow key={item.user_id}>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <TextField
                    
                    name="merchandizer"
                   
                    label="Merchandizer"
                    value={values.merchandizer}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                
            <TableCell>
            <InputLabel>Product UPC</InputLabel>
            <MuiSelect
                label='Product upc'
                name='options'
                value={values.options}
                onChange={handleInputChange}>
                <MenuItem value="">select</MenuItem>
                {
                    productupc.map(
                        item => (<MenuItem key={item.id} value={item.productupc}>{item.productupc}</MenuItem>)
                    )
                }
            </MuiSelect></TableCell>
                <TableCell>
                  <Controls.ActionButton
                    label="Actions"
                    color="primary"
                    
                    onClick={() => acceptOrder(item)}
                  >
                    Create Delivery
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}
