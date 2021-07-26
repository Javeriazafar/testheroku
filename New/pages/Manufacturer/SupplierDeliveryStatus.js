import React, { useState, map } from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Qrcode from "qrcode";

import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { toggleCartHidden } from "../../redux/item/item.actions";
import supplychain_contract from "../../components/Forms/factory";
import Web3 from "web3";

const headCells = [
  { id: "Supplier", label: "Supplier" },

  { id: "upc", label: "UPC" },
  { id: "merchandizer", label: "Merchandizer" },

  { id: "description", label: "Description" },
  { id: "order", label: "Order Date" },
  { id: "quantity", label: "Quantity" },
  { id: "status", label: "Status" },

  //{id:'date', label: 'Date'},
  { id: "actions", label: "Actions" },
];

export default function SSOform(props) {
  const buttonclick = useSelector((state) => state.item);
  console.log(buttonclick);
  const dispatch = useDispatch();

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [search, setSeach] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [userList, setUserList] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [users, setUsers] = useState([]);
  const [imageurl, setimageurl] = useState("");

  const { TblContainer, TblHead, TblPagination, recordsAfterPaging } = useTable(
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
            x.user_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  React.useEffect(() => {
    axios.get("http://localhost:5000/user/getMSO").then((response) => {
      console.log(response);
      setUsers(response.data);
    });
  }, [buttonclick.req_idd]);

  const addOrEdit = (user, resetForm) => {
    setOpenPopup(false);
    // if(user.id!=0)
    //    {updateUser();}
    setNotify({
      isOpen: true,
      message: `You Accepted Delivery `,
      type: "success",
    });
    setRecordForEdit(null);
    resetForm;
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);

    setOpenPopup(true);
  };
  const acceptDelivery = async ({ item }) => {
    console.log(item.quantity);
    const accounts = "0x6829b48374596ada2b7cba811697454ed950c71e";
    console.log(supplychain_contract.methods.purchaseItemByManufacturer);
    const receiept = await supplychain_contract.methods
      .purchaseItemByManufacturer(item.upc, item.quantity, item.merchandizer)
      .send({
        from: accounts,
      });
  };
  const checkstatus = async ({ item }) => {
    const logger = await supplychain_contract.methods
      .fetchItemBufferOne(item.upc)
      .call();
    console.log(logger);

    const value = ` <div>
  Story behind your purchased Raw Material: ${item.upc} 
  <h3> Origin Supplier By : ${logger[4]} (${logger[3]} ) </h3>
  <br/>
  <h3>Purchased by Manufacturer : ${logger[2]} </h3>
  <br/>
  <h3>Longitutde : ${logger[6]} </h3>
  <br/>
  <h3>Latitude : ${logger[5]} </h3>
  <br/>
  <h3>Created At : ${logger[8]} </h3>
  <br/>
</div>`;

    console.log(value);
    const response = Qrcode.toDataURL(value);
    console.log(
      response.then((res) => {
        console.log(res);
        setimageurl(res);
      })
    );
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
            {recordsAfterPaging().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.upc}</TableCell>
                <TableCell>{item.merchandizer}</TableCell>
                <TableCell>{item.descript}</TableCell>
                <TableCell>{item.SOCreatedAt}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.status}</TableCell>

                <TableCell>
                  {console.log(users, buttonclick.req_idd == item.req_id)}
                  {buttonclick.req_idd == item.req_id && buttonclick.flag ? (
                    <Button
                      id="button1"
                      variant="outlined"
                      onClick={() => {
                        acceptDelivery({ item });
                        dispatch(toggleCartHidden(item));
                      }}
                    >
                      {item.orderpending}
                    </Button>
                  ) : (
                    <Button id="button12" disabled>
                      Order Pending
                    </Button>
                  )}

                  <Controls.MainButton
                    style={{ position: "absolute", right: "10px" }}
                    text="Add New"
                    //    className={classes.newButton}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      checkstatus({ item });
                      setOpenPopup(true);
                      setRecordForEdit(null);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.MainButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="QR Code" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        {" "}
        {imageurl ? (
          <a href={imageurl} download>
            <img src={imageurl} alt="imgcode"></img>
          </a>
        ) : null}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
