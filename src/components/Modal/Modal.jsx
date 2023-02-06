import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children,onClose }) => {

  useEffect(() => {
    const handleKeyClose = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyClose);

    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  }, [onClose]);

  const handleCloseBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
      <div className={styles.overlay} onClick={handleCloseBackdrop}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );

  }

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
  }
