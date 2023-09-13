import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';

const Paginator = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .pagination {
    display: flex;
    list-style: none;
    gap: 2px;
    justify-content: space-between;
    color: #737380;
  }
  .pagination a {
    width: 32px;
    height: 32px;
    display: flex;
    background-color: #E9E9F0;
    border: 1px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
  }
  .pagination a:hover {
    background-color: #e1e1e1;
  }
  .active a{
    background-color: #FFF;
    font-weight: bold;
    border: 1px solid #FFA585;
    color: #FFA585;
  }
  .active a:hover{
    background-color: #FFF;
  }
  .previousNum {
    display: none;
  }
  .nextNum {
    display: none;
  }
  .numbers{
    display: none;
  }
`;
const Paginate = ({ pageCount, currentPageState, handlePageChange, previousClassName, nextClassName, pageClassName }) => {
  return (
    <Paginator>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        pageClassName={pageClassName}
        activeClassName={'active'}
        initialPage={currentPageState}
        previousClassName={previousClassName}
        nextClassName={nextClassName}
      />
    </Paginator>
  );
};
export default Paginate;