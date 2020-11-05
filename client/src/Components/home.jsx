import React, { Component } from 'react'
import './home.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    handleInputChange = (e) => {
        axios({
            method: "get",
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json`,
            params: {
                "access_token": "pk.eyJ1IjoicmljaGFjaGF1aGFuIiwiYSI6ImNraDF0NmMxdTAzeDMyem9pZWtpMmZiY2UifQ.sGlBM0QPBIFTFgLP_Bl_gg"
            }
        }).then(res => {
            this.setState({
                data: res.data.features
            })
            console.log(res)
        })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <div className="main_div">
                    <div className="row">
                        <div className="col p-3" style={{ background: "#37316B", color: "white", textAlign: "center" }}>
                            <span>
                                Your health and safety is our priority, from restaurant to doorstep <a href="#" style={{ color: "white", textDecoration: "underline" }}> Learn More</a>
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6"><img className="w-100" src="https://media-cdn.grubhub.com/image/upload/c_scale,w_1650/q_50,dpr_auto,f_auto,fl_lossy,c_crop,e_vibrance:20,g_center,h_900,w_800/v1534256595/Onboarding/Burger.jpg" alt="Image" /></div>
                        <div className="col-6">
                            <div className="row mt-5">
                                <div className="col"></div>
                                <div className="col"></div>
                                <div className="col" style={{ color: "#0271EB", fontSize: "20.3px", lineHeight: "1.44359" }}><b>Get Perks in the app</b></div>
                                <div className="col" style={{ color: "#0271EB", fontSize: "20.3px", lineHeight: "1.44359" }}><b>Sign in</b></div>
                            </div>
                            <div className="row mt-5 my-5" style={{ marginTop: "100px" }}>
                                <div className="col-8 "><h1 style={{ fontSize: "3vw", fontWeight: "400px" }}><b>Order food delivery <br /> you’ll love</b></h1></div>
                            </div>
                            <div className="row">
                                <div className="col main_input">
                                    <Autocomplete
                                        freeSolo
                                        id="free-solo-2-demo"
                                        disableClearable
                                        options={this.state.data.map(place => place.place_name)}
                                        renderInput={(params) => (
                                            <TextField
                                                placeholder="Enter street address or zip code"
                                                onChange={this.handleInputChange}
                                                {...params}
                                                variant="outlined"
                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                            />
                                        )} />
                                </div>
                                <div className="col"> <button type="button" className="btn btn-primary btn-lg button_input">Find food</button></div>
                            </div>
                        </div>
                    </div>


                    <div className="container my-5 mt-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col text-center"><img src="https://res.cloudinary.com/grubhub-assets/image/upload/v1567194984/illustration_1_gh_tqpnjw.svg" alt="" />
                                    <br /><b>Local favorites</b>
                                    <p>Satisfy any craving with delivery from popular neighborhood restaurants and chains. Reorder go-tos or find something new.</p>
                                </div>
                                <div className="col text-center"><img style={{ maxHeight: "96px" }} src="https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto,fl_lossy/v1584729480/HERMES/2020/DINER/BRD/BRD-20200316-COVID-19-RELIEF/DonatethechangeGHunauthenticated.png" alt="" />
                                    <br /><b>Support restaurants and drivers</b><br />
                                    <p>Donate your change to the Grubhub Community Relief Fund at checkout. Donations go to charitable organizations supporting local restaurants and drivers impacted by COVID-19</p>
                                </div>
                                <div className="col text-center"><img src="https://res.cloudinary.com/grubhub-assets/image/upload/v1567212067/illustration_3_gh_wzrh6c.svg" alt="" />
                                    <br /><b >Exclusive Perks</b>
                                    <p>Discover more deals and restaurant rewards near you. Cash in on Perks and get $100s in savings.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container my-5 mt-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col text-center">
                                    <h1><b>Pickup or delivery from restaurants near you</b></h1>
                                    <p>Explore restaurants that deliver near you, or try yummy
                                    takeout fare. With a place for every taste, it’s easy
                                    to find food you crave, and order online or through the
                                    Grubhub app. Find great meals fast with lots of local menus.
                                    Enjoy eating the convenient way with places that deliver to your door.
                                    </p>
                                </div>
                                <div className="col"><img src="https://res.cloudinary.com/grubhub-assets/image/upload/fl_lossy,f_auto,w_570/v1533845150/static-homepage/women-eating-burgers-delivery-v3.png" alt="" /></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#EFEFEF" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col p-2  text-center"> <h2 style={{ marginTop: "90px", fontWeight: "bolder" }}>About Grubhub</h2></div>
                                <div className="col p-2 ">
                                    <p style={{ margin: "2%" }}>
                                        Grubhub helps you find and order food from wherever
                                        you are. How it works: you type in an address, we tell
                                        you the restaurants that deliver to that locale as well
                                        as showing you droves of pickup restaurants near you.
                                        Want to be more specific? Search by cuisine, restaurant
                                        name or menu item. We'll filter your results accordingly.
                                        When you find what you're looking for, you can place your
                                        order online or by phone, free of charge. Oh, and we also
                                        give you access to reviews, coupons, special deals and a
                                        24/7 customer care team that tracks each order and makes
                                            sure<br /> you get exactly what you want.
                                            </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#3A51AA", color: "white", paddingTop: "35px" }}>
                        <div className="container text-white">
                            <div className="row">
                                <div className="col">
                                        <label style={{ paddingBottom: "15px" }}><b><a>Sign up for special offers</a></b></label>
                                        <div>
                                            <label>Email address</label>
                                            <input placeholder="your@gmail.com" />
                                        </div>
                                        <div>
                                            <label>ZIP Code</label>
                                            <input placeholder="1111" />
                                        </div>
                                        
                                        <button type="button" className="btn btn-primary button_input">Count me in!</button>

                                </div>
                                <div className="col">
                                    <label style={{ paddingBottom: "15px"}}><b><a>Get to know us</a></b></label>   
                                    <ul style={{ listStyle: "none", paddingLeft: "0px"  }}>
                                        <li><a href="#">About Grubhub</a></li>
                                        <li><a href="#">Our apps</a></li>
                                        <li><a href="#">Our blog</a></li>
                                        <li><a href="#">Our tech blog, Grubhub Bytes</a></li>
                                        <li><a href="#">Careers</a></li>
                                        <li><a href="#">Investor relations</a></li>
                                        <li><a href="#">News</a></li>
                                    </ul>
                                </div>

                                <div className="col">
                                    <label style={{ paddingBottom: "15px"}}><b><a>Useful links</a></b></label>
                                    <ul style={{ listStyle: "none", paddingLeft: "0px"  }}>
                                        <li><a href="#">Grubhub+</a></li>
                                        <li><a href="#">Grubhub Perks</a></li>
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">Help</a></li>
                                        <li><a href="#">ketaring</a></li>
                                        <li><a href="#">Student discounts</a></li>
                                        <li><a href="#">Keyboard Shortcuts</a></li>
                                        <li><a href="#">answers</a></li>
                                    </ul>
                                    <ul style={{ listStyle: "none" }}>
                                        <li><a><b>Connect with us</b></a></li>
                                        <li><a>Facebook</a></li>
                                        <li><a>Twitter</a></li>
                                        <li><a>Instagram</a></li>
                                        <li><a>YouTube</a></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul style={{ listStyle: "none" }}>
                                        <li><b>Partner with us</b></li>
                                        <li><button type="button" class="btn btn-outline-light my-2 text-white">For restaurent</button></li>
                                        <li><button type="button" class="btn btn-outline-light my-2 text-white">For drivers</button></li>
                                        <li><button type="button" class="btn btn-outline-light my-2 text-white">For corporate accounts</button></li>
                                        <li><button type="button" class="btn btn-outline-light my-2 text-white">Become an Affiliate</button></li>
                                    </ul>
                                </div>
                            </div>
                            <hr style={{ background: "white" }} />
                            <div style={{padding: "36px" }}>
                                <div>
                                    <h5 style={{ listStyle: "none", marginBottom: "30px" }}><li><b>Browse delivery restaurants</b></li></h5>
                                </div>

                                <div className="row" >
                                    <div className="col" style={{ maxWidth: "25%", paddingRight: "15px", paddingLeft: "15px" }}>
                                        <label style={{ paddingBottom: "15px" }}><a><b>Browse by cuisines</b></a></label>
                                        <div>
                                            <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                                                <li><a>Alcohol delivery</a></li>
                                                <li><a>American Food delivery</a></li>
                                                <li><a>Asian Food delivery</a></li>
                                                <li><a>Breakfast delivery</a></li>
                                                <li><a>Chicken delivery</a></li>
                                                <li><a>Chinese Food delivery</a></li>
                                                <li><a>Dessert delivery</a></li>
                                                <li><a>Dinner delivery</a></li>
                                                <li><a>Gluten-free delivery</a></li>
                                                <li><a>Healthy Food delivery</a></li>
                                                <li><a>Ice Cream delivery</a></li>
                                                <li><a>Indian Food delivery</a></li>
                                                <li><a>Italian Food delivery</a></li>
                                                <li><a>Japanese delivery</a></li>
                                                <li><a>Late Night delivery</a></li>
                                                <li><a>Lunch delivery</a></li>
                                                <li><a>Mexican Food delivery</a></li>
                                                <li><a>Organic Food delivery</a></li>
                                                <li><a>Pasta delivery</a></li>
                                                <li><a>Pizza delivery</a></li>
                                                <li><a>Sandwiches delivery</a></li>
                                                <li><a>Seafood delivery</a></li>
                                                <li><a>Soup delivery</a></li>
                                                <li><a>Steak delivery</a></li>
                                                <li><a>Sushi delivery</a></li>
                                                <li><a>Thai Food delivery</a></li>
                                                <li><a>Vegetarian Food delivery</a></li>
                                                <li><a>Wings delivery</a></li>
                                                <li><a>See more</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="col" style={{ maxWidth: "50%", paddingRight: "15px", paddingLeft: "15px" }}>
                                        <div className="">
                                            <label style={{ paddingBottom: "15px" }}><a><b>Browse by cities</b></a></label>
                                            <div>
                                                <ul className="" style={{ listStyle: "none", columns: "2", paddingLeft: "0px" }}>
                                                    <li><a href="#">Ann Arbor restaurants</a></li>
                                                    <li><a href="#">Atlanta restaurants</a></li>
                                                    <li><a href="#">Austin restaurants</a></li>
                                                    <li><a href="#">Baltimore restaurants</a></li>
                                                    <li><a href="#">Bloomington restaurants</a></li>
                                                    <li><a href="#">Boston restaurants</a></li>
                                                    <li><a href="#">Boulder restaurants</a></li>
                                                    <li><a href="#">Brooklyn restaurants</a></li>
                                                    <li><a href="#">Champaign restaurants</a></li>
                                                    <li><a href="#">Chicago restaurants</a></li>
                                                    <li><a href="#">Columbus restaurants</a></li>
                                                    <li><a href="#">Dallas restaurants</a></li>
                                                    <li><a href="#">Denver restaurants</a></li>
                                                    <li><a href="#">Detroit restaurants</a></li>
                                                    <li><a href="#">Fort Worth restaurants</a></li>
                                                    <li><a href="#">Hartford restaurants</a></li>
                                                    <li><a href="#">Houston restaurants</a></li>
                                                    <li><a href="#">Ithaca restaurants</a></li>
                                                    <li><a href="#">Las Vegas restaurants</a></li>
                                                    <li><a href="#">Los Angeles restaurants</a></li>
                                                    <li><a href="#">Madison restaurants</a></li>
                                                    <li><a href="#">Manhattan restaurants</a></li>
                                                    <li><a href="#">Miami restaurants</a></li>
                                                    <li><a href="#">Milwaukee restaurants</a></li>
                                                    <li><a href="#">Nashville restaurants</a></li>
                                                    <li><a href="#">New Haven restaurants</a></li>
                                                    <li><a href="#">New York City restaurants</a></li>
                                                    <li><a href="#">Oakland restaurants</a></li>
                                                    <li><a href="#">Orange County restaurants</a></li>
                                                    <li><a href="#">Philadelphia restaurants</a></li>
                                                    <li><a href="#">Phoenix restaurants</a></li>
                                                    <li><a href="#">Pittsburgh restaurants</a></li>
                                                    <li><a href="#">Portland restaurants</a></li>
                                                    <li><a href="#">Queens restaurants</a></li>
                                                    <li><a href="#">Rochester restaurants</a></li>
                                                    <li><a href="#">San Diego restaurants</a></li>
                                                    <li><a href="#">San Francisco restaurants</a></li>
                                                    <li><a href="#">San Jose restaurants</a></li>
                                                    <li><a href="#">Scottsdale restaurants</a></li>
                                                    <li><a href="#">Seattle restaurants</a></li>
                                                    <li><a href="#">Syracuse restaurants</a></li>
                                                    <li><a href="#">Tampa restaurants</a></li>
                                                    <li><a href="#">Tempe restaurants</a></li>
                                                    <li><a href="#">Urbana restaurants</a></li>
                                                    <li><a href="#">Washington, DC restaurants</a></li>
                                                    <li><a href="#">Show more</a></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col" style={{ maxWidth: "25%", paddingRight: "15px", paddingLeft: "15px" }}>
                                        <div className="">
                                            <label style={{ paddingBottom: "15px" }}><a><b>Browse by restaurants</b></a></label>
                                            <div>
                                                <ul className="" style={{ listStyle: "none", paddingLeft: "0px" }}>
                                                    <li><a href="#">Restaurant Chains Delivery</a></li>
                                                    <li><a href="#">Burger King Delivery</a></li>
                                                    <li><a href="#">Pizza Hut Delivery</a></li>
                                                    <li><a href="#">Denny's</a></li>
                                                    <li><a href="#">Church's Chicken Menu</a></li>
                                                    <li><a href="#">Papa John's Pizza</a></li>
                                                    <li><a href="#">Restaurants Near Me</a></li>
                                                    <li><a href="#">Restaurants by Dish</a></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <hr style={{ background: "white" }} />

                            


                            <div className="">
                                <div className="" style={{ padding: "32px" }} >
                                    <div className=""> </div>
                                    <div className="row">
                                        <div className="col">
                                            <p className="">© 2020 Grubhub All rights reserved.</p>
                                        </div>
                                        <div className="col">
                                            <div className="" style={{columns: "2"}}>
                                                <div className="" style={{marginBottom: "16px"}}> <a href="/legal/terms-of-use"        className="">Terms of Use</a> </div>
                                                <div className="" style={{marginBottom: "16px"}}> <a href="/legal/privacy-policy"      className="">Privacy Policy</a> </div>
                                                <div className="" style={{marginBottom: "16px"}}> <a href="/legal/ca-privacy-notice"   className="">CA Privacy Notice</a> </div>
                                                <div className="" style={{marginBottom: "16px"}}> <a href="/help/privacy/opt-out"      className="">Do Not Sell My Info</a> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default home




