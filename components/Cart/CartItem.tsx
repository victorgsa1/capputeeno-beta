import React from "react";
import Link from 'next/link';
import { Flex, Box, Grid, Image, Text, Heading, Button, Icon } from '@chakra-ui/react';

const CartItem = ({ product }) => {
    return (
      <Flex mb='4' alignItems="center" bg='white' borderRadius='xl'>
        <Image src={product.image_url} alt={product.name} w='40%' mr="4" borderLeftRadius='xl'/>
        <Box flex="1">
          <Heading size="md" fontWeight="600" mb="2">
            {product.name}
          </Heading>
          <Text fontSize="lg" fontWeight="500">
            R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </Box>
        <Box>
          <Button
            bg="#115D8C"
            color="white"
            borderRadius="sm"
            size="sm"
            w="120px"
            _hover={{
              bg: 'blue.800',
            }}
          >
            Excluir
          </Button>
        </Box>
      </Flex>
    );
  };

export default CartItem;