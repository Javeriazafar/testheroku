import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'

// const useStyles = makeStyles(theme => ({
//     root: {
//         backgroundColor: '#fdfdff'
//     },
//     pageHeader:{
//         padding:theme.spacing(1),
//         display:'flex',
//         marginBottom:theme.spacing(1),
        
//     },
//     pageIcon:{
//         display:'inline-block',
//         padding:theme.spacing(2),
//         color:'#3c44b1'
//     },
//     pageTitle:{
//         paddingLeft:theme.spacing(4),
//         '& .MuiTypography-subtitle2':{
//             opacity:'0.6'
//         }
//     }
// }))

export default function PageHeader(props) {

    // const classes = useStyles();
    const { title, subTitle, icon } = props;
    return (
        <Paper elevation={0} square style={{backgroundColor: '#fdfdff'}}>
            <div style={{
                marginTop:'10px',
                padding:'1px',
                display:'flex',
                marginBottom:'10px',
               
            }}>
                <Card style={{
        display:'inline-block',
        padding:'2px',
        color:'#3c44b1'}}>
                    {icon}
                </Card>
                <div style={{
                    paddingLeft:'4px' 
                    // '& .MuiTypography-subtitle2':{
                    //     opacity:'0.6'
                    // }
                }}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}</Typography>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}