import React from "react";
import Link from 'next/link';
import { Flex, Box, Grid, Image, Text, Heading, Button, Icon, Select, HStack, MenuOptionGroup } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi'



const CartItem = ({ product, onRemove }) => {
  const handleRemove = () => {
    onRemove(product);
  };
  return (
    <Flex mb='6' bg='white' borderRadius='xl' direction='row'>
      <HStack>
        <Image src={product.image_url} alt={product.name} w='40%' borderLeftRadius='xl'/>
        <HStack h='full' ml='4'> 
          <Flex direction='column' h='full' >
            <Flex direction='row' mt='6' justify='space-between'>
              <Heading size={['sm', 'lg']} fontWeight="300" color='gray.800'>
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
              <Select w='5vw' h='5vh' bg='#F3F5F6' alignItems='flex-end'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
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