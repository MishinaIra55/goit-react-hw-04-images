import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';


export  const ImageGallery = ({ images, modalclick, getUrl, status, load}) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        { images.map(item => {
          return (
            <ImageGalleryItem key={item.id} image={item} modalitem={modalclick} getUrl={getUrl}/>
          )
        })}
      </ul>
      {status === 'pending'
        ? <Loader/>
        : <Button load={load}/>
      }
    </>
  )
}

ImageGallery.proTypes = {
  images: PropTypes.array.isRequired,
  modalclick: PropTypes.func.isRequired,
  getUrl: PropTypes.func.isRequired,
  status:PropTypes.string.isRequired,
  load:PropTypes.func.isRequired,
}
