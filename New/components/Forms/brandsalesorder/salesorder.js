import React, { useState, map } from "react";
import PageHeader from "../../PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Provider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import supplychain from "../../contracts/Supplychain.json";
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
import useTable from "../../useTable";
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../Popup";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../Notification";
import ConfirmDialog from "../../ConfirmDialog";
import { toggleCartHidden } from "../../../redux/item/item.actions";

const headCells = [
  { id: "upc", label: "UPC" },
  { id: "merchandizer", label: "Merchandizer" },
  { id: "description", label: "Description" },
  { id: "order", label: "Order Date" },
  { id: "actions", label: "Actions" },
];

export default function BrandSALESORDER(props) {
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
const infuraKey =
  "wss://rinkeby.infura.io/ws/v3/10cfdc60e2c841e4b03a5adf4abae931";

const privateKey =
  "9176b3b77e8cec54e5406f93ffe839cd9115a7efe36d2a0a53fc71f8721352db";
const BRAND_provider = new Provider(privateKey, infuraKey);
const web3s = new Web3(BRAND_provider);
const BRAND_contract = new web3s.eth.Contract(
  supplychain.abi,
  "0xCf77731Cb0C5459a5237BEAF5Df65526BE2Ff12a"
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
    axios.get("http://localhost:5000/user/getsalesorder").then((response) => {
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
    const accounts = "0x17ca0f60ee0d9126f410dba466a659b3fb751496";
   const receipt = await BRAND_contract.methods
      .purchaseItemByBrand(item.productupc)
      .send({
        from: accounts,
      });

    console.log(receipt.transactionHash);
  };

  const onDelete = (user_id) => {
    console.log(user_id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .delete(`http://localhost:5000/users/deleteitem/${user_id}`)
      .then((response) => {
        setUsers(
          users.filter((val) => {
            return val.user_id !== user_id;
          })
        );
      });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const checkstatus = async ({ item }) => {
   
    const logger = await BRAND_contract.methods
      .fetchItemBufferThree(item.productupc)
      .call();
    console.log(logger);

    const value = ` <div>
  Story behind your Product: ${item.productupc} 
  <h3>Manaufactured By : ${logger[2]} </h3>
  <br/>
  <h3>Client Address : ${logger[3]} </h3>
  <br/>
  <h3>Merchandizer Involved : ${logger[4]} </h3>
  <br/>
  <h3>Machines used in manufacturing your Product Involved : ${logger[8]} </h3>
  <br/>
  <h3>Passed through treatements : ${logger[5]} </h3>
  <br/>
  <h3>Emplyess  Involved : ${logger[7]} </h3>
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
        
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaging().map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.productupc}</TableCell>
                <TableCell>{item.merch_id}</TableCell>
                <TableCell>{item.sample}</TableCell>
                <TableCell>{item.SOCreatedAt}</TableCell>

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
                      {item.status}
                    </Button>
                  ) : (
                    <Button
                      id="button12"
                      onClick={() => {
                        acceptDelivery({ item });
                        dispatch(toggleCartHidden(item));
                      }}
                    >
                      Order Completed
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
      <Popup
        title="QR Code"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
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
