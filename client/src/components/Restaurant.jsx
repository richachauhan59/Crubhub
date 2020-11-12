import React, { useEffect } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import styles from './Restaurant.module.css';
import Grid from '@material-ui/core/Grid';
import MenuItem from './MenuItem';
import { Modal } from '@material-ui/core';
import Navbar from './navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantDetails } from '../redux/search/actions';
import { useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function MenuCategory({ details }) {
    return (
        <React.Fragment>
            <h2
                style={{
                    fontFamily: 'esti',
                    textAlign: 'left',
                    marginTop: '40px',
                    padding: '0 20px'
                }}
            >
                {details.name}
            </h2>
            {details.diner_description === undefined ? null : (
                <p
                    style={{
                        margin: '8px 0',
                        fontFamily: 'sans-serif',
                        fontSize: '15px',
                        color: 'black',
                        padding: '0 20px'
                    }}
                >
                    {details.diner_description}
                </p>
            )}
            <Grid style={{ marginTop: '10px' }} container spacing={1}>
                {details.menu_item_list.map((item) => (
                    <Grid item xs={12} sm={6} style={{ padding: '10px 5px' }}>
                        <MenuItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}

function Review({ details }) {
    return (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    marginBottom: '15px'
                }}
            >
                <div style={{ marginRight: '20px' }}>
                    <div
                        style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            background: '#40c2de',
                            color: 'white',
                            fontFamily: 'esti',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {details.reviewer[0].toUpperCase()}
                    </div>
                </div>
                <div>
                    {details.reviewer[0].toUpperCase() +
                        details.reviewer.slice(1).toLowerCase()}
                </div>
            </div>
            <Rating
                name="read-only"
                readOnly
                value={details.star_rating}
                precision={0.1}
            />
            <div
                style={{
                    marginBottom: '10px',
                    marginTop: '10px',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    lineHeight: '25px'
                }}
            >
                {details.content}
            </div>
            <div
                style={{
                    marginBottom: '40px',
                    height: '1px',
                    background: '#e2dff1',
                    width: '100%'
                }}
            ></div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    footerWrapper: {
        background: '#3232aa',
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
            padding: '30px 240px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '30px'
        }
    },
    footerTitle: {
        fontSize: '17.7px',
        lineHeight: '26.85px',
        fontFamily: 'esti',
        color: '#fff',
        marginBottom: '20px'
    },
    footerLink: {
        border: 'none',
        background: 'transparent',
        color: 'white',
        letterSpacing: '0.6px',
        textDecoration: 'underline',
        fontFamily: 'Raleway',
        fontSize: '14px',
        display: 'block',
        marginBottom: '10px',
        textAlign: 'left',
        '&:hover': {
            color: '#8f8fa1',
            cursor: 'pointer'
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

export default function Restaurant(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    const restaurant = useSelector((state) => state.search.restaurantDetails);
    const loading = useSelector(
        (state) => state.search.restaurantDetailsLoading
    );

    useEffect(() => {
        dispatch(getRestaurantDetails(props.location.pathname.split('/')[2]));
    }, []);

    return (
        <React.Fragment>
            <div style={{ background: '#fbfbfc' }}>
                <Navbar {...props}></Navbar>
                {loading ? (
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : (
                    <React.Fragment>
                        <div style={{ position: 'relative', height: '300px' }}>
                            <img
                                style={{
                                    width: '100%',
                                    position: 'relative',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                                alt="banner"
                                src={restaurant.bannerImage}
                            />
                            <img
                                className={styles.logo}
                                src={restaurant.logo}
                                alt="reslogo"
                            />
                        </div>
                        <div style={{ width: '75%', margin: '20px auto' }}>
                            <h2
                                style={{
                                    fontFamily: 'esti',
                                    textAlign: 'left'
                                }}
                            >
                                {restaurant.name}
                            </h2>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    marginTop: '10px',
                                    fontFamily: 'sans-serif',
                                    fontSize: '14px',
                                    color: 'black'
                                }}
                            >
                                <img
                                    style={{ marginRight: '5px' }}
                                    src="/gh_badge.svg"
                                    alt=""
                                />
                                <div>{restaurant.address.street_address}</div>
                                <div style={{ marginLeft: '20px' }}>
                                    ({String(restaurant.contact).slice(0, 3)}){' '}
                                    {String(restaurant.contact).slice(3, 6)} -{' '}
                                    {String(restaurant.contact).slice(6)}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center'
                                }}
                            >
                                <Box
                                    component="fieldset"
                                    borderColor="transparent"
                                >
                                    <Rating
                                        name="read-only"
                                        readOnly
                                        value={restaurant.rating.value}
                                        precision={0.1}
                                    />
                                </Box>
                                <div
                                    style={{
                                        marginLeft: '10px',
                                        color: 'rgb(107, 107, 131)',
                                        fontSize: '14px'
                                    }}
                                >
                                    {restaurant.rating.count} ratings
                                </div>
                                <div
                                    style={{ marginLeft: '10px' }}
                                    className={styles.accuracyNumber}
                                >
                                    {restaurant.rating.taste}%{' '}
                                    <span className={styles.accuracyFont}>
                                        Food was good
                                    </span>
                                </div>
                                <div
                                    style={{ marginLeft: '10px' }}
                                    className={styles.accuracyNumber}
                                >
                                    {restaurant.rating.onTime}%{' '}
                                    <span className={styles.accuracyFont}>
                                        Delivery was on time
                                    </span>
                                </div>
                                <div
                                    style={{ marginLeft: '10px' }}
                                    className={styles.accuracyNumber}
                                >
                                    {restaurant.rating.orderAccuracy}%{' '}
                                    <span className={styles.accuracyFont}>
                                        Order was correct
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                margin: '10px auto',
                                borderTop: '1.5px solid #e2dff1',
                                borderBottom: '1.5px solid #e2dff1',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'flex-start',
                                    width: '75%',
                                    margin: 'auto'
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'esti',
                                        marginLeft: '12px',
                                        borderBottom: '3px solid #0070eb',
                                        padding: '10px 0'
                                    }}
                                >
                                    Menu
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'esti',
                                        marginLeft: '12px',
                                        padding: '10px 0'
                                    }}
                                >
                                    About
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'esti',
                                        marginLeft: '12px',
                                        padding: '10px 0'
                                    }}
                                >
                                    Reviews
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                margin: '0px auto',
                                borderBottom: '1.5px solid #e2dff1',
                                padding: '4px 0 12px 0',
                                textAlign: 'center',
                                fontSize: '16px',
                                fontFamily: 'sans-serif'
                            }}
                        >
                            Delivery ASAP ( {restaurant.avgDeliveryTime}m -{' '}
                            {restaurant.avgDeliveryTime + 10}m )
                        </div>

                        <div
                            style={{
                                width: '75%',
                                margin: '20px auto'
                            }}
                        >
                            {restaurant.menu_category_list.map((category) => (
                                <MenuCategory details={category} />
                            ))}

                            <div
                                style={{ textAlign: 'left', marginTop: '50px' }}
                            >
                                <h1 style={{ fontFamily: 'esti' }}>
                                    {restaurant.name} Info
                                </h1>
                                <div
                                    style={{
                                        color: '#0070eb',
                                        marginTop: '10px'
                                    }}
                                >
                                    {restaurant.cuisines.join(', ')}
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <span
                                        style={{
                                            color:
                                                restaurant.priceRating >= 1
                                                    ? 'black'
                                                    : 'rgb(212, 212, 219)'
                                        }}
                                    >
                                        $
                                    </span>
                                    <span
                                        style={{
                                            color:
                                                restaurant.priceRating >= 2
                                                    ? 'black'
                                                    : 'rgb(212, 212, 219)'
                                        }}
                                    >
                                        $
                                    </span>
                                    <span
                                        style={{
                                            color:
                                                restaurant.priceRating >= 3
                                                    ? 'black'
                                                    : 'rgb(212, 212, 219)'
                                        }}
                                    >
                                        $
                                    </span>
                                    <span
                                        style={{
                                            color:
                                                restaurant.priceRating >= 4
                                                    ? 'black'
                                                    : 'rgb(212, 212, 219)'
                                        }}
                                    >
                                        $
                                    </span>
                                    <span
                                        style={{
                                            color:
                                                restaurant.priceRating >= 5
                                                    ? 'black'
                                                    : 'rgb(212, 212, 219)'
                                        }}
                                    >
                                        $
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginTop: '15px',
                                        gap: '20px'
                                    }}
                                >
                                    <div
                                        style={{
                                            color: 'rgb(0, 112, 235)',
                                            lineHeight: '25px',
                                            fontFamily: 'sans-serif'
                                        }}
                                    >
                                        <img
                                            src='https://maps.googleapis.com/maps/api/staticmap?size=518x100&amp;center=37.77662658,-122.40257264&amp;zoom=15&amp;style=feature:poi%7Cvisibility:off&amp;markers=size:mid%7Ccolor:red%7C37.77662658,-122.40257264&amp;client=gme-grubhubinc&amp;signature=RZeSk2sq7slBG1ZU0fbcmAm_YwM");'
                                            alt="google map"
                                        />
                                        <div
                                            style={{
                                                marginTop: '10px',

                                                fontSize: '16px'
                                            }}
                                        >
                                            {restaurant.address.street_address}
                                        </div>
                                        <div>
                                            {
                                                restaurant.address
                                                    .address_locality
                                            }
                                            ,{' '}
                                            {restaurant.address.address_region}{' '}
                                            {
                                                restaurant.address.postal_code.split(
                                                    '-'
                                                )[0]
                                            }
                                        </div>
                                        <div>
                                            {location.state?.distance.toFixed(
                                                2
                                            )}{' '}
                                            mi
                                        </div>
                                        <div
                                            style={{
                                                border: '0.5px solid #e2dff1',
                                                marginTop: '15px'
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                color: '#0070eb',
                                                padding: '10px 0'
                                            }}
                                        >
                                            (
                                            {String(restaurant.contact).slice(
                                                0,
                                                3
                                            )}
                                            ){' '}
                                            {String(restaurant.contact).slice(
                                                3,
                                                6
                                            )}{' '}
                                            -{' '}
                                            {String(restaurant.contact).slice(
                                                6
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <h3
                                            style={{
                                                textAlign: 'left',
                                                fontFamily: 'esti'
                                            }}
                                        >
                                            Hours
                                        </h3>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '10px',
                                                fontFamily: 'sans serif'
                                            }}
                                        >
                                            <div>Daily</div>
                                            <div>
                                                <div>
                                                    Delivery: 8:00am–11:59pm
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: '15px',
                                                        color: '#6b6b83',
                                                        textAlign: 'right',
                                                        marginTop: '6px'
                                                    }}
                                                >
                                                    Pickup: 8:00am–2:00am
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                border: '0.5px solid #e2dff1',
                                                marginTop: '15px'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ marginTop: '35px', textAlign: 'left' }}
                            >
                                <div style={{ marginTop: '35px' }}>
                                    <h1
                                        className={styles.esti}
                                        style={{ marginBottom: '40px' }}
                                    >
                                        Reviews for {restaurant.name}
                                    </h1>
                                    {restaurant.reviews.map((review) => (
                                        <Review details={review} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
}
