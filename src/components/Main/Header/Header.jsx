import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../../../actions/loginActions';
import { fetchUserInfoRequest } from '../../../actions/mainActions'
import Logo from '../../UI/Logo/Logo';
import './Header.css';

const Header = () => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.login.token);
    const username = useSelector(state => state.main.username);
    const balance = useSelector(state => state.main.balance);

    const onLogout = () => dispatch(handleLogout());

    useEffect(() => {
        dispatch(fetchUserInfoRequest(token));
        // eslint-disable-next-line
    }, [])
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
                        <button className='logout_btn' type='button' onClick={onLogout} >Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;