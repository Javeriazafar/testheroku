  
import React from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';


// const useStyles = makeStyles(theme => ({
//     // root: {
//     //     backgroundColor: '#fff',
//     //     transform:'translateZ(0)'
        
//     // },
//     searchInput: {
//         // opacity: '0.6',
//         // padding: `0px ${theme.spacing(1)}px`,
//         // fontSize: '0.8rem',
//        // marginLeft:'800px',
//         '&:hover': {
//             backgroundColor: '#f2f2f2'
//         },
//         '& .MuiSvgIcon-root': {
//             marginRight: theme.spacing(1)
//         }
//     }
// }))

export default function TestHeader() {

    // const classes = useStyles();

    return (
        <AppBar position="static" style={{backgroundColor: '#fff',transform:'translateZ(0)',marginLeft:'320px',width:'1215px'}}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    {/* <Grid item>
                        <InputBase
                            placeholder="Search products"
                            // className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                            style={{
                                opacity: '0.6',
                                padding: '5px',
                                fontSize: '0.8rem',
                                marginLeft:'800px'
                            }}
                        />
                    </Grid> */}
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <ExitToAppIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}


