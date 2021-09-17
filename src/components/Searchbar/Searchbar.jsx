import {useState} from 'react';
import s from './Searchbar.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import {toast, Flip} from 'react-toastify';

export default function Searchbar({onQueryUpdate}) {
  const [query, setQuery] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.info('Please enter at least a couple of letters:)', {
        theme: 'colored',
        position: 'bottom-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 1,
      });
    } else {
      onQueryUpdate(query);
    }
    setQuery('');
  };
  const inputHandler = e => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={submitHandler}>
        <button type="submit" className={s.button}>
          <SearchIcon style={{fontSize: 36, color: '#3f51b5'}}></SearchIcon>
        </button>
        <input
          onChange={inputHandler}
          value={query}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
