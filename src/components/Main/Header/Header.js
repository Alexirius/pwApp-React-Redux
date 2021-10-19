import React from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../../../actions/actions';
import Logo from './Logo/Logo';
import './Header.css';

const Header = ({ username, balance, handleLogout }) => {
    return (
        <header>
            <div className="header-wrap">
                <div className="app-header">
                    <div className="logo" id="logo">
                            <Logo />
                    </div>
                    <div className="title">
                        <h1>Your Parrot Wings Office</h1>
                    </div>
                    <div className='greetings'>
                        Welcome, <span className="output"> {username}</span>!
                        Your balance is <span className="output"> {balance} </span> PW.
                    </div>
                    <div className="btn-container">
                        <button className='logout_btn' type='button' onClick={handleLogout} >Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = ({username, balance}) => {
    return {
        username,
        balance,
    }
}
const mapDispatchToProps = {
    handleLogout
}
export default connect(mapStateToProps, mapDispatchToProps) (Header);