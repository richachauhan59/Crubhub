import React, { useState } from 'react'
import crubhub from "./CRUBHUB.png"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

export default function Navbar(props) {
    const [options, setoptions] = useState([])

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
        <div>{props.match.url === "/login" || props.match.url === "/signup" || props.match.url === "/checkout" ?
            < div style={{ height: "60px", boxShadow: "0 0 0 1px rgba(67,41,163,.1),0 1px 8px 0 rgba(67,41,163,.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <img style={{ height: "23px", marginLeft: "30px" }} src={crubhub} alt="logo"></img >
                <ShoppingBasketIcon style={{ color: "#2F4F4F", marginRight: "30px" }}></ShoppingBasketIcon>
            </ div> :
            <div style={{ height: "60px", boxShadow: "0 0 0 1px rgba(67,41,163,.1),0 1px 8px 0 rgba(67,41,163,.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ height: "23px", marginLeft: "30px" }} src={crubhub} alt="logo"></img >
                    <div style={{ display: "flex", marginLeft: "30px" }}>
                        <LocationOnIcon style={{ height: "16px" }}></LocationOnIcon>
                        <div onClick={handleInputChange} style={{ color: "#0070eb", marginLeft: "5px" }}><button>San Francisco</button></div>
                    </div>
                    <div style={{ width: "320px", height: "35px", border: "1px solid #8f8fa1", marginLeft: "30px", borderRadius: '5px', display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <SearchIcon style={{ height: "18px", marginLeft: "10px", color: "#4b4b4b" }}></SearchIcon>

                        <input style={{ border: "none", marginLeft: "5px", height: "100%", outline: "none" }} placeholder="Pizza, sushi, chinese"></input>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: 'center' }}>
                    <button style={{ fontFamily: "esti", border: "1px solid #e2def2", color: "#0070eb", padding: "8px 16px", backgroundColor: "white", fontSize: "15px", borderRadius: "4px" }}>Sign in</button>
                    <ShoppingBasketIcon style={{ color: "#2F4F4F", marginRight: "30px", marginLeft: "20px", borderRadius: "5px" }}></ShoppingBasketIcon>
                </div>
            </div>
        }
        </div >
    )
}
