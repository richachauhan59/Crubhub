import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantItem from './RestaurantItem';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Navbar from "../navbar/Navbar"

const useStyles = makeStyles((theme) => ({
    features: {
        '& .MuiCheckbox-root': {
            padding: '4px'
        }
    },
    slider: {
        '& .MuiSlider-thumb': {
            height: '25px',
            width: '25px',
            top: '7px'
        }
    }
}));

const marks = [
    {
        value: 45,
        label: '45 min'
    },
    {
        value: 60,
        label: '60 min'
    },
    {
        value: 75,
        label: 'Any'
    }
];

export default function SearchPage(props) {
    document.title = 'Search Results';

    const classes = useStyles();
    const dispatch = useDispatch();

    const [delOrPick, setDelOrPick] = useState(true);
    const [sliderVal, setSliderVal] = useState(45);
    const [ratingVal, setRatingVal] = useState(3);

    // filters
    const [crubhub, setcrubhub] = useState(false)
    const [newest, setnewest] = useState(false)
    const [free, setfree] = useState(false)

    //sorting
    const [select, setselect] = useState("rating")

    const searchState = useSelector((state) => state.search);

    console.log(searchState)
    console.log(ratingVal)

    // useEffect(() => {
    //     console.log(ratingVal);
    // }, [ratingVal]);

    const handleSliderChange = (event, value) => {
        setSliderVal(value);
    };

    const handleScroll = (e, direction) => {
        if (direction === 'left') {
            console.log(direction);
            document.getElementById('scrollable-div').scrollLeft -= 50;
        } else if (direction === 'right') {
            console.log(direction);
            document.getElementById('scrollable-div').scrollLeft += 50;
        }
    };


    return (
        <div>
            <Navbar {...props}></Navbar>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        width: '30%',
                        padding: '20px',
                        borderRight: "1px solid #e2dff1"
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ fontFamily: 'esti' }}>Filters</h2>
                    </div>

                    <div
                        style={{
                            marginTop: '23px',
                            textAlign: 'center',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        <div
                            style={{
                                border: '1px solid #e8e6f3',
                                display: 'flex',
                                borderRadius: '6px',
                                justifyContent: 'space-around'
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: 'esti',
                                    borderRadius: '6px 0 0 6px',
                                    width: '50%',
                                    backgroundColor: delOrPick
                                        ? '#0070eb'
                                        : 'white',
                                    color: delOrPick ? 'white' : '#0070eb',
                                    padding: '7px 0'
                                }}
                                onClick={() => setDelOrPick(true)}
                            >
                                Delivery
                            </div>
                            <div
                                style={{
                                    fontFamily: 'esti',
                                    width: '50%',
                                    backgroundColor: delOrPick
                                        ? 'white'
                                        : '#0070eb',
                                    color: delOrPick ? '#0070eb' : 'white',
                                    padding: '7px 0',
                                    borderRadius: '0px 6px 6px 0px'
                                }}
                                onClick={() => setDelOrPick(false)}
                            >
                                Pickup
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}
                    >
                        <div
                            style={{ fontFamily: 'raleway', fontSize: '14px' }}
                        >
                            Deliver my food
                        </div>
                        <span style={{ margin: '0 5px' }}>&middot;</span>
                        <h5
                            style={{
                                color: '#0070eb',
                                fontFamily: 'raleway'
                            }}
                        >
                            Today, ASAP
                        </h5>
                    </div>

                    <div
                        style={{
                            margin: '20px 0 10px 0',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <h3 style={{ fontFamily: 'esti' }}>Feature</h3>
                    </div>

                    {/* <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                        className={classes.features}
                    >
                        <Checkbox
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div
                            style={{
                                fontFamily: 'raleway',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                style={{ marginRight: '5px' }}
                                src="/gh_badge.svg"
                                alt=""
                            />
                            Crubhub+
                        </div>
                    </div>
 */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                        className={classes.features}
                    >
                        <Checkbox
                            checked={newest}
                            color="primary"
                            onChange={(e) => setnewest(e.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ fontFamily: 'raleway' }}>
                            New
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                        className={classes.features}
                    >
                        <Checkbox
                            checked={free}
                            color="primary"
                            onChange={(e) => setfree(e.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ fontFamily: 'raleway' }}>
                            Free Delivery
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <h3 style={{ fontFamily: 'esti' }}>Rating</h3>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <Rating
                            size="large"
                            value={ratingVal}
                            onChange={(event, newValue) => {
                                setRatingVal(newValue);
                            }}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}
                    >
                        <h3 style={{ fontFamily: 'esti' }}>Delivery time</h3>
                    </div>
                    <div
                        style={{
                            color: '#6b6b83',
                            fontFamily: 'Raleway',
                            fontSize: '14px'
                        }}
                    >
                        {sliderVal === 75
                            ? 'Any time'
                            : sliderVal + ' min or less'}
                    </div>
                    <div
                        style={{ margin: '10px 10px' }}
                        className={classes.slider}
                    >
                        <Slider
                            defaultValue={45}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="off"
                            step={null}
                            marks={marks}
                            min={45}
                            max={75}
                            onChangeCommitted={handleSliderChange}
                        />
                    </div>
                </div>

                {/* right side of the page */}

                <div style={{ width: '80%' }}>
                    <div style={{ margin: '20px' }}>
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
                                <div>
                                    Get unlimited free delivery with Crubhub+!
                                </div>
                            </div>
                            <InfoIcon
                                style={{ fontSize: '16px', color: '#c8c8c8' }}
                            />
                        </Grid>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '20px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}
                            >
                                <h3 style={{ fontFamily: 'esti' }}>
                                    Most popular near you
                                </h3>
                            </div>
                        </div>
                        <div
                            style={{
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'flex-start'
                            }}
                            id="scrollable-div"
                        >
                            <div
                                style={{
                                    position: 'sticky',
                                    height: 'auto',
                                    width: '36px',
                                    transform: 'scale(1.5)',
                                    borderRadius: '50%',
                                    border: '1px solid #ddd',
                                    top: '30%',
                                    left: '10px',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => handleScroll(e, 'left')}
                            >
                                <ChevronLeftIcon
                                    style={{
                                        transform: 'scale(1.3)',
                                        color: '#0070eb'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    position: 'sticky',
                                    height: 'auto',
                                    width: '36px',
                                    borderRadius: '50%',
                                    border: '1px solid #ddd',
                                    top: '30%',
                                    transform: 'scale(1.5)',
                                    left: '1150px',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => handleScroll(e, 'right')}
                            >
                                <ChevronRightIcon
                                    style={{
                                        transform: 'scale(1.3)',
                                        color: '#0070eb'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: '20px',
                                    textAlign: 'center'
                                }}
                            >
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/sandwiches-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Sandwiches
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/salads-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Salads
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/american-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        American
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/hamburgers-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Hamburgers
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/asian-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Asian
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/pizza-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Pizza
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/dessert-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Dessert
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/vegetarian-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Vegetarian
                                    </div>
                                </div>
                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/pasta-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Pasta
                                    </div>
                                </div>

                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/healthy-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Healthy
                                    </div>
                                </div>

                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/chicken-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Chicken
                                    </div>
                                </div>

                                <div>
                                    <img
                                        style={{ borderRadius: '50%' }}
                                        src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_110,h_110,f_auto,q_auto,g_auto/search/browse-images/mexican-v4.jpg"
                                        alt="cimage"
                                    ></img>
                                    <div
                                        style={{
                                            fontFamily: 'raleway',
                                            padding: '5px 0',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Mexican
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            height: '1px',
                            width: '100%',
                            border: '0.5px solid #d9d4ed'
                        }}
                    ></div>

                    <div
                        style={{
                            height: '50px',
                            borderBottom: '1px solid #d9d4ed',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                    >
                        <select
                            placeholder="default"
                            style={{ marginRight: '35px' }}
                            onChange={(e) => setselect(e.target.value)}
                        >
                            <option value="rating">Rating</option>
                            <option value="deliveryFee">Delivery Fee</option>
                            <option value="delivery">Delivery Time</option>
                        </select>
                    </div>
                    {searchState.searchResults.filter((item) => newest ? item.is_new === newest : item).filter((item) => free ? item.deliveryFee === 0 : item).filter((item) => item.rating.value >= ratingVal).sort((a, b) => {
                        if (select === "rating") {
                            return b.rating.value - a.rating.value
                        }
                        else if (select === "deliveryFee") {
                            return a.deliveryFee - b.deliveryFee
                        }
                        else {
                            return a.avgDeliveryTime - b.avgDeliveryTime
                        }
                    }).map((restaurant) => (
                        <RestaurantItem details={restaurant} />
                    ))}
                </div>
            </div>
        </div >
    );
}
