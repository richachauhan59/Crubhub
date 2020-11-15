import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../redux/auth/actions';
import { getSearchResults } from '../redux/search/actions';
import { useHistory } from 'react-router';
import Navbar from './navbar/Navbar';

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
    giftButton: {
        marginTop: '8px',
        marginBottom: '15px',
        backgroundColor: '#0070eb',
        fontFamily: 'esti',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        fontSize: '15.4px',
        height: '50px',
        boxSizing: 'content-box',
        width: '210px',
        padding: '0px 16px',
        display: 'block',
        '&:hover': {
            backgroundColor: '#0058b8',
            cursor: 'pointer'
        }
    },
    giftCardsWrapper: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '80px'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            marginTop: '-20px'
        }
    },
    giftCard: {
        padding: '10px',
        display: 'flex',
        minHeight: '220px',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'esti',
        backgroundImage: 'url("/homepage_cards.webp")',
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('sm')]: {
            width: '85%'
        }
    },
    collectionsWrapper: {
        fontFamily: 'Raleway',
        [theme.breakpoints.up('sm')]: {
            padding: '0px 13%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 18px'
        }
    },
    collectionImage: {
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '28px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0px',
            height: '300px',
            width: '100%'
        },
        '& img': {
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'left',
            borderRadius: '5px',
            [theme.breakpoints.up('sm')]: {
                height: '300px'
            },
            [theme.breakpoints.down('sm')]: {
                height: '280px'
            }
        }
    },
    paddingRight: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: '8px'
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: '0px'
        }
    },
    paddingLeft: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '8px'
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '0px'
        }
    },
    collectionImageText: {
        background: 'hsla(0,0%,100%,.7)',
        padding: '8px 12px',
        borderRadius: '4px',
        position: 'absolute',
        left: '20px',
        '& > h3': {
            fontFamily: 'esti',
            fontSize: '23.3px'
        },
        [theme.breakpoints.up('sm')]: {
            bottom: '17px'
        },
        [theme.breakpoints.down('sm')]: {
            bottom: '34px'
        }
    },
    bannerWrapper: {
        minHeight: '312.4px'
    },
    banner: {
        backgroundImage: 'url(homepage_banner.webp)',
        backgroundColor: '#777',
        padding: '52px 20px',
        marginTop: '60px',
        width: '100%',
        height: '312.4px',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'Raleway',
        fontSize: '14px',
        color: 'white',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            height: '532.4px'
        },
        [theme.breakpoints.down('xs')]: {
            backgroundImage:
                'url(https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto,fl_lossy,q_80/v1538664675/Hero_pizza1_3x_qndtdr.jpg)',
            height: '539.25px'
        }
    },
    bannerText: {
        [theme.breakpoints.up('lg')]: {
            width: '760px'
        },
        [theme.breakpoints.down('md')]: {
            width: '600px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '600px'
        },
        [theme.breakpoints.down('xs')]: {
            width: '320px'
        }
    },
    bannerTitle: {
        [theme.breakpoints.up('xs')]: {
            fontSize: '34px',
            marginBottom: '0.67em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '2em',
            fontSize: '16px'
        }
    },
    bannerOptional: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    selected: {
        borderBottom: '4px solid #0070eb',
        color: '#0070eb'
    },
    picker: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '-12px'
        }
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        '& div:nth-child(1)': {
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px'
        },
        '& div:nth-child(3)': {
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px'
        },
        [theme.breakpoints.up('md')]: {
            '& div:nth-child(1)': {
                flex: '1'
            },
            '& div:nth-child(2)': {
                flex: '3'
            },
            '& div:nth-child(3)': {
                flex: '2',
                marginRight: '10px'
            }
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            '& div': {
                marginBottom: '10px'
            },
            '& div:nth-child(1)': {
                borderRadius: '4px'
            },
            '& div:nth-child(2)': {
                borderRadius: '4px'
            },
            '& div:nth-child(3)': {
                borderRadius: '4px'
            }
        }
    },
    searchButton: {
        backgroundColor: '#0070eb',
        fontFamily: 'esti',
        color: 'white',
        borderRadius: '3px',
        border: 'none',
        fontSize: 'large',
        height: '46px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#0058b8',
            cursor: 'pointer'
        },
        [theme.breakpoints.up('sm')]: {
            width: '126px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    searchInput: {
        padding: '15px 48px',
        position: 'relative',
        backgroundColor: 'white',
        height: '48px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }
}));

