import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    });

    const collectData = async () => {
        const payload = {
            name: name,
            email: email,
            password: password
        }

        let result = await fetch("http://localhost:5500/register", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        result = await result.json();
        if (result) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
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
                <input
                    className="inputBox"
                    type="email"
                    placeholder="Enter Email"
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
                    onClick={collectData}
                >
                    Sign Up
                </button>

            </div>
        </div>
    )
}

export default SignUp;