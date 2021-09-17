import {useState, useEffect} from 'react';
import './App.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Fuse from './components/Fuse/Fuse';
import Modal from './components/Modal/Modal';
import fetchImagesQuery from '../src/Api/Api';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [modalState, setModalState] = useState(false);
  const [hdImgURL, setHdImgURL] = useState('');

  // const useIsMount = () => {
  //   const isMountRef = useRef(true);
  //   useEffect(() => {
  //     isMountRef.current = false;
  //   }, []);
  //   return isMountRef.current;
  // };

  useEffect(() => {
    (async () => {
      try {
        if (query !== '' || null) {
          const fetchedImages = await fetchImagesQuery(query, page);
          setImages(s => [...s, ...fetchedImages]);
          if (fetchedImages.length >= 12) {
            setStatus('resolved');
          } else {
            setStatus('rejected');
            setTimeout(() => setStatus('idle'), 5000);
          }
          if (page === 1) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          } else {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        }
      } catch {
        setStatus('rejected');
        setTimeout(() => setStatus('idle'), 5000);
      }
    })();
  }, [page, query]);

  const handlerQueryUpdate = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPage(1);
      setStatus('pending');
      setImages([]);
    }
  };
  const handlerPageIncrement = () => {
    setPage(s => s + 1);
    setStatus('pending');
  };
  const isOpenModal = () => {
    setModalState(true);
  };
  const isCloseModal = () => {
    setModalState(false);
  };
  const handlerBigImageUrl = e => {
    setHdImgURL(e.target.dataset.src);
  };

  return (
    <>
      <Searchbar onQueryUpdate={handlerQueryUpdate}></Searchbar>
      <Fuse>
        <ImageGallery status={status} query={query}>
          <ImageGalleryItem
            images={images}
            onClickOpenModal={isOpenModal}
            handlerBigImageUrl={handlerBigImageUrl}
          ></ImageGalleryItem>
        </ImageGallery>
      </Fuse>
      <Button
        status={status}
        handlerPageIncrement={handlerPageIncrement}
      ></Button>
      <Modal
        onClickCloseModal={isCloseModal}
        modalState={modalState}
        hdImgURL={hdImgURL}
      ></Modal>
      <ToastContainer style={{width: 'inherit'}}></ToastContainer>
    </>
  );
}
