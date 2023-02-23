import { useEffect } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root');

export const Modal = ({largeImageURL, toggleModal, closeModal, children}) => {

useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
    window.removeEventListener('keydown', handleKeyDown)
    }
})

function handleKeyDown(e) {
    if (e.code === 'Escape') {
    closeModal();
    }
};

    return createPortal(
    <>
    <div
    className={styles.overlay}
    onClick={e => {
    e.target === e.currentTarget && toggleModal(e);
    }}
    >
        <div className={styles.modal}>{children}</div>
    </div>
    </>,
    modalRoot
    );
}


Modal.propTypes = {
children: PropTypes.node.isRequired,
toggleModal: PropTypes.func.isRequired,
closeModal: PropTypes.func.isRequired,
};