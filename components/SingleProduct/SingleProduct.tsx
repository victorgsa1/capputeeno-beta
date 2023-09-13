import React from 'react';
import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';

function SingleProduct({ product }) {
  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image_url} alt={product.name} />

      <Box p="4">
        <Heading size="md" fontFamily="brand" fontWeight="light" pb="2">
          {product.name}
        </Heading>
        <hr />
        <Text fontSize="md" fontWeight="bold" color="black" pt="2">
          R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Categoria: {product.category}
        </Text>
        <Text fontSize="sm" color="gray.500" mt="2">
          Descrição: {product.description}
        </Text>
        <Button mt="4" colorScheme="black" size="sm" variant="outline">
          Adicionar ao Carrinho
        </Button>
      </Box>
    </Box>
  );
}

export default SingleProduct;