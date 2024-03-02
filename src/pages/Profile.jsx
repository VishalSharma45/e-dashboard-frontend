import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        let profileData = JSON.parse(localStorage.getItem("user"));
        setName(profileData.name);
        setEmail(profileData.email);
    })
    return (
        <div className='profile'>
            <div className="innerProduct">
                <h1>User Details</h1>
                <input
                    style={{ "marginBottom": "2px", textTransform:"capitalize" }}
                    className="inputBox"
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    readOnly
                />
                <input
                    style={{ "marginBottom": "2px"}}
                    className="inputBox"
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                />
            </div>
        </div>
    )
}

export default Profile