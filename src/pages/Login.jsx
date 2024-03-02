import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("customer@mail.com");
    const [password, setPassword] = useState("111111");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
            return false;
        }

        const payload = {
            email: email,
            password: password
        }

        try {
            setLoading(true);
            let result = await fetch("http://localhost:5500/login", {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (result.status === 200) {
                result = await result.json();
                console.log(result.status)
                if (result.auth) {
                    localStorage.setItem('user', JSON.stringify(result.user));
                    localStorage.setItem('token', JSON.stringify(result.auth));
                    toast.success("Login Successful");
                    navigate('/');
                } else {
                    toast.error("please enter correct details");
                }
            } else {
                const errorResponse = await result.json();
                toast.error(errorResponse.error || "Login failed. Please try again later.");
            }
        } catch (error) {
            toast.error("Login failed. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <div className="innerLogin">
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="inputBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error && !email && <span className='invalid-input'>Enter email</span>}
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && !password && <span className='invalid-input'>Enter password</span>}
                <button
                    className="appButton"
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;