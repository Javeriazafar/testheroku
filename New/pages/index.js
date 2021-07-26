
import {CssBaseline, makeStyles,createMuiTheme, ThemeProvider} from '@material-ui/core';
// // const mysql=require('mysql');
// // import Route from 'react-dom';
// import AdminPage from '../pages/Admin';
import React,{useState} from "react";
import Controls from '../components/controls/Controls';
// import {makeStyles} from "@material-ui/core";
import { useForm, Form } from '../components/useForm';
import { Grid } from '@material-ui/core';
import Signin from '../components/Forms/signin';
import Popup from '../components/Popup';
import MainButton from '../components/controls/Button';
//import {BrowserRouter as Router, Route} from "react-router-dom";
import {Redirect,Link} from 'react-router-dom';



// const useStyles = makeStyles({
//   appMain: {
//     paddingLeft: '320px',
//     width: '100%'
//   }
// })



function App() {
  // const classes = useStyles();
  const [openPopup,setOpenPopup]=useState(false);
  
  const action=()=>{
    
      return <Redirect to='/Main'/>
    
  };


  return (<>
  {/* <Router>
    <Route path="/Admin" render={(props)=><Admin/>}/>
  </Router> */}
    <div>
      <img src="back1.PNG" height="753px" width="800px"></img>
      <img src="Heading.png" height="300px" width="600px" align="right"
      style={{marginTop:'60px', marginRight:'70px'}}></img>
      
      <Controls.MainButton    
      // style={{marginRight:'50px'}}
      // className={classes.signinButton}
      type="submit"
      text="Get Started"
      style={{marginRight:'10px'}}
   
      onClick={()=>{setOpenPopup(true)}}/>
      <MainButton onClick={action}
      type="submit"
      text="Action"></MainButton>
  
      </div>
  
      <Popup style={{align:'center'}}
                title="Sign In"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
      >
      <Signin setOpenPopup={setOpenPopup}/>
      </Popup>
      </>
    
  );
}

export default App;

{/* <ThemeProvider theme={theme} >
      <SideMenu />
      
      <div style={{paddingLeft: '320px',width: '100%'}} >
      <TestHeader/>
     <Inventory />
    </div>
    <Route exact path='/Admins' component={AdminPage}></Route>
    <CssBaseline />
    </ThemeProvider> */}
