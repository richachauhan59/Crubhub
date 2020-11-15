import React, { useState } from 'react';
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
import Navbar from '../navbar/Navbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
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
        zIndex: '0'
        // marginTop: '60px'
    },
    toolbar: {
        height: '60px'
    },
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
        border: '1px solid gray',
        borderRadius: '0px',
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
    document.title = 'Checkout | Crubhub';

    const classes = useStyles();
    const history = useHistory();

    let total = 0;

    const { cart, authToken } = useSelector((state) => state.auth);

    const restaurant_id =
        JSON.parse(localStorage.getItem('restaurant_id')) ||
        '5fab9241b9d43a2c3471da76';

    const handlePayment = async (e) => {
        e.preventDefault();
        if (authToken === '') {
            history.push('/login');
            return;
        }
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/order',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    amount: Number((total + 4.99 + 0.1 * total).toFixed(2))
                }
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
                            data: {
                                amount: Number(
                                    (total + 4.99 + 0.1 * total).toFixed(2)
                                )
                            }
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
                            By providing your phone number, you consent to
                            receive text messages from Grubhub related to your
                            order.
                            <br /> Standard message rates may apply. See our
                            Terms of Use for more information.
                        </p>
                        <Typography className={classes.forBold}>
                            Address
                        </Typography>
                        <TextField
                            className={classes.inputBoxAdd}
                            label="Address(Required)"
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
                            <button
                                type="button"
                                className={classes.forBtn}
                                style={{
                                    backgroundColor: '#0271eb',
                                    color: 'white'
                                }}
                            >
                                Home
                            </button>
                            <button type="button" className={classes.forBtn}>
                                Work
                            </button>
                            <button type="button" className={classes.forBtn}>
                                Other
                            </button>
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
                        <ListItem>
                            <PersonAddIcon style={{ marginRight: '10px' }} />
                            <ListItemText>
                                Invite friends and order together
                            </ListItemText>
                        </ListItem>
                    </List>
                    <hr />
                    <div style={{ margin: '20px' }}>
                        <Typography style={{ fontFamily: 'esti' }}>
                            Your Order details
                        </Typography>
                    </div>
                    <div
                        style={{
                            margin: '20px',
                            overflowY: 'auto',
                            height: '210px'
                        }}
                    >
                        {cart.map((item, index) => {
                            total += item.totalCost;
                            return (
                                <div key={item.name + index}>
                                    <div style={{ lineHeight: '50px' }}>
                                        <span style={{ marginRight: '20px' }}>
                                            {item.quantity}
                                        </span>
                                        <span>{item.name}</span>
                                        <span style={{ float: 'right' }}>
                                            {item.totalCost.toFixed(2)}$
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ margin: '20px' }}>
                        <div>
                            <span>Item subtotal</span>
                            <span style={{ float: 'right' }}>
                                {total.toFixed(2)}$
                            </span>
                        </div>
                        <div>
                            <span>Delivery fee</span>
                            <span style={{ float: 'right' }}>4.99$</span>
                        </div>
                        <div>
                            <span>Tax and fees</span>
                            <span style={{ float: 'right' }}>
                                {(0.1 * total).toFixed(2)}$
                            </span>
                        </div>
                        <div
                            style={{
                                fontFamily: 'esti',
                                lineHeight: '50px',
                                fontSize: '18px'
                            }}
                        >
                            <span>Total</span>
                            <span style={{ float: 'right' }}>
                                {(total + 4.99 + 0.1 * total).toFixed(2)}$
                            </span>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            color: 'white'
                        }}
                    >
                        <Link
                            style={{
                                background: '#0070eb',
                                padding: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                fontFamily: 'Raleway',
                                color: 'white',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                            to={`/restaurant/${restaurant_id}`}
                        >
                            <ChevronLeftIcon />
                            <div style={{ fontSize: '18px' }}>
                                Modify your order
                            </div>
                        </Link>
                        <div
                            style={{
                                background: '#545470',
                                height: '60px',
                                display: 'flex',
                                padding: '10px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontFamily: 'esti',
                                fontSize: '30px'
                            }}
                        >
                            <span>TOTAL</span>{' '}
                            <span style={{ float: 'right' }}>
                                {(total + 4.99 + 0.1 * total).toFixed(2)}$
                            </span>
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}
