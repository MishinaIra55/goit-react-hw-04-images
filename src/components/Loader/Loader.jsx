import { ImSpinner } from 'react-icons/im';

import styles from './Loader.module.css';



export const Loader = () => {
  return (
      <div className={styles.iconLoader}>
        <ImSpinner size='32' />
        Loading...
      </div>
    )

}
