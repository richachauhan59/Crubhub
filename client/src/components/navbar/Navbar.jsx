import React, { useState } from 'react';
import crubhub from './CRUBHUB.png';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { getSearchResults } from '../../redux/search/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Navbar(props) {
    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [box, setbox] = useState(false);
    const [cuisine, setCuisine] = useState('');

    const { geometry } = useSelector((state) => state.auth.address);
    const { firstName, authToken } = useSelector((state) => state.auth);

    const openBox = () => {
        setbox(true);
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

    const handleCuisineSearch = (e) => {
        e.preventDefault();
        dispatch(
            getSearchResults({
                geometry,
                cuisine: cuisine[0]?.toUpperCase() + cuisine?.slice(1)
            })
        );
    };

    return (
        <div>
            {props.match.url === '/login' ||
            props.match.url === '/signup' ||
            props.match.url === '/checkout' ? (
                <div
                    style={{
                        height: '60px',
                        background: '#ffffff',
                        boxShadow:
                            '0 0 0 1px rgba(67,41,163,.1),0 1px 8px 0 rgba(67,41,163,.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Link to="/">
                        <img
                            style={{ height: '23px', marginLeft: '30px' }}
                            src={crubhub}
                            alt="logo"
                        ></img>
                    </Link>
                    <ShoppingBasketIcon
                        style={{ color: '#2F4F4F', marginRight: '30px' }}
                    ></ShoppingBasketIcon>
                </div>
            ) : (
                <div
                    style={{
                        height: '60px',
                        boxShadow:
                            '0 0 0 1px rgba(67,41,163,.1),0 1px 8px 0 rgba(67,41,163,.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img
                                style={{ height: '23px', marginLeft: '30px' }}
                                src={crubhub}
                                alt="logo"
                            ></img>
                        </Link>
                        <div style={{ display: 'flex', marginLeft: '30px' }}>
                            <LocationOnIcon
                                style={{ height: '16px' }}
                            ></LocationOnIcon>
                            <div
                                style={{ color: '#0070eb', marginLeft: '5px' }}
                            >
                                <button
                                    onClick={openBox}
                                    style={{
                                        position: 'relative',
                                        outline: 'none',
                                        background: 'Transparent',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    San Francisco
                                </button>
                            </div>
                        </div>
                        <div
                            style={{
                                width: '320px',
                                height: '35px',
                                border: '1px solid #8f8fa1',
                                marginLeft: '30px',
                                borderRadius: '5px',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                        >
                            <SearchIcon
                                style={{
                                    height: '18px',
                                    marginLeft: '10px',
                                    color: '#4b4b4b'
                                }}
                            ></SearchIcon>
                            <form onSubmit={handleCuisineSearch}>
                                <input
                                    value={cuisine}
                                    onChange={(e) => setCuisine(e.target.value)}
                                    style={{
                                        border: 'none',
                                        marginLeft: '5px',
                                        height: '100%',
                                        outline: 'none'
                                    }}
                                    placeholder="Pizza, sushi, chinese ..."
                                />
                            </form>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {authToken ? (
                            <span
                                style={{
                                    fontFamily: 'Raleway',
                                    fontSize: '14px',
                                    color: 'rgb(107, 107, 131)'
                                }}
                            >
                                Hi, {firstName}!
                            </span>
                        ) : (
                            <Link
                                to="/login"
                                style={{
                                    fontFamily: 'esti',
                                    textDecoration: 'none',
                                    border: '1px solid #e2def2',
                                    color: '#0070eb',
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    fontSize: '15px',
                                    borderRadius: '4px'
                                }}
                            >
                                Sign in
                            </Link>
                        )}
                        <ShoppingBasketIcon
                            style={{
                                color: '#2F4F4F',
                                marginRight: '30px',
                                marginLeft: '20px',
                                borderRadius: '5px'
                            }}
                        ></ShoppingBasketIcon>
                    </div>
                </div>
            )}
            <div
                style={{
                    width: '350px',
                    borderRadius: '5px',
                    position: 'absolute',
                    top: '60px',
                    zIndex: '2',
                    background: 'white',
                    left: '100px'
                }}
            >
                {box ? (
                    <Autocomplete
                        freeSolo
                        options={options.map((place) => place.place_name)}
                        onChange={(event, value) =>
                            setSearchInput(() =>
                                options.find(
                                    (place) => place.place_name === value
                                )
                            )
                        }
                        renderInput={(params) => (
                            <TextField
                                style={{ outline: 'none' }}
                                {...params}
                                placeholder="Enter street address or zip code"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search'
                                }}
                                onChange={(e) =>
                                    handleInputChange(e.target.value)
                                }
                            />
                        )}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
