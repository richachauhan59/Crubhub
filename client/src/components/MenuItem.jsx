import React from "react";

export default function MenuItem(props) {
    return (
        <div
            style={{
                boxShadow: `0 0 0 1px rgba(67, 41, 163, 0.08),
                0 1px 5px 0 rgba(67, 41, 163, 0.08)`,
                borderRadius: "4px", padding: "15px", marginTop: "5px", display: "flex",
                position: "relative"
            }}
        >
            <div style={{ width: "70%" }}>
                <h4 style={{ fontFamily: "esti", textAlign: "left" }}>Mint Chip Ice Cream</h4>
                <div style={{ textAlign: "left", color: "#6b6b83", marginTop: "20px", fontSize: "17px" }}>We infuse mint essence into a smooth, creamy base and add rich chocolaty chips for the perfect finish to this refreshingly cool treat. 14 oz.</div>
            </div>
            <div style={{ width: "auto" }}>
                <img style={{ height: "100px" }} src="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,h_130,f_auto,g_auto,q_auto,dpr_auto,c_fill/jlcxnwrzwvkorgtaovmx" alt="item logo" />
            </div>
            <div style={{ position: "absolute", backgroundColor: "white", opacity: "0.75", padding: '3px', borderRadius: "3px", top: "20px", right: "30px", fontFamily: "esti" }}>$7.99</div>
        </div>
    );
}
