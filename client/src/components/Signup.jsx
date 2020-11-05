import React from 'react';
import styles from './Login.module.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom"

export default function Login() {
    document.title = 'Sign In to Crubhub | Order Online | Crubhub';
    return (
        <div>
            <div className={styles.mainCard}>
                <div style={{ padding: '10px 30px' }}>
                    <h2 className={styles.signInText}>
                        Create your account
                    </h2>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div className={styles.placeholder}>First name</div>
                                <input type="text" className={styles.halfInput}></input>
                            </div>
                            <div>
                                <div className={styles.placeholder}>Last name</div>
                                <input type="text" className={styles.halfInput}></input>
                            </div>
                        </div>
                        <div className={styles.placeholder}>Email</div>
                        <input type="email" className={styles.input}></input>
                        <div className={styles.placeholder}>Password (8 character minimum)</div>
                        <input type="password" minlength="8" className={styles.input}></input>
                        <div className={styles.utility}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Checkbox
                                    defaultChecked
                                    style={{ color: "#6b6b83", marginLeft: "-11px" }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <div style={{ fontSize: "15px", color: "#6b6b83" }}>Keep me signed in</div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <button className={styles.createButton}>Create your account</button>
                    </form>
                    <div>or</div>
                    <FacebookLogin
                        appId="374855257050311"
                        fields="name,email,picture"
                        cssClass={styles.facebookButton}
                    />
                    <GoogleLogin
                        clientId="68681624345-nj1lkl9qpgprcb9vc8hmphb9igu6fl17.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                className={styles.googleButton}
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                Login with Google
                            </button>
                        )}
                        buttonText="Login"
                        cookiePolicy={'single_host_origin'}
                    />
                    <div style={{ marginTop: "10px", fontSize: "15px" }} >Have an account?
                         <Link to="/login" style={{
                            textDecoration: 'none',
                            color: '#0070eb',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginLeft: "10px"
                        }} >Sign in</Link>
                    </div>
                    <div style={{ fontSize: "13px", marginTop: "10px", marginBottom: "40px", fontWeight: '450', }} >By creating your Grubhub account, you agree to the
                        <a
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '13px',
                                fontWeight: '600',
                                marginLeft: "10px",
                                marginRight: "10px"
                            }}
                            href="https://www.google.com"
                        >
                            Terms of Use
                        </a>
                        and
                        <a
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '13px',
                                fontWeight: '600',
                                marginLeft: "10px"
                            }}
                            href="https://www.google.com"
                        >
                            Privacy Policy.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
