// import { useEffect, useState } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { fetchAxiosGallery } from '../services/pixibay-api';
// import PropTypes from 'prop-types';
//
// import styles from './GalleryForm.module.css';
// import { Loader } from './Loader/Loader';
// import ErrorData from './ErrorData/ErrorData';
//
// export const GalleryForm = ({ openModal, getUrl, searchData }) => {
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState('');
//   const [status, setStatus] = useState('idle');
//   const [page, setPage] = useState(1);

  // useEffect(() => {
  //   if (searchData.length > 0) {
  //     getImages(searchData).then((result) => {
  //       try {
  //         setImages([...result]);
  //         setPage(1);
  //       } catch (error) {
  //         setError(`нет картинки ${searchData}`);
  //       }
  //     });
  //   }
  //
  // }, [searchData]);
  //
  //
  // useEffect(() => {
  //   if (page > 1) {
  //     getImages(searchData, page).then(newData => {
  //       setImages(prev => [...prev, ...newData]);
  //     });
  //   }
  //
  // }, [page]);
  //
  // const getImages = async (search, page = 1) => {
  //   setStatus('pending');
  //   try {
  //     const response = await fetchAxiosGallery(search, page);
  //     // console.log(response);
  //     const newData = response.hits.map(({ id, webformatURL, largeImageURL }) => {
  //       return {
  //         id, webformatURL, largeImageURL,
  //       };
  //     });
  //
  //     setStatus('idle');
  //
  //     if (response.hits.length === 0) {
  //       setImages([]);
  //       throw new Error('Try again, the search is not correct');
  //     }
  //
  //     return newData;
  //
  //   } catch (error) {
  //     setError(`нет картинки ${searchData}`);
  //     setStatus('rejected');
  //   }
  // };
  //
  // const onLoadMore = () => {
  //   setPage(page + 1);
  // };


//   return (
//     <>
//       {(status === 'idle' && images.length === 0) && <div className={styles.text}>Введите ваш запрос поиска</div>}
//       {status === 'rejected' && <ErrorData message={error} />}
//       {status === 'pending' && <Loader />}
//       {images.length > 0 &&
//         <ImageGallery
//           images={images}
//           modalclick={openModal}
//           getUrl={getUrl}
//           status={status}
//           load={onLoadMore}
//         />
//       }
//
//     </>
//   );
// };
//
// GalleryForm.propTypes = {
//   searchData: PropTypes.string.isRequired,
//   openModal: PropTypes.func.isRequired,
//   getUrl: PropTypes.func.isRequired,
// };
