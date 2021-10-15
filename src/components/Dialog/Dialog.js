/*	Reusable Yes/No Dialog with Keyboard support

Supported keys: <Y>, <N>, <Esc>, <Enter>, <Tab>, <Left> && <Right> arrows.
Also click out of Dialog area may be used to close the Dialog with "No" answer.

*/

import React, {useState, useEffect, createRef} from 'react';
import './Dialog.css';

const Dialog = ({header, message, handleYes, handleNo}) => {

    const [activeYes, setActive] = useState(false)
    const dialogContent = createRef();

    const clickOnBack = (ev) =>{        // Click out of Dialog area
		if (dialogContent.current && !dialogContent.current.contains(ev.target)) {
            handleNo();
        }
    }

    const handleKeyboard = (ev) => {
        ev.preventDefault();
        const {keyCode} = ev;
        if (keyCode===37 || keyCode===39 || keyCode===9) {       // <Tab> || <Left> || <Right> keys
            setActive((activeYes)=>{return !activeYes})
        } else if (keyCode===13) {                               // <Enter> key
            return (activeYes) ? handleYes() : handleNo();
        }
        else if (keyCode===89) return handleYes()                 // <Y> key
        else if (keyCode===27 || keyCode===78) return handleNo()  // <Esc> || <N> key
    }

    useEffect(() => {
        document.body.addEventListener('click', clickOnBack);
        document.body.addEventListener('keydown', handleKeyboard);
        return () => {
            document.body.removeEventListener('click', clickOnBack);
            document.body.removeEventListener('keydown', handleKeyboard);
        }
    // eslint-disable-next-line
    },[]);


    return (
        <div id="back-dialog">
            <div id="dialog-content" ref={dialogContent}>
                <div id="dialog-header">{header}</div>
                <div id="dialog-text">{message}</div>
                <button className={(activeYes)?'btn active':'btn'} onClick={handleYes}>Yes</button>
                <button className={(activeYes)?'btn':'btn active'} onClick={handleNo}>No</button>
            </div>
        </div>
    )
}
export default Dialog;