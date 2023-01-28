// import React, { Component } from 'react';
//
// import { Searchbar } from './Searchbar/Searchbar';
//
// import { ToastContainer } from 'react-toastify';
//
// import { GalleryForm } from './GalleryForm';
//
// import { Modal } from './Modal/Modal';
//
//
//
// export class App extends Component {
//
//   state = {
//     search: '',
//     showModal: false,
//     largeImage: ''
//
//   };
//
//   handleSearchbar = search => {
//     this.setState( { search });
//   };
//
//   //переключение модалки
//   toggleModal = () => {
//     this.setState((state) => (
//         {
//           showModal: !state.showModal
//         }
//       )
//     )
// };
//
//   getLargeImage = (imageURL) => {
//   this.setState((state) => (
//     {
//       largeImage: imageURL
//     }
//     )
//   )
// }
//   render() {
//     const {search, showModal, largeImage } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit ={this.handleSearchbar}/>
//         <GalleryForm searchData={search} openModal={this.toggleModal} getUrl={this.getLargeImage}/>
//         <ToastContainer autoClose={2000}/>
//
//         {showModal && (
//         <Modal onClose={this.toggleModal}>
//           <img src={largeImage} alt="" className="Modal-image" />
//         </Modal>
//         )}
//       </>
//     )
//   }
//   }
//


import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryForm } from './GalleryForm';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';
import { fetchAxiosGallery } from 'services/pixibay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';


export const App = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (search = '', page = 1) => {
      setStatus('pending');

      try {
        const response = await fetchAxiosGallery(search, page);
        // console.log(response);
        const newData = response.hits.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id, webformatURL, largeImageURL,
          };
        });

        setStatus('idle');

        if (response.hits.length === 0) {
          // setImages([]);
          throw new Error('Try again, the search is not correct');
        }

        return newData;

      } catch (error) {
        setError(`нет картинки ${search}`);
        setStatus('rejected');
      }
    };

    if (!search) {
      return;
    }

    fetchData( search, page)
      .then((data) => {
        setImages(prevState => [...prevState, ...data])
    })

  }, [page, search]);


  const handleSearchbar = search => {
    if (!search) {
      throw new Error('Please enter key word');
    }
    setSearch(search);
  };


  //переключение модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const getLargeImage = (imageURL) => {
    setLargeImage(imageURL);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchbar} />
      {images.length > 0 &&
        <ImageGallery
          images={images}
          // modalclick={openModal}
          //  getUrl={getUrl}
          //  status={status}
          load={onLoadMore}
        />
      }
      {/*<GalleryForm searchData={search} openModal={toggleModal} getUrl={getLargeImage} />*/}
      <ToastContainer autoClose={2000} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt='' className='Modal-image' />
        </Modal>
      )}
    </>
  );
};


