import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <nav className="logoImg">
               <h1 id="logo"><a href="#">BD SHOP</a></h1>
            </nav>
        
            <nav className="manubar">
                    
                <Link to="/shop">Home</Link>
                <Link to="/review">Orders</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/shop">deals</Link>
               
            </nav>
            <button className="loginBtn" onClick={() => setLoggedInUser({})}>Login</button>
        </div>
    );
};

export default Header;