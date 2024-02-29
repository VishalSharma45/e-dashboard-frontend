import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })

    const handleLogin = async () => {
        const payload = {
            email: email,
            password: password
        }

        let result = await fetch("http://localhost:5500/login", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } else {
            alert("please enter correct details");
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
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="appButton"
                    type="button"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;