import React from 'react'
import Rating from '@material-ui/lab/Rating';

export default function RestaurantItem(props) {
    return (
        <div>
            <div style={{ margin: '10px 20px', display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <img style={{ height: "100px" }} src="https://res.cloudinary.com/grubhub/image/upload/d_search:browse-images:default.jpg/w_205,h_205,f_auto,fl_lossy,q_80,c_fill/q3fdlj8kesfztmfiig9m" alt="resitem"></img>
                <div style={{ marginLeft: "20px", width: "45%" }}>
                    <h3 style={{ fontFamily: "esti", textAlign: "left" }}>Häagen-Dazs Direct - SoMa - 475 6th St</h3>
                    <div style={{ textAlign: "left", color: "#6f6f86", marginTop: '20px' }}>New</div>
                </div>
                <div style={{ marginLeft: "20px", width: "20%" }}>
                    <Rating name="simple-controlled" />
                    <div style={{ color: "#6b6b83" }}>12 ratings</div>
                </div>
                <div style={{ marginLeft: "40px" }}>
                    <h3 style={{ fontFamily: "esti" }}>30-40</h3>
                    <div style={{ color: "#6b6b83", marginTop: "10px" }}>mins</div>
                </div>

            </div>
            <div style={{ border: "0.5px solid #d9d4ed", height: "1px" }}></div>
        </div>

    )
}
