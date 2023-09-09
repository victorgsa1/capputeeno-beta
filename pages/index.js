import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Heading, Text, Stack, Image, Button } from '@chakra-ui/react';

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

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const products = data.allProducts;

  return (
    <Stack spacing={4} align="center">
      {products.map((product) => (
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
            <Heading size="md">{product.name}</Heading>
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              R$ {product.price_in_cents / 100}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Categoria: {product.category}
            </Text>
            <Button mt="4" colorScheme="teal" size="sm" variant="outline">
              Adicionar ao Carrinho
            </Button>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default Home;
