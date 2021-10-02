// -------- show Yes/No dialog  -------- //

import './Dialog.css';

const Dialog = ({header, message, handleYes, handleNo}) => {
    return (
        <div id="back-dialog">
            <div id="dialog-content">
                <div id="dialog-header">{header}</div>
                <div id="dialog-text">{message}</div>
                <button id="yes-btn" onClick= {handleYes}>Yes</button>
                <button id="no-btn" onClick={handleNo}>No</button>
            </div>
        </div>
    )
}

export default Dialog;