import axios from 'axios';

import PropTypes from 'prop-types';



  export const fetchAxiosGallery = async (searchData, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchData}&page=${page}&key=31487728-a23d010ad4dc914c660c439a4&image_type=photo&orientation=horizontal&per_page=12`);
        return response.data;
  };



fetchAxiosGallery.propTypes = {
  searchData: PropTypes.string.isRequired,
  page :PropTypes.number.isRequired
}
