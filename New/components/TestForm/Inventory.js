import React,{useState,map} from 'react';
import InventoryForm from './InventoryForm';
import PageHeader from '../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/AccountBalance';
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { FormatColorResetOutlined, Search } from "@material-ui/icons";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";


// const useStyles = makeStyles(theme => ({
//     pageContent: {
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     },
//     SerachInput:{
//         width:'50%'
//     },
//     newButton:{
//         position:'absolute',
//         right:'10px'
//     }


// }))

const headCells=[
    {id:'user_name', label: 'User Name'},
    {id:'email', label: 'Email'},
    {id:'phone', label: 'Phone Number'},
    {id:'city', label: 'City'},
    {id:'gender', label: 'Gender'},
    {id:'department', label: 'Department'},
    //{id:'date', label: 'Date'},
    {id:'actions', label:'Actions'}
]

export default function Inventory() {
    

    const [users,setUsers]=useState([]);

        

    // const classes = useStyles();
    const [filterFn,setFilterFn]=useState({fn: items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
    const[userList,setUserList]=useState([]);
    const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});

    const{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    }=useTable(headCells,users,filterFn);


    const handleSearch=e=>{
        let target=e.target;
        setFilterFn({
            fn: items=>{
                if(target.value=="")
                   return items;
                else
                   return items.filter(x=>x.email.toLowerCase().includes(target.value))
            }
        })
    }

    React.useEffect(() => {
        axios.get('http://localhost:5000/user/getall')
        .then((response)=>{
            console.log(response)
            setUserList(response.data);
        }); 
      }, []);

    const addOrEdit=(user,resetForm)=>{
        console.log(user)
        setOpenPopup(false);
        //setOpenPopup(false);
        // if(user.id!=0)
        //    {updateUser();}
        setNotify({
            isOpen:true,
            message:'Submitted Successfully',
            type:'success'
        });
        setRecordForEdit(null);
        resetForm;

    }

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete=id=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
        axios.delete(`http://localhost:3001/users/${id}`).then((response)=>{
        setUserList(userList.filter((val)=>{
           return val.id!==id;
        }))
     });
     setNotify({
        isOpen:true,
        message:'Deleted Successfully',
        type:'error'
    });
   
    }

    return (
        <>
            <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper style={{margin: '5px',padding:'3px'}}>
            {/* <InventoryForm/> */}
             
                <Toolbar>
                    <Controls.Input
                    style={{width:'50%', marginTop:'10px'}}
                      label="Search Users"
                    //   className={classes.SerachInput}
                      InputProps={{
                          startAdornment: (<InputAdornment position="start">
                              <Search/>
                          </InputAdornment>) 
                       }}
                      onChange={handleSearch}
                    />
                    <Controls.MainButton
                    style={{margin:'50px'}}
                       text="Add New"
                    //    className={classes.newButton}
                       variant="outlined"
                       startIcon={<AddIcon/>}
                       onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                   
                    {
                        
                         recordsAfterPaging().map(item=>
                        (<TableRow key={item.id}>
                            
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.city}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                {/* <TableCell>{item.date}</TableCell> */}
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary"
                                    onClick={()=>{openInPopup(item)}}>
                                        <EditOutlinedIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                    color="secondary"
                                    onClick={()=>{
                                        setConfirmDialog({
                                            isOpen:true,
                                            title:'Are you sure to delete this record?',
                                            subTitle:"You can't undo this operation",
                                            onConfirm:()=>{onDelete(item.id)}
                                        })
                                        }}>
                                        <CloseIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>))
}
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup
              title="Employee Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <InventoryForm
               addOrEdit={addOrEdit}
               setOpenPopup={setOpenPopup}
               recordForEdit={recordForEdit}
            />
            </Popup>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
            <ConfirmDialog
             confirmDialog={confirmDialog}
             setConfirmDialog={setConfirmDialog}
             />
           
        </>
    )
}