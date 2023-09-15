import React, { useState } from 'react';
import { FormControl, Input, InputGroup, InputRightElement, Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export default function Search({ onSearch, onSearchTextChange }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
    onSearch(newText);
  };

  return (
    <FormControl maxW="460px" w="full">
      <InputGroup maxW="460px">
        <InputRightElement pointerEvents="none">
          <Icon fontSize="2xl">
            <FiSearch />
          </Icon>
        </InputRightElement>
        <Input
          type="text"
          focusBorderColor="gray.100"
          variant="filled"
          borderRadius="md"
          placeholder="Procurando por algo específico?"
          _placeholder={{ fontSize: '14px' }}
          value={searchText}
          onChange={(e) => {
            const searchText = e.target.value;
            onSearchTextChange(searchText); 
            onSearch(searchText);
          }}
        />
      </InputGroup>
    </FormControl>
  );
}
