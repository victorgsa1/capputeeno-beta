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

const OrderBy = ({ selectedSort, setSelectedSort }) => {
  return (
    <StyledSelectContainer >
      <label htmlFor="sortSelect">Organizar por</label>
      <Select
        id="sortSelect"
        variant="unstyled"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
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
