import styles from './Button.module.css';
import PropTypes from 'prop-types';

export  function Button ({ load }) {
  return(
    <button className={styles.Button} type='button' onClick={() => load()}>Load more</button>
  )
}
Button.propTypes = {
  load: PropTypes.func.isRequired,
}
