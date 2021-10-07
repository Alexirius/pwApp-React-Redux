import React from 'react';
import Logo from './Logo/Logo';
import './Header.css';

const Header = ({ userName, balance, handleLogout }) => {
    return (
        <header>
            <div className="header-wrap">
                <div className="app-header">
                    <div className="logo" id="logo">
                            <Logo />
                    </div>
                    <div className="header-center">
                        <div className="logo-text">
                            <h1>Your Parrot Wings Office</h1>
                        </div>
                        <div className='greetings'>
                            Welcome, <span className="output"> {userName}</span>!
                            Your balance is <span className="output"> {balance} </span> PW.
                        </div>
                    </div>
                    <div className="btn-container">
                        <button className='logout_btn' type='button' onClick={handleLogout} >Logout</button>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header;