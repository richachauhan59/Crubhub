import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './navbar/Navbar';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/actions';
import { Link } from 'react-router-dom';

function Order({ details }) {
    const classes = useStyles();
    const date = details.date.split(' ');
    return (
        <div
            style={{
                height: '120px',
                width: '70%',
                margin: 'auto',
                background: 'white',
                borderRadius: '4px',
                border: '1px solid #ddd',
                display: 'flex',
                fontFamily: 'sans-serif',
                color: '#777',
                marginBottom: '40px'
            }}
        >
            <img
                src={details.image}
                alt={details.name}
                style={{
                    height: '100%',
                    width: '180px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            />
            <div
                style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px'
                }}
            >
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h2 style={{ fontFamily: 'esti', color: 'black' }}>
                            {details.restaurant}
                        </h2>
                        <div>{`${date[0]}, ${date[1]} ${date[2]}, ${date[3]}`}</div>
                    </div>
                    <div>{details.address}</div>
                </div>
                <div
                    style={{
                        color: 'black',
                        fontFamily: 'esti',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>$ {details.cost}</div>
                    <Link
                        className={classes.link}
                        to={`/restaurant/${details.restaurantId}`}
                    >
                        Go to restaurant
                    </Link>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: '380px',
        zIndex: '0',
        backgroundColor: 'white',
        marginTop: '60px',
        padding: '35px 25px',
        fontFamily: 'esti'
    },
    link: {
        textDecoration: 'none',
        border: '1px solid #0070eb',
        background: '#0070eb',
        padding: '5px 10px',
        borderRadius: '4px',
        transition: 'background 0.3s ease',
        color: 'white',
        fontSize: '16px',

        '&:hover': {
            background: '#0058b8'
        }
    }
}));

function PastOrders(props) {
    document.title = 'Orders';
    const classes = useStyles();
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.auth.orders);

    return (
        <div>
            <Navbar {...props} />
            <div style={{ marginTop: '60px', background: '#fbfbfc' }}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="left"
                >
                    <div
                        style={{
                            fontSize: '28px',
                            marginBottom: '20px'
                        }}
                    >
                        Your account
                    </div>
                    <div style={{ marginBottom: '15px' }}>Past orders</div>
                    <div
                        style={{ color: '#0070eb', cursor: 'pointer' }}
                        onClick={() => dispatch(logout())}
                    >
                        Sign out
                    </div>
                </Drawer>
                <div
                    style={{
                        padding: '40px',
                        paddingLeft: '420px',
                        minHeight: 'calc(100vh - 60px)'
                    }}
                >
                    {orders.length > 0 ? (
                        <div>
                            <h1
                                style={{
                                    fontFamily: 'esti',
                                    fontSize: '25px',
                                    marginBottom: '40px'
                                }}
                            >
                                Your orders
                            </h1>
                            {orders.map((order, index) => (
                                <Order
                                    key={order.restaurant + index}
                                    details={order}
                                />
                            ))}
                        </div>
                    ) : (
                        <h1
                            style={{
                                fontFamily: 'esti',
                                fontSize: '30px',
                                color: '#d4d4db',
                                textAlign: 'center'
                            }}
                        >
                            You don't have any recent orders.
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PastOrders;
