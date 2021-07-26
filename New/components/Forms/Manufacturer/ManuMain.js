import React,{useState,map} from 'react';

import PageHeader from '../../PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/AccountBalance';
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../useTable";
import Controls from '../../controls/Controls';
import { FormatColorResetOutlined, Search } from "@material-ui/icons";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Notification';
import ConfirmDialog from '../../ConfirmDialog';
import ManuForm from './ManuForm';


const headCells=[
    {id:'productupc', label: 'Product UPC'},
    {id:'rawitemupc', label: 'Raw material UPC'},
    {id:'merch_id', label: 'Merchandizer'},
    {id:'employee_id', label: 'Employee'},
    {id:'machine_id', label: 'Machine'},
    {id:'treatments', label: 'treatments'},
    {id:'quantity', label: 'quantity'},
    {id:'cost_sku', label: 'Price'},
    {id:'createdAt', label: 'Production Date'},
    {id:'actions', label:'Actions'}
]


export default function Manufacturer() {
    const [filterFn,setFilterFn]=useState({fn: items=>{return items;}});
    const [openPopup,setOpenPopup]=useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [search,setSeach]=useState('');
    let[item, setitem]= useState('');
    const [holder,setholder]=useState([]);
    const [notify,setNotify]=useState({isOpen:false, message:'',type:''});
    const[userList,setUserList]=useState([]);
    const[confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
    const [users,setUsers]=useState([]);
    const [updat,setup]= useState(0)

    const{
    
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    }=useTable(headCells,users,filterFn);

    const handleSearch=e=>{
        e.preventDefault();
        let target=e.target;
        setSeach(target.value)
        setFilterFn({
            fn: items=>{
                if(target.value=="")
                   return items;
                else
                   return items.filter(x=>x.productupc.toLowerCase().includes(target.value))
            }
        })   
    }
    React.useEffect(() => {
        axios.get('http://localhost:5000/user/getallproducts')
        .then((response)=>{
            console.log(response)
            setUsers(response.data);
        }); 
      }, [updat]);



    const addOrEdit=(user,resetForm)=>{
        setOpenPopup(false);
        // if(user.id!=0)
        //    {updateUser();}
        setup(user.price)
        setNotify({
            isOpen:true,
            message:`Submitted Successfully at transaction ID : ${user}`,
            type:'success'
        });
        setRecordForEdit(null);
        resetForm;
    }

    const openInPopup=item=>{
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete=product_id=>{
        console.log(product_id);
        setConfirmDialog({  
            ...confirmDialog,
            isOpen:false
        })
        axios.delete(`http://localhost:3001/users/${product_id}`).then((response)=>{
        setUserList(userList.filter((val)=>{
           return val.product_id!==product_id;
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
                title="New Product"
                subTitle="Adding products for Access"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />


            <Paper style={{margin:'2px',padding:'2px'}}>
         
             <Toolbar>
                 <Controls.Input
                style={{width:'50%'}}
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
                style={{position:'absolute', right:'10px'}}
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
                        (<TableRow key={item.product_id}>
                            
                                <TableCell>{item.productupc}</TableCell>
                                <TableCell>{item.rawitemupc}</TableCell>
                                <TableCell>{item.merch_id}</TableCell>
                                <TableCell>{item.employee_id}</TableCell>
                                <TableCell>{item.machine_id}</TableCell>
                                <TableCell>{item.treatments}</TableCell>
                                <TableCell>{item.createdAt}</TableCell>
                                <TableCell>{item.cost_sku}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
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
                                            onConfirm:()=>{onDelete(item.product_id)}
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
              title="User Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <ManuForm
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

// return (
//     <>
//         <PageHeader
//             title="New Employee"
//             subTitle="Form design with validation"
//             icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
//         />
//         <Paper style={{margin:'2px',padding:'2px'}}>
//         {/* <InventoryForm/> */}
         
//             <Toolbar>
//                 <Controls.Input
//                 style={{width:'50%'}}
//                   label="Search Users"
//                 //   className={classes.SerachInput}
//                   InputProps={{
//                       startAdornment: (<InputAdornment position="start">
//                           <Search/>
//                       </InputAdornment>) 
//                    }}
//                   onChange={handleSearch}
//                 />
//                 <Controls.Button
//                 style={{position:'absolute', right:'10px'}}
//                    text="Add New"
//                 //    className={classes.newButton}
//                    variant="outlined"
//                    startIcon={<AddIcon/>}
//                    onClick={()=>{setOpenPopup(true);setRecordForEdit(null);}}
//                 />
//             </Toolbar>
//             <TblContainer>
//                 <TblHead/>
//                 <TableBody>
               
//                 {
                    
//                      recordsAfterPaging().map(item=>
//                     (<TableRow key={item.id}>
                        
//                             <TableCell>{item.name}</TableCell>
//                             <TableCell>{item.employee_id}</TableCell>
//                             <TableCell>{item.phone}</TableCell>
//                             <TableCell>{item.city}</TableCell>
//                             <TableCell>{item.gender}</TableCell>
//                             <TableCell>{item.department}</TableCell>
//                             {/* <TableCell>{item.date}</TableCell> */}
//                             <TableCell>
//                                 <Controls.ActionButton
//                                 color="primary"
//                                 onClick={()=>{openInPopup(item)}}>
//                                     <EditOutlinedIcon fontSize="small"/>
//                                 </Controls.ActionButton>
//                                 <Controls.ActionButton
//                                 color="secondary"
//                                 onClick={()=>{
//                                     setConfirmDialog({
//                                         isOpen:true,
//                                         title:'Are you sure to delete this record?',
//                                         subTitle:"You can't undo this operation",
//                                         onConfirm:()=>{onDelete(item.id)}
//                                     })
//                                     }}>
//                                     <CloseIcon fontSize="small"/>
//                                 </Controls.ActionButton>
//                             </TableCell>
//                         </TableRow>))
// }
//                 </TableBody>
//             </TblContainer>
//             <TblPagination/>
//         </Paper>
//         <Popup
//           title="Employee Form"
//           openPopup={openPopup}
//           setOpenPopup={setOpenPopup}
//         >
//           <InventoryForm
//            addOrEdit={addOrEdit}
//            setOpenPopup={setOpenPopup}
//            recordForEdit={recordForEdit}
//         />
//         </Popup>
//         <Notification
//           notify={notify}
//           setNotify={setNotify}
//         />
//         <ConfirmDialog
//          confirmDialog={confirmDialog}
//          setConfirmDialog={setConfirmDialog}
//          />
       
//     </>
// )
// }