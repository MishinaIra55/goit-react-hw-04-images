import { Component } from 'react';
import styles from './Searchbar.module.css';

import { ImSearch } from "react-icons/im";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    search: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  //меняю состояние с inputa
  handleSearch = event => {
    this.setState( {search: event.currentTarget.value.toLowerCase()});
  };

  handleSubmit = event => {
    const {search } = this.state;
    event.preventDefault();

    //проверка чтобы не отправлять форму пустую
    if (search.trim() === '') {
      toast.error('Введите ваш запрос');
      return;
    }

    this.props.onSubmit(search);
    this.setState({ search: ''});//вызов props s app
}
  render() {
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={styles.searchForminput}
            type="text"
            // autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={this.handleSearch}

          />

          <button type="submit" className={styles.searchFormbutton}>
            <span className={styles.searchFormbuttonlabel}>Search</span>
            <ImSearch/>
          </button>
        </form>

      </header>
    );
  }
}

