import React, { useState } from 'react';
import styles from './Login.module.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser, oauthLogin } from '../redux/auth/actions';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Login() {
    document.title = 'Sign In to Crubhub | Order Online | Crubhub';

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ firstName, lastName, email, password }));
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
                    <h2 className={styles.signInText}>Create your account</h2>
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <div className={styles.placeholder}>
                                    First name
                                </div>
                                <input
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    value={firstName}
                                    type="text"
                                    className={styles.halfInput}
                                ></input>
                            </div>
                            <div>
                                <div className={styles.placeholder}>
                                    Last name
                                </div>
                                <input
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    value={lastName}
                                    type="text"
                                    className={styles.halfInput}
                                ></input>
                            </div>
                        </div>
                        <div className={styles.placeholder}>Email</div>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            className={styles.input}
                        ></input>
                        <div className={styles.placeholder}>
                            Password (6 character minimum)
                        </div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            minLength="6"
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
                            <div></div>
                        </div>
                        <button className={styles.createButton}>
                            Create your account
                        </button>
                    </form>
                    <div>or</div>
                    <div style={{ position: 'relative', height: '60px' }}>
                        <FacebookIcon
                            style={{
                                position: 'absolute',
                                top: 'calc(50% - 15px)',
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
                                top: 'calc(50% - 16px)',
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
                    <div style={{ marginTop: '10px', fontSize: '15px' }}>
                        Have an account?
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '14px',
                                fontWeight: '500',
                                marginLeft: '10px'
                            }}
                        >
                            Sign in
                        </Link>
                    </div>
                    <div
                        style={{
                            fontSize: '13px',
                            marginTop: '10px',
                            marginBottom: '40px',
                            fontWeight: '450'
                        }}
                    >
                        By creating your Grubhub account, you agree to the
                        <a
                            style={{
                                textDecoration: 'none',
                                color: '#0070eb',
                                fontSize: '13px',
                                fontWeight: '600',
                                marginLeft: '5px',
                                marginRight: '5px'
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
                                marginLeft: '5px'
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
