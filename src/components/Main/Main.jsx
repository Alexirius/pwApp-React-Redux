import React from "react";
import Header from "./Header/Header";
import History from "./History/History";
import Transaction from "./Transaction/Transaction";
import './Main.css';

const Main = () => {
    console.log('Main');

    return (
        <div className='main'>
            <Header />
            <Transaction />
            <History />
        </div>
    )
}
export default Main;