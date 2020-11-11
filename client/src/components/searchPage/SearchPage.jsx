import React from 'react'
import { Checkbox } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Slider from '@material-ui/core/Slider';
import RestaurantItem from "./RestaurantItem"
import Navbar from '../navbar/Navbar';

export default function SearchPage(props) {
    return (
        <div>
            <Navbar {...props}></Navbar>
            <div style={{ display: "flex" }}>
                <div style={{ width: "32%", padding: "20px", boxShadow: "0px 1px 8px 0px rgba(67,41,163,.1)" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h2 style={{ fontFamily: "esti" }}>Filters</h2>
                        <div style={{ marginLeft: "20px", color: "#0070eb", fontFamily: "raleway" }}>Clear all</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }} >
                        <h3 style={{ fontFamily: "esti" }}>Restaurants</h3>
                        <h3 style={{ marginLeft: "20px", fontFamily: "esti" }}>Catering</h3>
                    </div>

                    <div style={{ marginTop: "23px" }}>
                        <div style={{ borderRadius: "6px", border: "1px solid #e8e6f3", display: "flex", justifyContent: 'space-around' }}>
                            <div style={{ fontFamily: "esti", width: "50%", backgroundColor: "#0070eb", color: "white", padding: "7px 0" }}>Delivery</div>
                            <div style={{ fontFamily: "esti", width: "50%", color: "#0070eb", padding: "7px 0" }}>Pickup</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
                        <div style={{ fontFamily: "raleway", fontSize: "14px" }}>Deliver my food</div>
                        <div>.</div>
                        <h5 style={{ color: "#0070eb", marginLeft: "10px", fontFamily: "raleway" }}>Today, ASAP</h5>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start" }}>
                        <h3 style={{ fontFamily: "esti" }}>Feature</h3>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <Checkbox
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ fontFamily: "raleway" }}>Grubhub(1046)</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <Checkbox
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ fontFamily: "raleway" }}>New (884)</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <Checkbox
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div style={{ fontFamily: "raleway" }}>Free Delivery (42)</div>
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start" }}>
                        <h3 style={{ fontFamily: "esti" }}>Rating</h3>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <Rating
                            name="simple-controlled"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start" }}>
                        <h3 style={{ fontFamily: "esti" }}>Delivery Time (Min)</h3>
                    </div>

                    <div style={{ margin: "10px 10px" }}>
                        <Slider
                            defaultValue={45}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={15}
                            marks
                            min={45}
                            max={75}
                        />
                    </div>
                </div>

                {/* right side of the page */}

                <div style={{ width: "100%" }}>
                    <div style={{ margin: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                <h3 style={{ fontFamily: "esti", }}>Most popular near you</h3>
                                <h5 style={{ color: "#6b6b83", fontFamily: "raleway", marginLeft: "20px" }}>1495 restaurants</h5>
                            </div>
                            <div style={{ color: "#0070eb", fontFamily: "raleway" }}>All Cuisines</div>
                        </div>
                        <div style={{ display: "flex", marginTop: "20px", justifyContent: "flex-start", gap: "20px" }}>
                            <div>
                                <img style={{ borderRadius: "50%" }} src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_100,h_100,f_auto,q_auto,g_auto/search/browse-images/soup-v4.jpg" alt="cimage"></img>
                                <div style={{ fontFamily: "raleway" }}>soup</div>
                            </div>

                            <div>
                                <img style={{ borderRadius: "50%" }} src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_100,h_100,f_auto,q_auto,g_auto/search/browse-images/healthy-v4.jpg" alt="cimage"></img>
                                <div style={{ fontFamily: "raleway" }}>Healthy</div>
                            </div>

                            <div>
                                <img style={{ borderRadius: "50%" }} src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_100,h_100,f_auto,q_auto,g_auto/search/browse-images/chicken-v4.jpg" alt="cimage"></img>
                                <div style={{ fontFamily: "raleway" }}>Chicken</div>
                            </div>

                            <div>
                                <img style={{ borderRadius: "50%" }} src="https://media-cdn.grubhub.com/d_search:browse-images:default.jpg/d_search:browse-images:default.jpg/dpr_auto,c_fill,w_100,h_100,f_auto,q_auto,g_auto/search/browse-images/american-v4.jpg" alt="cimage"></img>
                                <div style={{ fontFamily: "raleway" }}>American</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: "1px", width: "100%", border: "0.5px solid #d9d4ed" }}></div>

                    <div style={{ height: "50px", borderBottom: "1px solid #d9d4ed", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <select placeholder="default" style={{ marginRight: "35px" }}>
                            <option>Rating</option>
                            <option>Distance</option>
                            <option>Delivery Fee</option>
                        </select>
                    </div>

                    <RestaurantItem></RestaurantItem>
                    <RestaurantItem></RestaurantItem>
                    <RestaurantItem></RestaurantItem>
                    <RestaurantItem></RestaurantItem>
                </div>
            </div>
        </div>
    )
}
