import {useEffect} from 'react';
import s from './Modal.module.scss';
export default function Modal({onClickCloseModal, modalState, hdImgURL}) {
  useEffect(() => {
    const handlerKeyDownClose = e => {
      if (e.key === 'Escape') {
        onClickCloseModal();
      }
    };
    window.addEventListener('keydown', handlerKeyDownClose);
    return () => {
      window.removeEventListener('keydown', handlerKeyDownClose);
    };
  }, [onClickCloseModal]);

  const handlerClickBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClickCloseModal();
    }
  };

  return (
    <>
      {modalState && (
        <div className={s.overlay} onClick={handlerClickBackdropClose}>
          <div className={s.modal}>
            <img src={hdImgURL} alt="target big" />
          </div>
        </div>
      )}
    </>
  );
}
