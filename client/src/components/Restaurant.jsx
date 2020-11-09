import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import styles from "./Restaurant.module.css";
import Grid from "@material-ui/core/Grid";
import MenuItem from "./MenuItem";

export default function Restaurant() {
    return (
        <div>
            <div style={{ position: "relative" }}>
                <img
                    style={{ width: "100%", position: "relative" }}
                    alt="banner"
                    src="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,h_300,f_auto,q_auto,dpr_auto,g_auto,c_fill/scoewkuytu6mbx09zvxl"
                ></img>
                <img
                    className={styles.logo}
                    src="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_100,h_100,f_auto,fl_lossy,q_80,c_fit/cjy96yr7wcbquumoyokh"
                    alt="reslogo"
                />
            </div>
            <div style={{ width: "75%", margin: "20px auto" }}>
                <h2 style={{ fontFamily: "esti", textAlign: "left" }}>
                    Häagen-Dazs Direct - SoMa - 475 6th St
                </h2>
                <div style={{ display: "flex", justifyContent: "start", marginTop: '10px' }}>
                    <div>475 6th St</div>
                    <div style={{ marginLeft: "20px" }}>(858)472-5945</div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >
                    <Box component="fieldset" borderColor="transparent">
                        <Rating
                            name="customized-empty"
                            defaultValue={2}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                    </Box>
                    <div style={{ marginLeft: "10px" }}>12 ratings</div>
                    <div style={{ marginLeft: "10px" }} className={styles.accuracyNumber}>
                        100% <span className={styles.accuracyFont}>Food was good</span>
                    </div>
                    <div style={{ marginLeft: "10px" }} className={styles.accuracyNumber}>
                        100%{" "}
                        <span className={styles.accuracyFont}>Delivery was on time</span>
                    </div>
                    <div style={{ marginLeft: "10px" }} className={styles.accuracyNumber}>
                        100% <span className={styles.accuracyFont}>Order was correct</span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    margin: "10px auto",
                    borderTop: "1.5px solid #e2dff1",
                    borderBottom: "1.5px solid #e2dff1",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "flex-start",
                        width: "75%",
                        margin: "auto",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "esti",
                            marginLeft: "12px",
                            borderBottom: "3px solid #0070eb",
                            padding: "10px 0",
                        }}
                    >
                        Menu
                    </div>
                    <div
                        style={{
                            fontFamily: "esti",
                            marginLeft: "12px",
                            padding: "10px 0",
                        }}
                    >
                        About
          </div>
                    <div
                        style={{
                            fontFamily: "esti",
                            marginLeft: "12px",
                            padding: "10px 0",
                        }}
                    >
                        Reviews
          </div>
                </div>
            </div>

            <div
                style={{
                    margin: "0px auto",
                    borderBottom: "1.5px solid #e2dff1",
                    padding: "4px 0 12px 0"
                }}
            >
                Delivery ASAP (30-40m)
            </div>

            <div style={{ width: "75%", margin: "20px auto", height: "40px" }}>
                <h2 style={{ fontFamily: "esti", textAlign: "left" }}>Ice cream</h2>
                <Grid style={{ marginTop: "10px" }} container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <MenuItem></MenuItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MenuItem></MenuItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MenuItem></MenuItem>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MenuItem></MenuItem>
                    </Grid>
                </Grid>

                <div style={{ textAlign: 'left', marginTop: "50px" }}>
                    <h1 style={{ fontFamily: "esti" }}>Häagen-Dazs Direct - SoMa - 475 6th St Menu Info</h1>
                    <div style={{ color: "#0070eb", marginTop: "10px" }}>Ice Cream</div>
                    <div style={{ marginTop: "10px" }}>$$$$$</div>
                    <div style={{ fontSize: "17px", marginTop: "10px" }}>At Häagen-Dazs® Shops we are proud to serve only the highest quality ice cream made with no artificial colors, flavors or preservatives. Since the very first Shop opened in 1976, we have never wavered in our commitment to using only the finest ingredients to deliver extraordinary (and irresistible)</div>
                    <div style={{ display: "flex", marginTop: "15px", gap: "20px" }}>
                        <div>
                            <img src="https://maps.googleapis.com/maps/api/staticmap?size=518x100&amp;center=37.77662658,-122.40257264&amp;zoom=15&amp;style=feature:poi%7Cvisibility:off&amp;markers=size:mid%7Ccolor:red%7C37.77662658,-122.40257264&amp;client=gme-grubhubinc&amp;signature=RZeSk2sq7slBG1ZU0fbcmAm_YwM&quot;);" alt="google map" />
                            <div style={{ marginTop: "10px", color: "#0070eb" }}>475 6th st</div>
                            <div className={styles.blue}>San Francisco,CA 94103</div>
                            <div style={{ color: "#0070eb" }}>0.93 mi</div>
                            <div style={{ border: "0.5px solid #e2dff1", marginTop: "15px" }}></div>
                            <div style={{ color: "#0070eb", padding: "10px 0" }}>(858) 472-5945</div>
                            <div style={{ border: "0.5px solid #e2dff1" }}></div>
                            <div style={{ color: "#0070eb", padding: "10px 0" }}>View more about Häagen-Dazs Direct - SoMa - 475 6th St</div>
                            <div style={{ border: "0.5px solid #e2dff1" }}></div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h3 style={{ textAlign: "left", fontFamily: "esti" }}>Hours</h3>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                                <div>Today</div>
                                <div>
                                    <div>Delivery: 8:00am–11:59pm</div>
                                    <div style={{ fontSize: "15px", color: "#6b6b83", textAlign: "right", marginTop: "6px" }}>Pickup: 8:00am–2:00am</div>
                                </div>

                            </div>
                            <div style={{ border: "0.5px solid #e2dff1", marginTop: "20px" }}></div>
                            <div style={{ color: "#0070eb", marginTop: "10px", marginLeft: "10px" }}>see the full schedule</div>
                        </div>

                    </div>
                    <div style={{ marginTop: "35px" }}>
                        <h1 className={styles.esti}>FAQs</h1>
                        <div style={{ marginTop: "20px" }}>
                            <h4 className={styles.esti}>Q) Does Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) deliver?</h4>
                            <div style={{ fontSize: "15px", marginTop: "7px" }}>A) Yes, Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) delivery is available on Grubhub.</div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h4 className={styles.esti}>Q) Does Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) offer contact-free delivery?</h4>
                            <div style={{ fontSize: "15px", marginTop: "7px" }}>A) Yes, Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) provides contact-free delivery with Grubhub.</div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h4 className={styles.esti}>Q) Is Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) eligible for Grubhub+ free delivery?</h4>
                            <div style={{ fontSize: "15px", marginTop: "7px" }}>A) Yes, Grubhub offers free delivery for Häagen-Dazs Direct - SoMa - 475 6th St (475 6th St) with a Grubhub+ membership.</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

