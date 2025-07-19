import React from 'react';
import Modal from 'react-modal';
import s from './modal.module.scss';

Modal.setAppElement('#root');
export default function CustomModal({isOpen, onRequestClose, children}){
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className={s.modal}
            closeTimeoutMS={300}
        >
            {children}
        </Modal>
    )
}