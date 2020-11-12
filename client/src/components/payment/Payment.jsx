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
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Navbar from "../navbar/Navbar"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(5)
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth
    },
    drawer: {
        width: '450px'
    },
    drawerPaper: {
        width: '450px',
        postion: 'relative'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    inputBox: {
        width: '50%',
        margin: '1%',
        fontFamily: 'esti'
    },
    inputBoxAdd: {
        width: '30%',
        margin: '1%'
    },
    forBold: {
        fontSize: 'x-large',
        fontFamily: 'esti',
        margin: '1%'
    },
    forBtnDiv: {
        width: '100%'
    },
    forBtn: {
        width: '30%',
        height: '55px',
        background: 'transparent',
        color: '#0271EB',
        fontWeight: 'bolder',
        fontSize: 'large',
        '&:hover': {
            background: '#0271EB',
            color: 'white'
        }
        // for bold : esti
        // for normal: Raleway
    }
}));

export default function Payment(props) {
    const classes = useStyles();

    let Mozzarella_Sticks = 8;
    let Waffel_fries = 10;
    let total = Mozzarella_Sticks + Waffel_fries + 5 + 5;

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/order',
                headers: { 'Content-Type': 'application/json' },
                data: { amount: Number(total) }
            });

            const options = {
                name: 'Crubhub',
                description: 'RazorPay gateway',
                order_id: data.id,
                handler: async (response) => {
                    try {
                        const paymentId = response.razorpay_payment_id;
                        const captureResponse = await axios({
                            method: 'POST',
                            url: `http://localhost:5000/api/capture/${paymentId}`,
                            data: { amount: Number(total) }
                        });
                        const successObj = JSON.parse(
                            captureResponse.data.body
                        );
                        console.log(successObj);
                        const captured = successObj.captured;
                        console.log(captured);
                        if (captured) {
                            alert('Payment Successful!');
                            console.log(captured);
                        }
                    } catch (error) {
                        alert(error.message);
                        console.log('here', error);
                    }
                },
                theme: {
                    color: '#528FF0'
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Navbar {...props}></Navbar>
            <div className={classes.root}>
                <CssBaseline />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography className={classes.inputBox} variant="h4">
                        You've entered a new address
                    <br />
                    Does everything below look correct?
                </Typography>

                    <form noValidate onSubmit={handlePayment}>
                        <Grid item xs={12}>
                            <Typography className={classes.forBold}>
                                Contact
                        </Typography>
                            <TextField
                                className={classes.inputBox}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.inputBox}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.inputBox}
                                variant="outlined"
                            />
                            <TextField
                                className={classes.inputBox}
                                variant="outlined"
                            />
                        </Grid>
                        <p>
                            By providing your phone number, you consent to receive
                            text messages from Grubhub related to your order.
                        <br /> Standard message rates may apply. See our Terms
                        of Use for more information.
                    </p>
                        <Typography className={classes.forBold}>Address</Typography>
                        <TextField
                            className={classes.inputBoxAdd}
                            label="Address(Requred)"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.inputBoxAdd}
                            label="Apt., suite, floor, etc."
                            variant="outlined"
                        />
                        <TextField
                            className={classes.inputBoxAdd}
                            label="Cross Street"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.inputBoxAdd}
                            label="City(Required)"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.inputBoxAdd}
                            label=""
                            variant="outlined"
                        />
                        <TextField
                            className={classes.inputBoxAdd}
                            label="Zip Code(required)"
                            variant="outlined"
                        />
                        <Typography className={classes.forBold}>
                            Delivery instructions
                    </Typography>
                        <TextField
                            style={{ width: '98%' }}
                            variant="outlined"
                            label="Leave info for your driver here (e.g. Ring bell and leave bag on doorstep). For food instructions (e.g. more ketchup!), make a note in the related menu item."
                        />
                        <div className={`${classes.root} ${classes.forBtnDiv}`}>
                            <button className={classes.forBtn}>Home</button>
                            <button className={classes.forBtn}>Work</button>
                            <button className={classes.forBtn}>Other</button>
                        </div>
                        <button
                            type="submit"
                            style={{
                                marginTop: '20px',
                                width: '90%',
                                background: '#0271EB',
                                height: '55px',
                                color: 'white',
                                fontFamily: 'esti',
                                fontSize: 'large'
                            }}
                        >
                            Continue to Payment method
                    </button>
                    </form>
                </main>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="right"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {['invite friends and order together'].map(
                            (text, index) => (
                                <ListItem button key={text}>
                                    <PersonAddIcon />
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                    <hr />
                    <div style={{ margin: '20px' }}>
                        <Typography style={{ fontFamily: 'esti' }}>
                            Your Order from
                    </Typography>
                        <Typography
                            style={{ fontFamily: 'Raleway', color: 'blue' }}
                        >
                            Ritz Dinner
                    </Typography>
                    </div>
                    <div style={{ margin: '20px' }}>
                        <div style={{ lineHeight: '50px' }}>
                            <span>1 Waffel fries</span>
                            <span style={{ float: 'right' }}>
                                {Mozzarella_Sticks}$
                        </span>
                        </div>
                        <hr />
                        <div style={{ lineHeight: '50px' }}>
                            <span>1 Mozzarella Sticks</span>
                            <span style={{ float: 'right' }}>{Waffel_fries}$</span>
                        </div>
                        <hr />
                    </div>
                    <div style={{ margin: '20px' }}>
                        <div>
                            <span>item subtotal</span>
                            <span style={{ float: 'right' }}>
                                {Mozzarella_Sticks + Waffel_fries}$
                        </span>
                        </div>
                        <div>
                            <span>Delivery fee</span>
                            <span style={{ float: 'right' }}>5$</span>
                        </div>
                        <div>
                            <span>tax and fee</span>
                            <span style={{ float: 'right' }}>5$</span>
                        </div>
                        <div style={{ fontFamily: 'esti', lineHeight: '50px' }}>
                            <span>total</span>
                            <span style={{ float: 'right' }}>{total}$</span>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            background: '#545470',
                            height: '60px',
                            display: 'flex',
                            padding: '10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            color: 'white',
                            fontFamily: 'esti',
                            fontSize: '20px'
                        }}
                    >
                        <span>Total</span>{' '}
                        <span style={{ float: 'right' }}>{total}$</span>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
