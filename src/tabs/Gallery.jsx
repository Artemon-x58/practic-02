import { useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
  Modal,
} from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    ImageService.getImages(query, page)
      .then(({ photos, total_results }) => {
        if (!total_results) {
          setIsEmpty(true);
          return;
        }
        setIsLoadMore(page < Math.ceil(total_results / 15));
        setPhotos(prevState => [...prevState, ...photos]);
      })
      .catch(error => setIsError(error.messege))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const onSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
    setIsEmpty(false);
    setIsLoadMore(false);
    setIsError('');
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = ({ src, alt }) => {
    setModalSrc(src);
    setModalAlt(alt);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Grid>
        {photos.map(photo => (
          <GridItem key={photo.id}>
            <CardItem color={photo.avg_color}>
              <img
                src={photo.src.large}
                alt={photo.alt}
                onClick={() => {
                  openModal({ src: photo.src.large, alt: photo.alt });
                }}
              />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {isLoadMore && <Button onClick={handleLoadMore}>Load More</Button>}

      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {isError && <Text textAlign="center">Sorry. {isError}</Text>}
      {isLoading && <Loader />}
      {modalSrc && (
        <Modal src={modalSrc} alt={modalAlt} closeModal={openModal} />
      )}
    </>
  );
};
