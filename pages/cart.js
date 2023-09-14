import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import CartItem from '../components/Cart/CartItem';
import Backward from '../components/Backward/Backward';
import { HStack, Flex, Box, Grid, Text } from '@chakra-ui/react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    }
    
  }, []);
  return (
    <>
      <Header />
      <HStack w="full" justify="center" bg="#f0f0f5" pt="8">
        <Flex direction="column" alignItems="flex-start" align='center' w='full' maxW='container.xl'>
          <Link href={`/`}>
            <Flex direction="row" justify="space-between" p="4">
              <Backward />
              <Text ml="2">Voltar</Text>
            </Flex>
          </Link>
          <Flex direction='row' px="4" pt="4">
            <Grid templateColumns={['1fr', '1fr', '1fr', '8fr 4fr']} gap='4'>
              <Box w='full'>
                {cartItems.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </Box>
              <Box bg='white'>
                <Flex direction='column' h='full'>  
                  <Box w='full' >
                  </Box>
                </Flex>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </HStack>
    </>
  );
};

export default Cart;
