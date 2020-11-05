import React from 'react';
import styles from './Login.module.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Checkbox from '@material-ui/core/Checkbox';

export default function Login() {
    document.title = 'Sign In to Crubhub | Order Online | Crubhub';
    return (
        <div>
            <div className={styles.mainCard}>
                <div style={{ padding: '10px 30px' }}>
                    <h2 className={styles.signInText}>
                        Sign in with your Crubhub account
                    </h2>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className={styles.placeholder}>Email</div>
                        <input type="email" className={styles.input}></input>
                        <div className={styles.placeholder}>Password</div>
                        <input type="password" className={styles.input}></input>
                        <div className={styles.utility}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Checkbox
                                    defaultChecked
                                    style={{ color: "#6b6b83", marginLeft: "-11px" }}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                {/* <input type="checkbox" style={{ height: "28px", width: "28px", marginLeft: "-4px" }} ></input> */}
                                <div style={{ fontSize: "15px", color: "#6b6b83" }}>Keep me signed in</div>
                            </div>
                            <div>
                                <a
                                    style={{
                                        textDecoration: 'none',
                                        color: '#0070eb',
                                        fontSize: '15px'
                                    }}
                                    href="https://www.google.com"
                                >
                                    Reset password
                                </a>
                            </div>
                        </div>
                        <button className={styles.button}>Sign in</button>
                    </form>
                    <div>or</div>
                    <FacebookLogin
                        appId="374855257050311"
                        fields="name,email,picture"
                        cssClass={styles.facebookButton}
                    />
                    <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
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
                    <div style={{ marginTop: '15px', marginBottom: '35px' }}>
                        <a
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '15px',
                                fontWeight: '500'
                            }}
                            href="https://www.google.com"
                        >
                            Create your account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
