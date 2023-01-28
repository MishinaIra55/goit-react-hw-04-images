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


export const App = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(()=> {
    const fetchData = async ({search, page}) => {
      setStatus('pending');

      try {
        const response = await fetchAxiosGallery ({search, page}) ;
        handleResolve(response);
      }catch (error) {
      setStatus('rejected');
      console.log(error);
      }
    };

      const handleResolve = ({ hits, total, totalHits }) => {
        const sortedImages = hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );

        if (!total) {
          alert(
            'Sorry, there are no images matching your search, please try another key word'
          );
          setStatus('idle');
          return;
        }

        if (totalHits < page * 12) {
          setImages(prevState => [...prevState, ...sortedImages]);
          setStatus('idle');
          alert(
            "We're sorry, but you've reached the end of search results"
          );
          return;
        }

        setImages(prevState => [...prevState, ...sortedImages]);
        setStatus('success');

        if (page === 1) {
          alert(`That's what we found`);
        }
      };

    if (!search) {
      return;
    }

    fetchData({ page, search });
  }, [page, search]);


  const handleSearchbar = search => {
    setSearch(search);

  };


  //переключение модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const getLargeImage = (imageURL) => {
    setLargeImage(imageURL);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchbar} />
      <GalleryForm searchData={search} openModal={toggleModal} getUrl={getLargeImage} />
      <ToastContainer autoClose={2000} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt='' className='Modal-image' />
        </Modal>
      )}
    </>
  );
};
