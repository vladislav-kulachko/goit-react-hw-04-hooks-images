import s from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  images,
  onClickOpenModal,
  handlerBigImageUrl,
}) {
  const onOpenModal = e => {
    onClickOpenModal();
    handlerBigImageUrl(e);
  };

  return (
    <>
      {images.length >= 1 &&
        images.map(({id, webformatURL, largeImageURL, tags}, i) => (
          <li key={i} id={id} className={s.item} onClick={onOpenModal}>
            <img
              src={webformatURL}
              data-src={largeImageURL}
              alt={tags}
              className={s.image}
            />
          </li>
        ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};
