import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Flex, Box, Grid, Image, Text, Heading, Button, Icon, Select, HStack, MenuOptionGroup } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi'
import { useCart } from "./CartContext";

const CartItem = ({ product, onRemove, onUpdateQuantity}) => {
  const { updateHeader, updateCartItemCount, cartItemCount, setCartItemCount, } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleRemove = () => {
    onRemove(product);
    updateHeader();
    updateCartItemCount(cartItemCount - product.quantity);
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
    }
  }, [product.id]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  
    onUpdateQuantity(product.id, newQuantity);

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = existingCart.map((item) => {
      if (item.id === product.id) {
        item.quantity = newQuantity;
      }
      return item;
    });
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };  

  return (
    <Flex mb='6' bg='white' borderRadius='xl' direction='row'>
      <HStack>
        <Image src={product.image_url} alt={product.name} w='40%' borderLeftRadius='xl'/>
        <HStack h='full' ml='4'> 
          <Flex direction='column' h='full' >
            <Flex direction='row' mt='6' justify='space-between'>
              <Heading size={['xs', 'lg']} fontWeight="300" color='gray.800'>
                {product.name}
              </Heading>
              <Icon fontSize={['xl', '2xl']} color='red' alignSelf='center' mr='4' cursor='pointer' onClick={handleRemove}>
                <FiTrash2 />
              </Icon>
            </Flex>
              <Text fontSize="md" w='95%' maxH='50%' color="gray.500" pt='8' display={['none', 'block']}>
                {product.description}
              </Text>
            <Flex direction='row' alignItems='flex-end' justify='space-between' mt='6'>
              <Select w={['20vw', '5vw']} h={['3vh','5vh']} bg='#F3F5F6' alignItems='flex-end' value={quantity} onChange={handleQuantityChange}>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Select>
              <Text fontSize={['sm', 'lg', 'xl']} fontWeight="600" color="black" mr='4'>
                R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              </Text>
            </Flex> 
          </Flex>
          <Flex mt='auto'></Flex>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default CartItem;