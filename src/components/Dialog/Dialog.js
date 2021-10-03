/*	Reusable Yes/No Dialog with Keyboard support

Supported keys: <Y>, <N>, <Esc>, <Enter>, <Left> && <Right> arrows.
Also click out of Dialog area is used for disabling Dialog.

props:
    header: string,
    message: string,
    handleYes: function,
    handleNo: function
*/

import React from 'react';
import './Dialog.css';

export default class Dialog extends React.Component {

    state={activeYes: false};

    componentDidMount() {
        // Click out of Dialog area
        document.getElementById('back-dialog').addEventListener('click',this.clickOnBack);
        // Keyboard support
        document.body.addEventListener('keydown',this.handleKeyboard);
    }

    componentWillUnmount() {
        document.getElementById('back-dialog').removeEventListener('click',this.clickOnBack);
        document.body.removeEventListener('keydown',this.handleKeyboard);
    }

    clickOnBack = (ev) =>{
        const {handleNo} = this.props;
		if (!document.getElementById('dialog-content').contains(ev.target)) {
            handleNo();
        }

    }

    handleKeyboard = (ev) => {
        ev.preventDefault();
        const {keyCode} = ev;
        const {handleYes, handleNo} = this.props;
        if (keyCode===37 || keyCode===39) {                         // Left || Right Arrows
            this.setState((state)=>{
                return {activeYes: !state.activeYes}
            })
        } else if (keyCode===13) {                                  // Enter key
            return (this.state.activeYes) ? handleYes() : handleNo();
        }
        else if (keyCode===27 || keyCode===78) return handleNo()    // Esc || N key
        else if (keyCode===89) return handleYes()                   // Y key

    }

    render() {
        const {header, message, handleYes, handleNo} = this.props;
        const {activeYes} = this.state;
        return (
            <div id="back-dialog">
                <div id="dialog-content">
                    <div id="dialog-header">{header}</div>
                    <div id="dialog-text">{message}</div>
                    <button className={(activeYes)?'btn active':'btn'} id="yes-btn" onClick= {handleYes}>Yes</button>
                    <button className={(activeYes)?'btn':'btn active'} id="no-btn" onClick={handleNo}>No</button>
                </div>
            </div>
        )
    }
}