import { useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isError, setIsError] = useState('');
  useEffect(() => {
    if (!query) return;
    ImageService.getImages(query, page)
      .then(({ photos, total_results }) => {
        if (!total_results) {
          setIsEmpty(true);
          return;
        }
        setIsLoadMore(page < Math.ceil(total_results / 15));
        setPhotos(prevState => [...prevState, ...photos]);
      })
      .catch(error => setIsError(error.messege));
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
  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <Grid>
        {photos.map(photo => (
          <GridItem key={photo.id}>
            <CardItem color={photo.avg_color}>
              <img src={photo.src.large} alt={photo.alt} />
            </CardItem>
          </GridItem>
        ))}
      </Grid>
      {isLoadMore && <Button onClick={handleLoadMore}>Load More</Button>}

      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
      {isError && <Text textAlign="center">Sorry. {isError}</Text>}
    </>
  );
};
