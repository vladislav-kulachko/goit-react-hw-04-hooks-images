import {useEffect} from 'react';
import s from './ImageGallery.module.scss';
import {toast, Flip} from 'react-toastify';
import Spinner from '../Loader/Loader';

export default function ImageGallery({query, status, children}) {
  useEffect(() => {
    if (status === 'rejected') {
      toast.error(`No (more) image found for ${query}`, {
        theme: 'colored',
        position: 'bottom-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 2,
      });
    }
  });

  return (
    <ul className={s.gallery}>
      {status === 'idle' && (
        <li className={s.message}>PLease, start image search! </li>
      )}
      {status === 'pending' && (
        <>
          <li className={s.message}>loading..., please wait</li> <Spinner />
        </>
      )}
      {children}
    </ul>
  );
}
