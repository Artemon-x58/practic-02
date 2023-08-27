import { Overlay } from 'components';
import { useEffect } from 'react';

export const Modal = ({ src, alt, closeModal }) => {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      closeModal({ src: '', alt: '' });
    }
  };

  useEffect(() => {
    const handleEscModal = e => {
      if (e.key === 'Escape') {
        closeModal({ src: '', alt: '' });
      }
    };

    window.addEventListener('keydown', handleEscModal);
    return () => window.removeEventListener('keydown', handleEscModal);
  }, [closeModal]);

  return (
    <Overlay onClick={handleClick}>
      <img src={src} alt={alt} />
    </Overlay>
  );
};