function Dashboard(props) {
    document.title =
        'Food Delivery | Restaurant Takeout | Order Food Online | Crubhub';

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    let { place, geometry } = useSelector((state) => state.auth.address);
    place = place || [];

    const [delOrPick, setDelOrPick] = useState('delivery');
    const [options, setOptions] = useState([]);
    const [searchInput, setSearchInput] = useState(
        place.length > 0 ? { place_name: place.join(', '), geometry } : ''
    );
    const [valueText, setValueText] = useState(
        place.length > 0 ? place.join(', ') : ''
    );
    const [cuisineInput, setCuisineInput] = useState('');

    const handleInputChange = (value) => {
        setSearchInput(value);
        axios({
            method: 'get',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
            params: {
                access_token:
                    'pk.eyJ1IjoicmljaGFjaGF1aGFuIiwiYSI6ImNraDF0NmMxdTAzeDMyem9pZWtpMmZiY2UifQ.sGlBM0QPBIFTFgLP_Bl_gg'
            }
        })
            .then((res) => {
                setOptions(res.data.features);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const findFood = (e) => {
        // console.log(searchInput);
        dispatch(setAddress(searchInput));
        const data = { geometry: searchInput.geometry };
        if (cuisineInput) {
            data['cuisine'] =
                cuisineInput[0].toUpperCase() + cuisineInput.slice(1);
        }
        dispatch(getSearchResults(data));
        setTimeout(() => {
            history.push('/search');
        }, 600);
    };
    return (
        <div>
            <Navbar {...props} />

            <div className={classes.banner}>
                <div className={classes.bannerText}>
                    <h2
                        style={{
                            letterSpacing: '0.8px',
                            fontFamily: 'esti'
                        }}
                        className={classes.bannerTitle}
                    >
                        {delOrPick === 'delivery'
                            ? 'Who delivers in your neighborhood?'
                            : 'Who offers pickup near you?'}
                    </h2>
                    <Grid container style={{ marginBottom: '30px' }}>
                        <Grid item xs={12} sm={6}>
                            <Grid container className={classes.picker}>
                                <Grid
                                    item
                                    xs={6}
                                    sm={3}
                                    style={{
                                        lineHeight: '20.3px',
                                        fontFamily: 'esti',
                                        fontSize: '15.4px',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                    className={
                                        delOrPick === 'delivery'
                                            ? classes.selected
                                            : ''
                                    }
                                    onClick={() => setDelOrPick('delivery')}
                                >
                                    <b style={{ paddingBottom: '5px' }}>
                                        Delivery
                                    </b>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    sm={3}
                                    style={{
                                        lineHeight: '20.3px',
                                        fontFamily: 'esti',
                                        fontSize: '15.4px',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                    className={
                                        delOrPick === 'pickup'
                                            ? classes.selected
                                            : ''
                                    }
                                    onClick={() => setDelOrPick('pickup')}
                                >
                                    <b style={{ paddingBottom: '5px' }}>
                                        Pickup
                                    </b>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} className={classes.bannerOptional}>
                            <span style={{ fontFamily: 'esti' }}>
                                What do you feel like?{'  '}
                            </span>
                            <span>optional</span>
                        </Grid>
                    </Grid>
                    <div className={classes.searchWrapper}>
                        <div
                            className={classes.searchInput}
                            style={{
                                borderRight:
                                    '1px solid rgba(143, 143, 161, 0.2)',
                                textAlign: 'center',
                                fontWeight: '500',
                                fontSize: '16.3px'
                            }}
                        >
                            <AccessTimeIcon
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translate(0%, -50%)',
                                    color: 'black'
                                }}
                            />
                            ASAP
                        </div>
                        <div
                            className={classes.searchInput}
                            style={{
                                borderRight:
                                    '1px solid rgba(143, 143, 161, 0.2)',
                                textAlign: 'center'
                            }}
                        >
                            <RoomIcon
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translate(0%, -50%)',
                                    color: '#0070eb'
                                }}
                            />
                            <Autocomplete
                                freeSolo
                                options={options.map(
                                    (place) => place.place_name
                                )}
                                onChange={(event, value) => {
                                    setSearchInput(() =>
                                        options.find(
                                            (place) =>
                                                place.place_name === value
                                        )
                                    );
                                    setValueText(value);
                                }}
                                renderInput={(params) => (
                                    <div ref={params.InputProps.ref}>
                                        <input
                                            style={{
                                                border: 'none',
                                                height: '100%',
                                                width: '100%'
                                            }}
                                            {...params.inputProps}
                                            value={valueText}
                                            placeholder="Enter street address ..."
                                            onChange={(e) => {
                                                setValueText(e.target.value);
                                                handleInputChange(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                        <div
                            className={classes.searchInput}
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <SearchIcon
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translate(0%, -50%)'
                                }}
                            />
                            <input
                                style={{
                                    border: 'none',
                                    height: '100%',
                                    width: '100%'
                                }}
                                value={cuisineInput}
                                onChange={(e) =>
                                    setCuisineInput(e.target.value)
                                }
                                placeholder="Pizza, sushi, c ..."
                            />
                        </div>
                        <button
                            onClick={findFood}
                            className={classes.searchButton}
                        >
                            Find food
                        </button>
                    </div>
                </div>
            </div>
            <Grid container className={classes.collectionsWrapper}>
                <Grid
                    item
                    xs={12}
                    style={{
                        height: '52.3px',
                        padding: '10px 15px',
                        backgroundColor: '#212121',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '15px',
                        borderRadius: '4px',
                        marginBottom: '25px',
                        marginTop: '15px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: '1'
                        }}
                    >
                        <img
                            style={{ marginRight: '10px' }}
                            src="/gh_badge.svg"
                            alt=""
                        />
                        <div>Get unlimited free delivery with Crubhub+!</div>
                    </div>
                    <InfoIcon style={{ fontSize: '16px', color: '#c8c8c8' }} />
                </Grid>
                <Grid item xs={12}>
                    <h3
                        style={{
                            fontFamily: 'esti',
                            fontSize: '23.3px',
                            lineHeight: '32px',
                            textAlign: 'left',
                            marginBottom: '16px'
                        }}
                    >
                        Explore our collections
                    </h3>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={`${classes.collectionImage} ${classes.paddingRight}`}
                >
                    <img src="/top_rated.webp" alt="" />
                    <div className={classes.collectionImageText}>
                        <h3>Top rated</h3>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={`${classes.collectionImage} ${classes.paddingLeft}`}
                >
                    <img src="/delicious_deals.webp" alt="" />
                    <div className={classes.collectionImageText}>
                        <h3>Delicious deals</h3>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={`${classes.collectionImage} ${classes.paddingRight}`}
                >
                    <img src="/new_on_gh.webp" alt="" />
                    <div className={classes.collectionImageText}>
                        <h3>New on Grubhub</h3>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={`${classes.collectionImage} ${classes.paddingLeft}`}
                >
                    <img src="/under_45_minutes.webp" alt="" />
                    <div className={classes.collectionImageText}>
                        <h3>45 minutes or less</h3>
                    </div>
                </Grid>
            </Grid>
            <Grid
                container
                style={{
                    minHeight: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                className={classes.giftCardsWrapper}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        fontFamily: 'esti'
                    }}
                >
                    <h3
                        style={{
                            fontSize: '26.8px',
                            lineHeight: '35px',
                            marginBottom: '4px'
                        }}
                    >
                        Give the gift of food delivery
                    </h3>
                    <h4
                        style={{
                            fontSize: '17.7px',
                            lineHeight: '27px',
                            marginBottom: '4px'
                        }}
                    >
                        Perfect for birthdays, holidays, Thank You’s and more.
                    </h4>
                    <button className={classes.giftButton}>
                        Order Grubhub gift cards
                    </button>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.giftCard}></Grid>
            </Grid>
            <div className={classes.footerWrapper}>
                <Grid container>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>
                            Sign up for special offers
                        </h4>
                        {[
                            'About Grubhub',
                            'Our apps',
                            'Our blog',
                            'Our tech blog, Grubhub Bytes',
                            'Careers',
                            'Investor relations',
                            'News'
                        ].map((linkName) => (
                            <button className={classes.footerLink}>
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>Useful links</h4>
                        {[
                            'Gift cards',
                            'Grubhub+',
                            'Grubhub Perks',
                            'FAQ',
                            'Help',
                            'Catering',
                            'Student discounts',
                            'Keyboard Shortcuts',
                            'Answers'
                        ].map((linkName) => (
                            <button className={classes.footerLink}>
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>Connect with us</h4>
                        {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(
                            (linkName) => (
                                <button className={classes.footerLink}>
                                    {linkName}
                                </button>
                            )
                        )}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>Partner with us</h4>
                        {[
                            'For restaurants',
                            'For drivers',
                            'For corporate accounts',
                            'Become Affiliate'
                        ].map((linkName) => (
                            <button
                                className={classes.footerLink}
                                style={{
                                    padding: '10px 15px',
                                    border: '1px solid white',
                                    borderRadius: '4px',
                                    fontFamily: 'esti',
                                    fontSize: '16px',
                                    position: 'relative',
                                    textDecoration: 'none',
                                    paddingRight: '40px'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '10%',
                                        fontWeight: 'bold',
                                        fontSize: '25px'
                                    }}
                                >
                                    &rsaquo;
                                </div>
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                </Grid>
                <div
                    style={{
                        border: '1px solid #8f8fa1',
                        margin: '20px 0'
                    }}
                />
                <div
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Raleway',
                        color: 'white'
                    }}
                >
                    © 2020 Grubhub All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
