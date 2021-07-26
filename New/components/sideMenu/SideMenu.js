import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";

// withStyles & makeStyles

// const style = {
//     sideMenu: {
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'absolute',
//         left: '0px',
//         width: '320px',
//         height: '100%',
//         backgroundColor: '#253053'
//     }
// }

const SideMenu = (props) => {
    //const { classes } = props;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            left: '0px',
            width: '320px',
            height: '100%',
            backgroundColor: '#253053'
        }}>
            <img src="logo2.PNG" height="85px" width="250px" style={{marginLeft:'40px'}}></img>

        </div>
    )
}

export default SideMenu;