import React, { useState } from 'react';
import styles from './Login.module.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, oauthLogin } from '../redux/auth/actions';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Login() {
    document.title = 'Sign In to Crubhub | Order Online | Crubhub';

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    const responseGoogle = (response) => {
        const { profileObj } = response;
        dispatch(
            oauthLogin({
                firstName: profileObj.givenName,
                lastName: profileObj.familyName,
                email: profileObj.email
            })
        );
    };

    const failedGoogle = (error) => {
        console.log(error);
    };

    const responseFacebook = (response) => {
        if (response.status === 'unknown') {
            console.log(response);
        } else {
            const [firstName, ...lastName] = response.name.split(' ');
            dispatch(
                oauthLogin({
                    firstName,
                    lastName: lastName.join(' '),
                    email: response.email
                })
            );
        }
    };

    return (
        <div>
            <div className={styles.mainCard}>
                <div style={{ padding: '10px 30px' }}>
                    <h2 className={styles.signInText}>
                        Sign in with your Crubhub account
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <div className={styles.placeholder}>Email</div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className={styles.input}
                        ></input>
                        <div className={styles.placeholder}>Password</div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className={styles.input}
                        ></input>
                        <div className={styles.utility}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Checkbox
                                    defaultChecked
                                    style={{
                                        color: '#0070eb',
                                        marginLeft: '-11px',
                                        marginRight: '-5px'
                                    }}
                                    inputProps={{
                                        'aria-label': 'secondary checkbox'
                                    }}
                                />
                                <div
                                    style={{
                                        fontSize: '15px',
                                        color: '#6b6b83'
                                    }}
                                >
                                    Keep me signed in
                                </div>
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
                        <button
                            type="submit"
                            className={styles.button}
                            style={{ position: 'relative' }}
                        >
                            <img
                                src="/grubhub_logo.svg"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    top: 'calc(50% - 12px)',
                                    left: '8.6px',
                                    height: '26px',
                                    color: 'white'
                                }}
                            />
                            Sign in
                        </button>
                    </form>
                    <div>or</div>
                    <div style={{ position: 'relative', height: '60px' }}>
                        <FacebookIcon
                            style={{
                                position: 'absolute',
                                top: 'calc(50% - 17.5px)',
                                left: '5.6px',
                                fontSize: '36px',
                                color: 'white'
                            }}
                        />
                        <FacebookLogin
                            appId="374855257050311"
                            fields="name,email"
                            cssClass={styles.facebookButton}
                            render={(renderProps) => (
                                <button>This is my custom FB button</button>
                            )}
                            callback={responseFacebook}
                        />
                    </div>
                    <div style={{ position: 'relative', height: '60px' }}>
                        <img
                            src="/google_logo.svg"
                            alt=""
                            style={{
                                position: 'absolute',
                                top: 'calc(50% - 18px)',
                                left: '5.6px',
                                height: '38px',
                                color: 'white'
                            }}
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
                            onSuccess={responseGoogle}
                            onFailure={failedGoogle}
                            buttonText="Login"
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <div style={{ marginTop: '15px', marginBottom: '35px' }}>
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '15px',
                                fontWeight: '500'
                            }}
                        >
                            Create your account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
