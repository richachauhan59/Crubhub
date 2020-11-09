import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { getSearchResults } from '../redux/search/actions';
import { setAddress } from '../redux/auth/actions';

const features = [
    {
        heading: 'Local favorites',
        description:
            'Satisfy any craving with delivery from popular neighborhood restaurants and chains. Reorder go-tos or find something new.',
        image: '/store.svg'
    },
    {
        heading: 'Support restaurants and drivers',
        description:
            'Donate your change to the Grubhub Community Relief Fund at checkout. Donations go to charitable organizations supporting local restaurants and drivers impacted by COVID-19.',
        image: '/coins.png'
    },
    {
        heading: 'Exclusive Perks',
        description:
            'Discover more deals and restaurant rewards near you. Cash in on Perks and get $100s in savings.',
        image: '/diamond.svg'
    }
];

const useStyles = makeStyles((theme) => ({
    topBanner: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#36286b',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Raleway',
        fontWeight: '600',
        letterSpacing: '0.4px',
        lineHeight: '1.4',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: '3',
        textAlign: 'center'
    },
    link: {
        border: 'none',
        background: 'transparent',
        color: 'white',
        letterSpacing: '0.6px',
        '&:hover': {
            color: '#0058b8',
            cursor: 'pointer'
        }
    },
    topGrid: {
        position: 'relative',
        paddingTop: '60px',
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
    },
    topGrid_left: {
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            '&:before': {
                content: '" "',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundImage: "url('/burger.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transform: 'scale(1.413)'
            },
            '& > img:nth-child(1)': {
                position: 'absolute',
                top: '65px',
                left: '95px',
                width: '214px'
            },
            '& > img:nth-child(2)': {
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                width: '340px'
            }
        },
        [theme.breakpoints.down('sm')]: {
            height: '384px',
            '&:before': {
                content: '" "',
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundImage: "url('/burger.webp')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            },
            '& > img:nth-child(1)': {
                position: 'absolute',
                top: '25px',
                left: '30px',
                width: '200px'
            },
            '& > img:nth-child(2)': {
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                width: '170px'
            }
        },
        [theme.breakpoints.down('xs')]: {
            '& > img:nth-child(1)': {
                position: 'absolute',
                top: '15px',
                left: '20px',
                width: '140px',
                height: 'auto'
            }
        }
    },
    topGrid_right: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            '& > div:nth-child(1)': { height: '40%', width: '100%' }
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse'
        }
    },
    topGrid_right_links: {
        display: 'flex',
        '& > button': {
            height: 'max-content'
        },
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'right',
            fontSize: '20.3px',
            padding: '8.5% 14%',
            '& > button': {
                marginRight: '35px',
                fontSize: '20.3px'
            }
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
            fontSize: '18px',
            padding: '10px 15px',
            '& > button': {
                marginRight: '0px',
                fontSize: '18px'
            }
        }
    },
    topGrid_right_search: {
        display: 'flex',
        textAlign: 'left',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            padding: '64px 13%'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 15px'
        }
    },
    search_heading: {
        fontFamily: 'esti',
        letterSpacing: '1px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3.4vw'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '6vw'
        }
    },
    autoComplete: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    searchBox: {
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: '4px 10px'
        },
        [theme.breakpoints.up('sm')]: {
            flex: '1'
        },
        [theme.breakpoints.up('md')]: {
            marginRight: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    searchButton: {
        marginTop: '8px',
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
            width: '176px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    featuresWrapper: {
        [theme.breakpoints.up('sm')]: {
            padding: '60px 100px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '28px',
            paddingTop: '60px'
        }
    },
    features: {
        textAlign: 'center',
        fontFamily: 'Raleway',
        lineHeight: '20.3px',
        fontSize: '14px',
        fontWeight: '500',
        '& > h4': {
            marginBottom: '8px',
            fontFamily: 'esti',
            fontSize: '20.3px'
        },
        '& > img': {
            maxWidth: '100px',
            height: '100px'
        },
        [theme.breakpoints.up('xs')]: {
            padding: '10px 45px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '20px 0px'
        }
    },
    eatingBurger: {
        fontFamily: 'Raleway',
        '& > div:nth-child(1)': {
            padding: '32px'
        },
        '& p': {
            lineHeight: '22px'
        },
        '& h3': {
            fontFamily: 'esti',
            marginBottom: '20px'
        },
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '50px 200px 70px 200px',
            '& h3': {
                fontSize: '35.4px'
            }
        },
        [theme.breakpoints.down('md')]: {
            padding: '20px',
            '& h3': {
                fontSize: '25.3px'
            },
            '& > div:nth-child(1)': {
                padding: '12px 12px 30px 12px'
            }
        }
    },
    about: {
        fontSize: '14px',
        [theme.breakpoints.up('xs')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.up('md')]: {
            paddingRight: '4px'
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: '195px'
        },
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    footerWrapper: {
        background: '#3232aa',
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
        fontFamily: 'Raleway',
        fontSize: '14px',
        display: 'block',
        marginBottom: '10px',
        textAlign: 'left',
        '&:hover': {
            color: '#8f8fa1',
            cursor: 'pointer'
        }
    }
}));

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const findFood = (e) => {
        // console.log(searchInput);
        dispatch(setAddress(searchInput));
        dispatch(getSearchResults(searchInput.geometry));
    };

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

    return (
        <div style={{ textAlign: 'left' }}>
            <Grid container className={classes.topGrid}>
                <div className={classes.topBanner}>
                    <span>
                        Your health and safety is our priority, from restaurant
                        to doorstep
                        <button
                            className={classes.link}
                            style={{
                                textDecoration: 'underline',
                                fontWeight: 'bold',
                                marginLeft: '5px',
                                fontFamily: 'esti'
                            }}
                        >
                            Learn More
                        </button>
                    </span>
                </div>
                <Grid item xs={12} md={6} className={classes.topGrid_left}>
                    <img src="/crubhub_logo.png" alt="" />
                    <img src="/treatyoself.webp" alt="" />
                </Grid>
                <Grid item xs={12} md={6} className={classes.topGrid_right}>
                    <div className={classes.topGrid_right_links}>
                        <button
                            className={classes.link}
                            style={{
                                color: '#0070eb',
                                fontWeight: '600',
                                fontFamily: 'esti'
                            }}
                        >
                            Get Perks in the app
                        </button>
                        <a
                            href="/login"
                            className={classes.link}
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontFamily: 'esti',
                                height: 'max-content'
                            }}
                        >
                            Sign in
                        </a>
                    </div>
                    <div className={classes.topGrid_right_search}>
                        <h1 className={classes.search_heading}>
                            Order food delivery you'll love
                        </h1>
                        <div className={classes.autoComplete}>
                            <div className={classes.searchBox}>
                                <Autocomplete
                                    freeSolo
                                    options={options.map(
                                        (place) => place.place_name
                                    )}
                                    onChange={(event, value) =>
                                        setSearchInput(() =>
                                            options.find(
                                                (place) =>
                                                    place.place_name === value
                                            )
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Enter street address or zip code"
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search'
                                            }}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
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
                </Grid>
            </Grid>
            <Grid container className={classes.featuresWrapper}>
                {features.map((feature, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        md={4}
                        className={classes.features}
                    >
                        <img src={feature.image} alt="" />
                        <h4>{feature.heading}</h4>
                        <p>{feature.description}</p>
                    </Grid>
                ))}
            </Grid>
            <Grid container className={classes.eatingBurger}>
                <Grid item xs={12} sm={6}>
                    <h3>Pickup or delivery from restaurants near you</h3>
                    <p>
                        Explore restaurants that deliver near you, or try yummy
                        takeout fare. With a place for every taste, it’s easy to
                        find food you crave, and order online or through the
                        Grubhub app. Find great meals fast with lots of local
                        menus. Enjoy eating the convenient way with places that
                        deliver to your door.
                    </p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img
                        src="/women-eating-burgers.webp"
                        alt=""
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.eatingBurger}
                style={{
                    backgroundColor: '#efefef',
                    padding: '25px'
                }}
            >
                <Grid item xs={12} sm={6}>
                    <h2
                        style={{
                            fontFamily: 'esti',
                            fontSize: '26.8px',
                            textAlign: 'center'
                        }}
                    >
                        About Grubhub
                    </h2>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p className={classes.about}>
                        Grubhub helps you find and order food from wherever you
                        are. How it works: you type in an address, we tell you
                        the restaurants that deliver to that locale as well as
                        showing you droves of pickup restaurants near you. Want
                        to be more specific? Search by cuisine, restaurant name
                        or menu item. We'll filter your results accordingly.
                        When you find what you're looking for, you can place
                        your order online or by phone, free of charge. Oh, and
                        we also give you access to reviews, coupons, special
                        deals and a 24/7 customer care team that tracks each
                        order and makes sure you get exactly what you want.
                    </p>
                </Grid>
            </Grid>
            <div className={classes.footerWrapper}>
                <Grid container>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>
                            Sign up for special offers
                        </h4>
                        <label
                            style={{
                                color: 'white',
                                fontFamily: 'Raleway',
                                fontWeight: '600',
                                fontSize: '15px'
                            }}
                        >
                            Email address
                            <input
                                style={{
                                    borderRadius: '4px',
                                    padding: '15px',
                                    width: '100%',
                                    margin: '10px 0 20px 0',
                                    height: '35px'
                                }}
                                placeholder="your@email.com"
                            />
                        </label>
                        <label
                            style={{
                                color: 'white',
                                fontFamily: 'Raleway',
                                fontWeight: '600',
                                fontSize: '15px'
                            }}
                        >
                            ZIP Code
                            <input
                                style={{
                                    borderRadius: '4px',
                                    padding: '15px',
                                    width: '100%',
                                    margin: '10px 0 20px 0',
                                    height: '35px'
                                }}
                                placeholder="11111"
                            />
                        </label>
                        <button
                            style={{
                                height: '50px',
                                width: '100%',
                                background: '#0070eb',
                                color: 'white',
                                fontFamily: 'esti',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Count me in!
                        </button>
                    </Grid>
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
                        ].map((linkName, index) => (
                            <button key={index} className={classes.footerLink}>
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
                        ].map((linkName, index) => (
                            <button key={index} className={classes.footerLink}>
                                {linkName}
                            </button>
                        ))}
                        <h4 className={classes.footerTitle}>Connect with us</h4>
                        {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(
                            (linkName, index) => (
                                <button
                                    key={index}
                                    className={classes.footerLink}
                                >
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
                        ].map((linkName, index) => (
                            <button
                                key={index}
                                className={classes.footerLink}
                                style={{
                                    padding: '10px 15px',
                                    border: '1px solid white',
                                    borderRadius: '4px',
                                    fontFamily: 'esti',
                                    fontSize: '16px',
                                    position: 'relative',
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
                    style={{ border: '1px solid #8f8fa1', margin: '20px 0' }}
                />
                <h4
                    className={classes.footerTitle}
                    style={{
                        paddingLeft: '10px',
                        paddingTop: '10px',
                        marginBottom: '10px'
                    }}
                >
                    Browse delivery restaurants
                </h4>
                <Grid container>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>
                            Browse by cuisines
                        </h4>
                        {[
                            'Alcohol delivery',
                            'American Food delivery',
                            'Asian Food delivery',
                            'Breakfast delivery',
                            'Chicken delivery',
                            'Chinese Food delivery',
                            'Dessert delivery',
                            'Dinner delivery',
                            'Gluten-free delivery',
                            'Healthy Food delivery',
                            'Ice Cream delivery',
                            'Indian Food delivery',
                            'Italian Food delivery',
                            'Japanese delivery',
                            'Late Night delivery',
                            'Lunch delivery',
                            'Mexican Food delivery',
                            'Organic Food delivery',
                            'Pasta delivery',
                            'Pizza delivery',
                            'Sandwiches delivery',
                            'Seafood delivery',
                            'Soup delivery',
                            'Steak delivery',
                            'Sushi delivery',
                            'Thai Food delivery',
                            'Vegetarian Food delivery',
                            'Wings delivery',
                            'See more'
                        ].map((linkName, index) => (
                            <button
                                key={index}
                                className={classes.footerLink}
                                style={{
                                    fontFamily:
                                        index === 28 ? 'esti' : 'Raleway',
                                    fontSize: index === 28 ? '16px' : '14px'
                                }}
                            >
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>
                            Browse by cities
                        </h4>
                        {[
                            'Ann Arbor restaurants',
                            'Austin restaurants',
                            'Bloomington restaurants',
                            'Boulder restaurants',
                            'Champaign restaurants',
                            'Columbus restaurants',
                            'Denver restaurants',
                            'Fort Worth restaurants',
                            'Houston restaurants',
                            'Las Vegas restaurants',
                            'Madison restaurants',
                            'Miami restaurants',
                            'Nashville restaurants',
                            'New York City restaurants',
                            'Orange County restaurants',
                            'Phoenix restaurants',
                            'Portland restaurants',
                            'Rochester restaurants',
                            'San Francisco restaurants',
                            'Scottsdale restaurants',
                            'Syracuse restaurants',
                            'Tempe restaurants',
                            'Washington, DC restaurants'
                        ].map((linkName, index) => (
                            <button key={index} className={classes.footerLink}>
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <div
                            className={classes.footerTitle}
                            style={{ marginTop: '47px' }}
                        ></div>
                        {[
                            'Atlanta restaurants',
                            'Baltimore restaurants',
                            'Boston restaurants',
                            'Brooklyn restaurants',
                            'Chicago restaurants',
                            'Dallas restaurants',
                            'Detroit restaurants',
                            'Hartford restaurants',
                            'Ithaca restaurants',
                            'Los Angeles restaurants',
                            'Manhattan restaurants',
                            'Milwaukee restaurants',
                            'New Haven restaurants',
                            'Oakland restaurants',
                            'Philadelphia restaurants',
                            'Pittsburgh restaurants',
                            'Queens restaurants',
                            'San Diego restaurants',
                            'San Jose restaurants',
                            'Seattle restaurants',
                            'Tampa restaurants',
                            'Urbana restaurants',
                            'Show More'
                        ].map((linkName, index) => (
                            <button
                                key={index}
                                className={classes.footerLink}
                                style={{
                                    fontFamily:
                                        index === 22 ? 'esti' : 'Raleway',
                                    fontSize: index === 22 ? '16px' : '14px'
                                }}
                            >
                                {linkName}
                            </button>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ padding: '10px' }}>
                        <h4 className={classes.footerTitle}>
                            Browse by restaurants
                        </h4>
                        {[
                            'RestaurantChains Delivery',
                            'Burger King Delivery',
                            'Pizza Hut Delivery',
                            "Denny's",
                            "Church's Chicken Menu",
                            "Papa John's Pizza",
                            'Restaurants Near Me',
                            'Restaurants by Dish'
                        ].map((linkName, index) => (
                            <button
                                key={index}
                                className={classes.footerLink}
                                style={{ textDecoration: 'underline' }}
                            >
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

export default Home;
