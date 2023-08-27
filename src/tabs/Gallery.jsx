import { useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!query) return;
    ImageService.getImages(query, page).then(({ photos, total_results }) => {
      if (!total_results) {
        setIsEmpty(true);
        return;
      }
      setPhotos(prevState => [...prevState, ...photos]);
    });
  }, [query, page]);

  const onSubmit = newQuery => {
    setQuery(newQuery);
    console.log(newQuery);
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
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
