import { useEffect, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    ImageService.getImages(query, page);
  }, [query, page]);

  const onSubmit = newQuery => {
    setQuery(newQuery);
    console.log(newQuery);
  };
  return (
    <>
      <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      <SearchForm onSubmit={onSubmit} />
    </>
  );
};
