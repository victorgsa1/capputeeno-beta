import React from "react";
import Link from 'next/link';
import { Flex, Box, Grid, Image, Text, Heading, Button, Icon, Select, HStack } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi'

const CartItem = ({ product }) => {
  return (
    <Flex mb='4' bg='white' borderRadius='xl' direction='row'>
      <HStack>
        <Image src={product.image_url} alt={product.name} w='40%' borderLeftRadius='xl'/>
        <HStack h='full' ml='4'> 
          <Flex direction='column' h='full' justify='space-between'>
            <Flex direction='row'>
              <Heading size={['sm', 'lg']} fontWeight="300" color='gray.800'>
                {product.name}
              </Heading>
              <Icon fontSize={['xl', '2xl']} color='red' alignSelf='center' mr='4'>
                <FiTrash2 />
              </Icon>
            </Flex>
            <Text fontSize="md" w='95%' color="gray.500" pt='8' display={['none', 'block']}>
              {product.description}
            </Text>
            <Flex direction='row' justify='space-between'>
              <Select w='5vw' h='5vh' bg='#F3F5F6'></Select>
              <Text fontSize={['sm', 'lg', 'xl']} fontWeight="600" color="black" mr='4'>
                R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              </Text>
            </Flex> 
          </Flex>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default CartItem;