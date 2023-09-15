import React, { useState } from 'react';
import { FormControl, Heading, Input, List, ListItem, Image, InputGroup, InputRightElement, Icon, Text, Box, Flex } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

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

export default function Search() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao buscar produtos.</p>;

  const filteredProducts = data.allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormControl maxW="460px" w="full">
      <InputGroup maxW="460px">
        <InputRightElement pointerEvents='none'>
          <Icon fontSize='2xl'>
            <FiSearch/>
          </Icon>
        </InputRightElement>
        <Input 
          type='text' 
          focusBorderColor='gray.100'
          variant='filled'
          borderRadius="md"
          placeholder='Procurando por algo específico?'
          _placeholder={{ fontSize: "14px",}} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </InputGroup>
        {searchTerm.length > 0 && (
        <Box bg='white' position='absolute' zIndex='1' >
          <List
            borderRadius="lg" 
            w='100vw'
            maxW="460px"
            h='full'
            maxH='48vh'
            overflowY='auto'
            mt='2'
            borderWidth="1px"
            borderColor="gray.200"
          >
            {filteredProducts.map((product) => (
              <ListItem key={product.id} p='4'>
                <Flex direction='row' alignItems='center'>
                  <Image src={product.image_url} alt={product.name} w='32' h='32' borderRadius='md'/>
                  <Flex direction='column' alignItems='start' ml='4'>
                    <Heading as="h3" size="md">
                      {product.name}
                    </Heading>
                    <Text>
                      R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
        )}
    </FormControl>
  )
}
