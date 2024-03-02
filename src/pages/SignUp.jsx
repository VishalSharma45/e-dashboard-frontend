import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    });

    const collectData = async () => {
        if (!name || !email || !password) {
            setError(true);
            return false;
        }

        const payload = {
            name: name,
            email: email,
            password: password
        }

        try {
            setLoading(true);
            let result = await fetch("http://localhost:5500/register", {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            result = await result.json();
            if (result) {
                localStorage.setItem("user", JSON.stringify(result.result));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate('/');
            }
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="register">
            <div className="innerRegister">
                <h1>Register</h1>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span className='invalid-input'>Enter name</span>}
                <input
                    className="inputBox"
                    type="email"
                    placeholder="Enter Email"
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
                    onClick={collectData}
                    disabled={loading}
                >
                    Sign Up
                </button>

            </div>
        </div>
    )
}

export default SignUp;