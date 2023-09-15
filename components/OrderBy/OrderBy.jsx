import React, { useState } from 'react';
import { Select, Box } from "@chakra-ui/react";
import styled from "styled-components";

const StyledSelectContainer = styled(Box)`
  position: relative;
  z-index: 0 !important;

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  select {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
`;

const sortOptions = [
  { value: 'news', label: 'Novidades' },
  { value: 'price_high_low', label: 'Preço Maior - Menor' },
  { value: 'price_low_high', label: 'Preço Menor - Maior' },
  { value: 'best_sellers', label: 'Mais vendidos' },
];

const OrderBy = ({ selectedSort, setSelectedSort, products, setSortedProducts }) => {
  const handleSortChange = (value) => {
    setSelectedSort(value);
  
    if (value === 'price_high_low') {
      const sortedProducts = products.slice().sort((a, b) => b.price_in_cents - a.price_in_cents);
      setSortedProducts(sortedProducts);
    }
    else if (value === 'price_low_high') {
      const sortedProducts = products.slice().sort((a, b) => a.price_in_cents - b.price_in_cents);
      setSortedProducts(sortedProducts);
    }
  };

  return (
    <StyledSelectContainer>
      <label htmlFor="sortSelect">Organizar por</label>
      <Select
        id="sortSelect"
        variant="unstyled"
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value)}
        mr="-10"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </StyledSelectContainer>
  );
};

export default OrderBy;
