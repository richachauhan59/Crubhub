import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { TextField } from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, saveOrder } from '../../redux/auth/actions';

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
    },
    toolbar: {
        height: '60px'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        paddingLeft: '70px'
    },
    inputBox: {
        width: '75%',
        margin: '1%',
        fontFamily: 'esti'
    },
    inputBoxAdd: {
        width: '30%',
        margin: '1%',
        backgroundColor: 'white'
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
        border: '1px solid rgba(0,0,0,0.25)',
        borderRadius: '0px',
        background: 'transparent',
        color: '#0271EB',
        fontWeight: 'bolder',
        fontSize: 'large',
        cursor: 'pointer',
        '&:hover': {
            background: '#0271EB',
            color: 'white'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '20%',
        textAlign: 'center',
        '& h1': {
            fontFamily: 'esti',
            fontSize: '40px',
            letterSpacing: '1px'
        }
    }
}));

export default function Payment(props) {
    document.title = 'Checkout | Crubhub';

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    let total = 0;

    const { cart, authToken, email } = useSelector((state) => state.auth);

    const [addressType, setAddressType] = useState('home');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                            //alert('Payment Successful!');
                            handleOpen();
                            setTimeout(() => {
                                history.push('/orders');
                                dispatch(clearCart());
                                dispatch(
                                    saveOrder({
                                        total: (
                                            total +
                                            4.99 +
                                            0.1 * total
                                        ).toFixed(2),
                                        email,
                                        restaurant: restaurant_id
                                    })
                                );
                            }, 2000);
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
        <React.Fragment>
            <div>
                <Navbar {...props}></Navbar>
                <div className={classes.root}>
                    <CssBaseline />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Typography className={classes.inputBox} variant="h4">
                            Review and place order
                        </Typography>
                        <Typography variant="h6" className={classes.inputBox}>
                            Review address and pay to complete your purchase
                        </Typography>

                        <form onSubmit={handlePayment}>
                            <Typography className={classes.forBold}>
                                Address
                            </Typography>
                            <TextField
                                className={classes.inputBoxAdd}
                                label="Address"
                                variant="outlined"
                                required
                            />
                            <TextField
                                className={classes.inputBoxAdd}
                                label="Apt., suite, floor, etc."
                                variant="outlined"
                                required
                            />
                            <TextField
                                className={classes.inputBoxAdd}
                                label="Cross Street"
                                variant="outlined"
                                required
                            />
                            <TextField
                                className={classes.inputBoxAdd}
                                label="City"
                                variant="outlined"
                                required
                            />
                            <TextField
                                className={classes.inputBoxAdd}
                                label="State"
                                variant="outlined"
                                required
                            />
                            <TextField
                                className={classes.inputBoxAdd}
                                label="Zip Code"
                                variant="outlined"
                                required
                            />
                            <Typography className={classes.forBold}>
                                Delivery instructions
                            </Typography>
                            <textarea
                                style={{
                                    margin: '0 10px',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    minWidth: '94%',
                                    maxWidth: '94%',
                                    maxHeight: '100px',
                                    minHeight: '100px',
                                    fontFamily: 'sans-serif',
                                    padding: '15px'
                                }}
                                placeholder="Leave info for your driver here (e.g. Ring bell and leave bag on doorstep). For food instructions (e.g. more ketchup!), make a note in the related menu item."
                            />
                            <div
                                className={`${classes.root} ${classes.forBtnDiv}`}
                                style={{ margin: '40px 0 0 28px' }}
                            >
                                <button
                                    type="button"
                                    className={classes.forBtn}
                                    style={{
                                        backgroundColor:
                                            addressType === 'home'
                                                ? '#0271eb'
                                                : 'transparent',
                                        color:
                                            addressType === 'home'
                                                ? 'white'
                                                : '#0271eb',
                                        borderTopLeftRadius: '4px',
                                        borderBottomLeftRadius: '4px'
                                    }}
                                    onClick={() => setAddressType('home')}
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => setAddressType('work')}
                                    style={{
                                        backgroundColor:
                                            addressType === 'work'
                                                ? '#0271eb'
                                                : 'transparent',
                                        color:
                                            addressType === 'work'
                                                ? 'white'
                                                : '#0271eb'
                                    }}
                                    type="button"
                                    className={classes.forBtn}
                                >
                                    Work
                                </button>
                                <button
                                    style={{
                                        borderTopRightRadius: '4px',
                                        borderBottomRightRadius: '4px',
                                        backgroundColor:
                                            addressType === 'other'
                                                ? '#0271eb'
                                                : 'transparent',
                                        color:
                                            addressType === 'other'
                                                ? 'white'
                                                : '#0271eb'
                                    }}
                                    type="button"
                                    className={classes.forBtn}
                                    onClick={() => setAddressType('other')}
                                >
                                    Other
                                </button>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    marginTop: '20px',
                                    width: '95.5%',
                                    background: '#0271EB',
                                    height: '55px',
                                    color: 'white',
                                    fontFamily: 'esti',
                                    fontSize: 'large',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    border: '1px solid #0271EB'
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
                                <PersonAddIcon
                                    style={{
                                        marginRight: '10px',
                                        color: '#0070eb'
                                    }}
                                />
                                <ListItemText>
                                    Invite friends and order together
                                </ListItemText>
                            </ListItem>
                        </List>
                        <hr style={{ color: 'rgba(0,0,0,0.2)' }} />
                        <div style={{ margin: '20px' }}>
                            <Typography style={{ fontFamily: 'esti' }}>
                                Your Order details
                            </Typography>
                        </div>
                        <div
                            style={{
                                margin: '20px',
                                overflowY: 'auto',
                                maxHeight: '210px'
                            }}
                        >
                            {cart.map((item, index) => {
                                total += item.totalCost;
                                return (
                                    <div key={item.name + index}>
                                        <div style={{ lineHeight: '50px' }}>
                                            <span
                                                style={{ marginRight: '20px' }}
                                            >
                                                {item.quantity}
                                            </span>
                                            <span>{item.name}</span>
                                            <span style={{ float: 'right' }}>
                                                {item.totalCost.toFixed(2)}$
                                            </span>
                                        </div>
                                        <hr
                                            style={{ color: 'rgba(0,0,0,0.2)' }}
                                        />
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1 id="transition-modal-title">
                            Payment successfull!
                        </h1>
                        <img
                            style={{ width: '200px' }}
                            src="/tick_mark.webp"
                            alt="success"
                        />
                        <p style={{ fontWeight: 'bold' }}>
                            Redirecting to orders...
                        </p>
                        <p>
                            <a href="/orders">Click Here</a> if not redirected.
                        </p>
                    </div>
                </Fade>
            </Modal>
        </React.Fragment>
    );
}
