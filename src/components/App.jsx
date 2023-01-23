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


import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { GalleryForm } from './GalleryForm';
import { ToastContainer } from 'react-toastify';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');


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
