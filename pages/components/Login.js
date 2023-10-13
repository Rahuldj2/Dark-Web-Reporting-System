// Login.js
import React,{ useState,useEffect } from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../Contracts/config.js';
import styles from '../../styles/Login.module.css';

const auth = getAuth(app);

const Login = ({ onLogin }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isVerified,setIsVerified] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        // Simulating a delay for verification (5 seconds)
        const verificationTimeout = setTimeout(() => {
            setIsVerified(true);
            setIsLoading(false);
        },5000);

        // Cleanup function
        return () => {
            clearTimeout(verificationTimeout);
        };
    },[]);

    const handleVerification = async () => {
        // Simulating the verification process
        setIsLoading(true);
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            onLogin();
        } catch (error) {
            console.error('Login error:',error);
            // TODO: Handle error, display a user-friendly message, etc.
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isVerified) {
            handleLogin();
        } else {
            handleVerification();
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleFormSubmit}>
                <h2>Login</h2>
                <label className={styles.formLabel}>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.formInput}
                    />
                </label>
                <label className={styles.formLabel}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formInput}
                    />
                </label>
                {isVerified ? (
                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                ) : (
                    <div className={styles.loading}>
                        Loading...
                    </div>
                )}
                {!isVerified && (
                    <button
                        type="button"
                        className={styles.verifyButton}
                        onClick={handleVerification}
                    >
                        Verify
                    </button>
                )}
            </form>
        </div>
    );
};

export default Login;
