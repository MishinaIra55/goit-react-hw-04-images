import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    //проверка чтобы не отправлять форму пустую
    if (search.trim() === '') {
      toast.error('Введите ваш запрос');
      return;
    }
    onSubmit(search);
    setSearch( '');
}

  const handleSearch = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.searchForminput}
          type='text'
           autoComplete="off"
          autoFocus
          placeholder='Search images and photos'
          value={search}
          onChange={handleSearch}

        />

        <button type='submit' className={styles.searchFormbutton}>
          <span className={styles.searchFormbuttonlabel}>Search</span>
          <ImSearch />
        </button>
      </form>

    </header>
  );

}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }
