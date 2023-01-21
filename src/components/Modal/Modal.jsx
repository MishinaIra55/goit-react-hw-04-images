import styles from './Modal.module.css';
import { Component } from 'react';

import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
  }


  componentDidMount() {
    window.addEventListener('keydown',this.handleKeyClose );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown',this.handleKeyClose );
  }

  handleKeyClose  = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseBackdrop  = event => {
     if (event.currentTarget === event.target) {
       this.props.onClose();
     }
   };

  render() {
    const { children } =this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.handleCloseBackdrop}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );

  }
}

