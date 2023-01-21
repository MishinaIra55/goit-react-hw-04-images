import errorImage from './1200px-Error.svg.png';
import PropTypes from 'prop-types';


export default function ErrorData ( { message }) {
  return (
    <div>
      <img src={errorImage} width= '240' alt='error'/>
      { message }
    </div>
  );
}

ErrorData.propTypes = {
  message: PropTypes.string.isRequired,
}
