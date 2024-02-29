import { React, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img
                className="logo"
                alt="logo"
                src="https://img.freepik.com/premium-vector/eagle-mascot-logo_183875-60.jpg?w=740"
            />
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/update">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li style={{ textTransform: 'capitalize' }}><Link to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
                    </ul >
                    :
                    <ul className="nav-ul nav-right">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }

        </div >
    )
}

export default Nav;