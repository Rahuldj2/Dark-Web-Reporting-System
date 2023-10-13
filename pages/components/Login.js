// Login.js
import React,{ useState } from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './config.js';

const auth = getAuth(app);

const Login = ({ onLogin }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            // User is now authenticated, you can load tips here.
            // Fetch tips from Firestore, similar to the code you provided in your component.
            // You may want to do this inside a useEffect to fetch tips after authentication.
            onLogin();
        } catch (error) {
            console.error('Login error:',error);
            // TODO: Handle error, display a user-friendly message, etc.
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <h2>Login</h2>
                <label>
                    Government ID Key:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default Login;
