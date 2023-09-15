import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header/Header';
import CartItem from '../components/Cart/CartItem';
import Backward from '../components/Backward/Backward';
import { HStack, Flex, Box, Grid, Text, Heading, Button, Icon } from '@chakra-ui/react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleRemoveItem = (productToRemove) => {
    const updatedCartItems = cartItems.filter((product) => product.id !== productToRemove.id);

    setCartItems(updatedCartItems);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const calculateTotal = (totalFrete) => {
    const subtotal = cartItems.reduce((total, product) => {
      return total + (product.price_in_cents / 100) * product.quantity;
    }, 0);
  
    if (totalFrete) {
      return subtotal + 40;
    }
  
    return subtotal;
  };
  

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart)); }

  return (
    <>
      <Header />
      <HStack w="full" justify="center" overflowY='hidden' pt="8">
        <Flex direction="column" alignItems="flex-start" align='center' w='full' maxW='container.xl'>
          <Link href={`/`}>
            <Flex direction="row" justify="space-between" p="4">
              <Backward />
              <Text ml="2">Voltar</Text>
            </Flex>
          </Link>
          <Flex direction='row' px="4" pt="4">
            <Grid templateColumns={['1fr', '1fr', '1fr', '8fr 4fr']} gap='4'>
              <Flex direction='column' w='full' h='full' maxH='84vh' overflowY='auto'>
                {cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <CartItem key={product.id} product={product} onRemove={() => handleRemoveItem(product)} onUpdateQuantity={handleUpdateQuantity}/>
                  ))
                ) : (
                  <HStack h='full' bg='white' p='16' borderRadius='lg'> 
                    <Heading size={['lg', 'xl']} fontWeight="400" color='#737380'>
                      Seu carrinho está vazio, adicione produtos para visualizar.
                    </Heading>
                  </HStack>
                )}
              </Flex>
              
              <Flex direction='column' h={['85vh', '105vh', '120vh' ,'81vh']} bg='white' p='6'>
                <Flex direction='row' w='full'>
                  <Heading fontSize={['xl']} fontWeight={['semibold']} >RESUMO DO PEDIDO</Heading>
                </Flex>
                <Flex direction='row' fontSize='md' mt='4' justify='space-between'>
                  <Text>Subtotal de produtos</Text>
                  <Text>R$ {calculateTotal(false).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Flex>
                <Flex direction='row' fontSize='md' mt='3' mb='6' justify='space-between'>
                  <Text>Entrega</Text>
                  <Text>R$ 40,00</Text>
                </Flex>
                  <hr></hr>
                <Flex direction='row' fontSize='md' fontWeight='bold' mt='4' justify='space-between'>
                  <Text>Total</Text>
                  <Text>R$ {calculateTotal(true).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </Text>
                </Flex>
                <Flex direction='row' fontSize='md' fontWeight='bold' mt='12' justify='space-between'>
                  <Button 
                    bg='#51B853' 
                    color='white' 
                    borderRadius='md' 
                    size="sm" 
                    variant="solid" 
                    w='full' 
                    alignSelf='flex-end' 
                    mt='auto' 
                    h='12'
                    _hover={{
                        bg: 'green.700',
                      }}
                  >
                    <Text textTransform='uppercase' fontWeight='500' fontSize='16px'>
                        finalizar compra
                    </Text>
                  </Button>
                </Flex>
                <Flex direction='row' alignItems='flex-end' justify='space-between' mt={['80%', '90%']}>
                  <Flex direction='column' color='#737380' fontSize='14px' style={{ textDecoration: "underline" }} cursor='pointer'>
                    <Text>AJUDA</Text>
                    <Text mt='4'>REEMBOLSOS</Text>
                    <Text mt='4'>ENTREGAS E FRETE</Text>
                    <Text mt='4'>TROCAS E DEVOLUÇÕES</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Grid>
          </Flex>
        </Flex>
      </HStack>
    </>
  );
};

export default Cart;
