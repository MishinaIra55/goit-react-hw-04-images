// import { Component } from 'react';
//
//
// import ErrorData from './ErrorData/ErrorData';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import {fetchAxiosGallery} from '../services/pixibay-api';
//
// import styles from './GalleryForm.module.css';
// import PropTypes from 'prop-types';
//
//
// export class GalleryForm extends Component {
//
//   state = {
//     images: [],
//     error: '',
//     status: 'idle',
//     page: 1
//   };
//
//   static propTypes = {
//     searchData: PropTypes.string.isRequired,
//     openModal: PropTypes.func.isRequired,
//     getUrl: PropTypes.func.isRequired,
//   }
//
//   async componentDidUpdate(prevProps, prevState, snapshot) {
//     if (prevProps.searchData !== this.props.searchData || prevState.page !== this.state.page) {
//       this.setState({ status: 'pending' });
//
//       if (prevProps.searchData !== this.props.searchData && this.state.images.length > 0) {
//         this.setState({
//           images: [],
//           page: 1
//         })
//         return;
//       }
//
//       try {
//         const response = await fetchAxiosGallery(this.props.searchData,this.state.page);
//         this.setState(({images}) => {
//           const newData = response.hits.map(({ id, webformatURL, largeImageURL }) => {
//             return {
//               id, webformatURL, largeImageURL
//             }
//
//           })
//
//           return {
//             images: [...images, ...newData],
//             status: 'idle'
//           }
//         });
//
//         if (response.hits.length === 0) {
//           throw  new SyntaxError('Try again, the search is not correct');
//         }
//
//       } catch (error) {
//         this.setState({ error: `нет картинки ${this.props.searchData}`, status: 'rejected' });
//       }
//     }
//   }
//
//   onLoadMore =() => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   }
//
//   render() {
//     const { images, error, status, page } = this.state;
//
//     if (status === 'idle' && images.length === 0) {
//       return <div className={styles.text}>Введите ваш запрос поиска</div>;
//     }
//
//     if (status === 'pending' && page === 1) {
//       return <Loader/>
//     }
//
//     if (status === 'rejected') {
//       return <ErrorData message={ error} /> ;
//     }
//
//     return (<>
//       <ImageGallery
//         images={images}
//         modalclick={this.props.openModal}
//         getUrl={this.props.getUrl}
//         status={status}
//         load={this.onLoadMore}
//       />
//     </>)
//
//   }
// }


import { useEffect,  useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchAxiosGallery } from '../services/pixibay-api';

import styles from './GalleryForm.module.css';
import { Loader } from './Loader/Loader';
import ErrorData from './ErrorData/ErrorData';

export const GalleryForm = ({ openModal, getUrl, searchData }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);




  useEffect(()=> {
    console.log('sdf');
    if(images.length > 0) {
      console.log('change search');
      setImages([]);
      setPage(1);
    }
    },[searchData]);


  useEffect(() => {
    if (searchData.length > 0) {
      getImages();
    }
  }, [searchData]);

  useEffect(() => {
    console.log('change page');
    if (searchData.length > 0 && page > 1) {
      getImages();
    }
  }, [page])



  const getImages = async () => {
    setStatus('pending');
    try {
      const response = await fetchAxiosGallery(searchData, page);
      // console.log(response);
      const newData = response.hits.map(({ id, webformatURL, largeImageURL }) => {
            return {
              id, webformatURL, largeImageURL
            }
      })

      setImages([...images, ...newData]);
      setStatus('idle');


      if (response.hits.length === 0) {
          throw new SyntaxError('Try again, the search is not correct');
        }

    } catch (error) {
      setError(  `нет картинки ${searchData}`);
      setStatus('rejected');
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

//     if (status === 'rejected') {
//       return <ErrorData message={ error} /> ;
//     }

  return (
    <>
      {(status === 'idle' && images.length === 0) && <div className={styles.text}>Введите ваш запрос поиска</div> }
      {status === 'rejected' && <ErrorData message={ error}/> }
      {status === 'pending' && <Loader/>}
      {images.length > 0 &&
        <ImageGallery
          images={images}
          modalclick={openModal}
          getUrl={getUrl}
          status={status}
          load={onLoadMore}
        />
      }

    </>
  );
};


