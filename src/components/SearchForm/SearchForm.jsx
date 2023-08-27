import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleInput = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      alert('Write some text');
      return;
    }
    onSubmit(query);
  };
  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        onChange={handleInput}
        value={query}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </SearchFormStyled>
  );
};
