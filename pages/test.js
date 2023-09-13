import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Heading, Text, Stack, Image, Button, HStack } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate'

const GET_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      description
      image_url
      category
      price_in_cents
    }
  }
`;

const Test = () => {
  
  const [currentPageState, setCurrentPageState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPageState.toString());
  }, [currentPageState]);

  useEffect(() => {
    const currentPage = parseInt(localStorage.getItem('currentPage')) || 0;
    setCurrentPageState(currentPage);
  }, []);

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const products = data.allProducts;

  const productsPerPage = 12;
  const pageCount = Math.ceil(products.length / productsPerPage);

    const renderProducts = () => {
    const startIndex = currentPageState * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return currentProducts.map((product) => (
      <Box
        key={product.id}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        <Image src={product.image_url} alt={product.name} />
        <Box p="4">
          <Heading size="sm" fontWeight="light" fontFamily='brand' pb='2'>{product.name}</Heading>
          <hr></hr>
          <Text fontSize="md" fontWeight="bold" color="black" pt='2'>
            R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,})}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Categoria: {product.category}
          </Text>
          <Button mt="4" colorScheme="black" size="sm" variant="outline">
            Adicionar ao Carrinho
          </Button>
        </Box>
      </Box>
    ));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPageState(selected);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset a página atual para 0 quando a categoria é alterada
    setCurrentPageState(0);
  };

  return (
    <HStack w="full" justify="center">
     <Stack spacing={4} align="center" maxW='container.xl' px='4'>
      <HStack align="start">
        <Button onClick={() => handleCategoryChange(null)}>Todos</Button>
        <Button onClick={() => handleCategoryChange('mugs')}>Mugs</Button>
        <Button onClick={() => handleCategoryChange('t-shirts')}>T-Shirts</Button>
      </HStack>
      
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridGap="4">
        {renderProducts()}
      </Box>
      
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        initialPage={currentPageState}
      />
    </Stack>
    </HStack>
  );
};

export default Test;
