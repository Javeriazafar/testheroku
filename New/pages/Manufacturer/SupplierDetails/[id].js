import React, { useState, map } from "react";
import PageHeader from "../../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/AccountBalance";
import { Paper, makeStyles, Container, Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ManuOrderDetailsForm from "./ManufacturerOrder.Details.js.js";
import Image from "next/image";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Controls from "../../../components/controls/Controls";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SupplierDetails() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [recordForEdit,setRecordForEdit]=useState([]);

  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/user/getsuppliersItems/${id}`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setRecordForEdit(response.data)
      });
  }, []);

  return (
    <div>
      <PageHeader
        title="New Product"
        subTitle="Adding products for Access"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper elevation={0} style={{ margin: "2px", padding: "2px" }}>
        <Container className="root-container" maxWidth="sm">
          <Grid className="sample-grid" container spacing={2}>
            {users.map((item) => (
              <Grid item xs={6}>
                <Card className={classes.root}>
                  <CardContent key={item.user_id}>
                    Raw Material:
                    <Typography variant="h5" component="h2">
                      {item.upc}
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      Created At: {item.createdAt}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Location: Longitude - {item.Longitude} and Latitude -{" "}
                      {item.latitude}
                    </Typography>
                    <Typography className={classes.pos} color="textPrimary">
                      Items Quantity: {item.quantity}
                      <br />
                    </Typography>
                    <Image
                      src={`/../public/upload/${item.image}`}
                      priority="true"
                      width={100}
                      height={50}
                      alt="Picture of the author"
                    />
                    <br />

                  </CardContent>
                  <Controls.MainButton
                style={{position:'absolute', right:'10px'}}
                   text="Order"
                //    className={classes.newButton}
                   variant="outlined"
                   startIcon={<AddIcon/>}
                   onClick={()=>{setRecordForEdit(item);}}
                />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
      <Paper>
      {console.log(recordForEdit)}
       <ManuOrderDetailsForm {...recordForEdit}/>
      </Paper>
    </div>
  );
}
