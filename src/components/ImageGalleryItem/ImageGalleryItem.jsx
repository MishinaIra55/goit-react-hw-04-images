
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image: { webformatURL, largeImageURL }, modalitem, getUrl}) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={() => modalitem()} >
      <img className={styles['ImageGalleryItem-image']} src={webformatURL } alt="" onClick={()=> getUrl(largeImageURL)}/>
    </li>
  )
}

ImageGalleryItem.proTypes = {
  modalitem: PropTypes.func,
  getUrl:PropTypes.func,
}
