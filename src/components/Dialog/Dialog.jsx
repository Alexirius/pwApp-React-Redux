/*	Reusable Yes/No Dialog with Keyboard support

Supported keys: <Y>, <N>, <Esc>, <Enter>, <Tab>, <Left> && <Right> arrows.
Also click out of Dialog area may be used to close the Dialog with "No" answer.

*/

import React from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

export default class Dialog extends React.Component {
    static propTypes = {
        header: PropTypes.string,
        message: PropTypes.string,
        handleYes: PropTypes.func.isRequired,
        handleNo: PropTypes.func.isRequired
    }
    static defaultProps = {
        header: '',
        message: 'Really?'
    }

    state={activeYes: false};

    dialogContent = React.createRef();

    componentDidMount() {
        // Click out of Dialog area
        document.body.addEventListener('click',this.clickOnBack);
        // Keyboard support
        document.body.addEventListener('keydown',this.handleKeyboard);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click',this.clickOnBack);
        document.body.removeEventListener('keydown',this.handleKeyboard);
    }

    clickOnBack = (ev) =>{
        const {handleNo} = this.props;
		if (!this.dialogContent.current.contains(ev.target)) {
            handleNo();
        }
    }

    handleKeyboard = (ev) => {
        ev.preventDefault();
        const {keyCode} = ev;
        const {handleYes, handleNo} = this.props;
        if (keyCode===37 || keyCode===39 || keyCode===9) {        // <Tab> || <Left> || <Right> keys
            this.setState((state)=>{
                return {activeYes: !state.activeYes}
            })
        } else if (keyCode===13) {                                  // <Enter> key
            return (this.state.activeYes) ? handleYes() : handleNo();
        }
        else if (keyCode===89) return handleYes()                   // <Y> key
        else if (keyCode===27 || keyCode===78) return handleNo()    // <Esc> || <N> key

    }

    render() {
        const {header, message, handleYes, handleNo} = this.props;
        const {activeYes} = this.state;
        return (
            <div id="back-dialog">
                <div id="dialog-content" ref={this.dialogContent}>
                    <div id="dialog-header">{header}</div>
                    <div id="dialog-text">{message}</div>
                    <button className={(activeYes)?'btn active':'btn'} onClick= {handleYes}>Yes</button>
                    <button className={(activeYes)?'btn':'btn active'} onClick={handleNo}>No</button>
                </div>
            </div>
        )
    }
}