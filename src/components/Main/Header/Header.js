import './Header.css';

const Header = ({userName, balance, handleLogout}) => {
    return (
        <header className="app-header">
            <div className="logo">
                <div className="logo_text">
                    <h1>Your Parrot Wings Office</h1>
                </div>
            </div>
            <hr/>
            <div className='greetings'>
                Welcome, <span className="output"> {userName} </span>
                ! Your balance is <span className="output"> {balance} </span> PW.
                <button className='logout_btn' type='button' onClick={handleLogout} >Logout</button>
            </div>
        </header>
    )
}

export default Header;