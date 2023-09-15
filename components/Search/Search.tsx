import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Heading, Input, List, ListItem, Image, InputGroup, InputRightElement, Icon, Text, Box, Flex } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';

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
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a exibição do componente de pesquisa
  const searchRef = useRef(null); // Referência ao elemento de pesquisa

  useEffect(() => {
    // Adicione um ouvinte de eventos de clique ao documento para fechar o componente de pesquisa quando o usuário clicar fora dele
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false); // Fecha o componente de pesquisa
        setSearchTerm(''); // Limpa o texto de pesquisa
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao buscar produtos.</p>;

  const filteredProducts = data.allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <FormControl maxW="460px" w="full" ref={searchRef}>
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
            onFocus={() => setIsOpen(true)} // Abre o componente de pesquisa ao receber foco
          />
        </InputGroup>
        {isOpen && searchTerm.length > 0 && (
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
                <Link href={`/product/${product.id}`} key={product.id}>
                  <ListItem key={product.id} p='4' _hover={{ bg: 'gray.100' }}>
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
                </Link>
              ))}
            </List>
          </Box>
        )}
      </FormControl>
  );
}
