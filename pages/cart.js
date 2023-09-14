import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import { FiShoppingBag } from 'react-icons/fi';
import { Flex, Box, Grid, Text } from '@chakra-ui/react';
import CartItem from '../components/Cart/CartItem';

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
      <Flex w="full" justify="center" bg="#f0f0f5" pt="8">
        <Flex direction="column" alignItems="flex-start" maxW="container.xl" px="4">
          <Link href={`/`}>
            <Flex direction="row" justify="space-between" p="4">
              <Box as={FiShoppingBag} fontSize="20px" />
              <Text ml="2">Voltar</Text>
            </Flex>
          </Link>
          <Flex px="4" pt="4">
            <Grid templateColumns="8fr 4fr" gap={4} w="full">
              <Box>
                {cartItems.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </Box>
              <Box>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Cart;
