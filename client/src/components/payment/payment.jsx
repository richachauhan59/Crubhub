import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {TextField} from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop :theme.spacing(5)
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  inputBox: {
      width: "50%",
      margin : "1%"
  },
  inputBoxAdd:{
    width:"30%",
    margin:"1%"
  },
  forBold:{
      fontWeight:"900",
      fontSize:"x-large",
      margin : "1%"
    },
  forBtnDiv:{
      width:"100%",
  },
  forBtn:{
    width:"30%",
    height:"55px",
    background:"transparent",
    color:"#0271EB",
    fontWeight:"bolder",
    fontSize:"large",
    "&:hover": {
      background:"#0271EB",
      color:"white"
    }
    // for bold : esti
    // for normal: Raleway
  }
}));

export default function Payment() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            navbar
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography className={classes.inputBox} variant="h4">
            You've entered a new address<br/>
            Does everything below look correct?
        </Typography>

        <form noValidate autoComplete="off">
        <Grid item xs={12}>
            <Typography className={classes.forBold} >Contact</Typography>
            <TextField className={classes.inputBox} variant="outlined" />
            <TextField className={classes.inputBox} variant="outlined" />
            <TextField className={classes.inputBox} variant="outlined" />
            <TextField className={classes.inputBox} variant="outlined" />
        </Grid> 
            <p>By providing your phone number, you consent to receive text
             messages from Grubhub related to your order.<br/> Standard message
             rates may apply. See our Terms of Use for more information.</p>
            <Typography className={classes.forBold} >Address</Typography>
            <TextField className={classes.inputBoxAdd} label="Address(Requred)" variant="outlined" />
            <TextField className={classes.inputBoxAdd} label="Apt., suite, floor, etc." variant="outlined" />
            <TextField className={classes.inputBoxAdd} label="Cross Street" variant="outlined" />
            <TextField className={classes.inputBoxAdd} label="City(Required)" variant="outlined" />
            <TextField className={classes.inputBoxAdd} label="" variant="outlined" />
            <TextField className={classes.inputBoxAdd} label="Zip Code(required)" variant="outlined" />
            <Typography className={classes.forBold} >Delivery instructions</Typography>
            <TextField style={{width:"98%"}} variant="outlined" label="Leave info for your driver here (e.g. Ring bell and leave bag on doorstep). For food instructions (e.g. more ketchup!), make a note in the related menu item." />
            <div className={`${classes.root} ${classes.forBtnDiv}`} >
                <button className={classes.forBtn} >Home</button>
                <button className={classes.forBtn} >Work</button>
                <button className={classes.forBtn} >Other</button>
            </div>
            <div><button style={{marginTop:"20px", width:"90%", background:"#0271EB",height:"55px", color:"white",fontWeight:"bolder",fontSize:"large" }} >Contact</button></div>
        </form>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['invite friends'].map((text, index) => (
            <ListItem button key={text}>
                <PersonAddIcon/>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
