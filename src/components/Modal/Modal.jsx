// import styles from './Modal.module.css';
// import { Component } from 'react';
//
// import {createPortal} from 'react-dom';
// import PropTypes from 'prop-types';
//
//
// const modalRoot = document.querySelector('#modal-root');
//
// export class Modal extends Component {
//
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.any.isRequired,
//   }
//
//
//   componentDidMount() {
//     window.addEventListener('keydown',this.handleKeyClose );
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('keydown',this.handleKeyClose );
//   }
//
//   handleKeyClose  = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//
//   handleCloseBackdrop  = event => {
//      if (event.currentTarget === event.target) {
//        this.props.onClose();
//      }
//    };
//
//   render() {
//     const { children } =this.props;
//     return createPortal(
//       <div className={styles.overlay} onClick={this.handleCloseBackdrop}>
//         <div className={styles.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//
//   }
// }
//

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
