import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className='ui active dimmer'>
            <div onClick={e => e.stopPropagation()} className='ui active modal'>
                <div className='header'>{props.title}</div>
                <div className='content'>{props.content}</div>
                <div className='actions'>{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal') // this is the second argument for ReactDOM.createPortal
        // need to make sure this component exists in the index.html file
    );
};

export default Modal;