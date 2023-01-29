

import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { fetchAxiosGallery } from 'services/pixibay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import styles from 'styles.css/styles.module.css';
import ErrorData from './ErrorData/ErrorData';
import { Loader } from './Loader/Loader';



export const App = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);



  const fetchData = async (search, page = 1) => {
      setStatus('pending');

      try {
        // setStatus('pending');
        const response = await fetchAxiosGallery(search, page);

        const newData = response.hits.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id, webformatURL, largeImageURL,
          };
        });
        setStatus('idle');

        if (response.hits.length === 0) {
          setImages([]);
          throw new Error('Try again, the search is not correct');
        }
        console.log(newData);
         setImages(prevState => [...prevState, ...newData]);

      } catch (error) {
        setError(`нет картинки ${search}`);
        setStatus('rejected');
      }
    };



  useEffect(()=> {
    if (!search) {
      return;
    }
    fetchData( search, page);
  },[search,page]);


  const handleSearchbar = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };


  //переключение модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const getLargeImage = (imageURL) => {
    setLargeImage(imageURL);
  };

  const onLoadMore = () => {
    setPage(prevState=> prevState + 1);
  };

  return (
    <>

      <Searchbar onSubmit={handleSearchbar} />
      {(status === 'idle' && images.length === 0) && <div className={styles.text}>Введите ваш запрос поиска</div>}
      {status === 'rejected' && <ErrorData message={error}/>}

      {status === 'pending' && <Loader/>}

      {images.length > 0 &&
        <ImageGallery
          images={images}
           modalclick={toggleModal}
           getUrl={getLargeImage}
           status={status}
          load={onLoadMore}
        />
      }
      <ToastContainer autoClose={2000} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt='' className='Modal-image' />
        </Modal>
      )}
    </>
  );
};


