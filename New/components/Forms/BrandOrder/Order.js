import React, { useState, map } from "react";
import PageHeader from '../../PageHeader';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import {useSelector, useDispatch} from 'react-redux';
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Popup from "../../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../../components/Notification";
import ConfirmDialog from '../../../components/ConfirmDialog';
import useTable from "../../../components/useTable";
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import NegotiateRequest from "./NegotiateRequest";


const headCells = [
  { id: "upc", label: "Item UPC" },
  { id: "material", label: "Raw material " },
  { id: "price", label: "Price" },
  { id: "createdAt", label: "Production Date" },
  { id: "quantity", label: "Quantity" },
  { id: "actions", label: "Actions" },
];

const useStyles = makeStyles({
  root: {
    minWidth: 75,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BrandOrder() {

  const ReqChange = useSelector(state => state.item)


  const dispatch = useDispatch()

  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
 const [set, isset]=useState(false)
  const [req_id, setreq] =useState(0)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [users, setUsers] = useState([]);
  const [item, setitem] = useState('');
  const [userList, setUserList] = useState([]);
 const [updat,setup]= useState(0)
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { TblPagination, recordsAfterPaging } = useTable(
    headCells,
    users,
    filterFn
  );

  const handleSearch = (e) => {
    e.preventDefault();
    let target = e.target;
    setSeach(target.value);
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.upc.toLowerCase().includes(target.value)
          );
      },
    });
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/user/getbrandreq")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      });
    
  },[]);

const updateuser=async(user,req_id)=>{
  console.log(req_id,user)
  axios
  .put("http://localhost:5000/user/updatebrandrequest",{
    quantity:user,
    req_id:req_id
  })
  .then((response) => {
    console.log(response);
    setUserList(
      userList.map((val) => {
        return val.req_id === req_id
          ? {
              req_id: val.req_id,
              merchandizer:user
            }
          : val;
      })

      
    );
  });
 
}


const openInPopup = (item) => {
  console.log(item)
  setRecordForEdit(item);
  setOpenPopup(true);
};




const addOrEdit = async ([values,item], resetForm) => {
  setOpenPopup(false);
  // if(user.id!=0)
  console.log(values.merchandizer,item.breq_id)
 isset(true)
setreq(req_id)
setup(item.productupc)
  updateuser(values.merchandizer,item.breq_id)


  setNotify({
    isOpen: true,
    message: `Delivery Alert`,
    type: "success",
  });
  setRecordForEdit(null);
  resetForm;
};
  return (
    <>
      <PageHeader
        title="New Product"
        subTitle="Adding products for Access"
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
        {recordsAfterPaging().map((item,idx) => (
          <Card className={classes.root} variant="outlined">
            <CardContent key={item.user_id}>
              Brand Name:
              <Typography variant="h5" component="h2">
                {item.user_name}
              </Typography>
              
              <Typography variant="body2" component="p">
              
                <Button download={'/../public/upload/logo.PNG'} >
                  <i className="fas fa-download"/>
                  Download Sample File
                </Button>
               
              </Typography>
              <Typography variant="body2" component="p">
                Created: {item.RequestCreatedAt}
              </Typography>
              <Typography variant="body2" component="p">
                Status: {item.status}
              </Typography>
              <Typography variant="body2" component="p">
              Product UPC: {item.productupc}
            </Typography>
            <Typography variant="body2" component="p">
              Merchandizer: {item.merchandizer}
            </Typography>
              
              <Typography className={classes.pos} color="textPrimary">
                Description: {item.description}
                <br />
              </Typography>
            </CardContent>
            {console.log(userList, ReqChange.req_idd == item.breq_id)}
            {ReqChange.req_idd == item.breq_id && userList && ReqChange.flag ? (
              
              <Button disabled>Completed</Button>
            ) : (
              <Button
                id="button"
                variant="outlined"
                onClick={(e) => {
                  console.log(e.target.value)
                  openInPopup(item);
                }}
              >
               Negotiate
              </Button>
              
            )}
             
            
      
           
          </Card>
        ))}

        <TblPagination />
      </Paper>
      <Popup
      title="User Form"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <NegotiateRequest
        addOrEdit={addOrEdit}
        setOpenPopup={setOpenPopup}
        recordForEdit={recordForEdit}
      />
    </Popup>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
    
    </>
  );
}

