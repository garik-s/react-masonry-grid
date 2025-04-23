import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../hooks/useDebounce';

const SearchInput = styled.input`
  width: 420px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;

  &:focus {
    border-color: #007aff;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedQuery: string = useDebounce(inputValue.trim(), 1000);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);


  return (
    <SearchInput
      type="text"
      placeholder="Search photos..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
