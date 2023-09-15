import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Heading, Text, Stack, Image, Button, HStack, Flex} from '@chakra-ui/react';
import OrderBy from '@/components/OrderBy/OrderBy';
import Paginate from '@/components/Paginate/Paginate';
import Link from 'next/link';
import { useCart } from '../components/Cart/CartContext';

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

const Test = () => {
  
  const { cartItemCount, setCartItemCount } = useCart();

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productId = product.id;
  
    const existingCartItem = existingCart.find((item) => item.id === productId);
  
    if (existingCartItem) {
      existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      existingCart.push(productWithQuantity);
    }
  
    localStorage.setItem('cart', JSON.stringify(existingCart));
  
    setCartItemCount(existingCart.length);
  };
  

  const [currentPageState, setCurrentPageState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPageState.toString());
  }, [currentPageState]);

  useEffect(() => {
    const currentPage = parseInt(localStorage.getItem('currentPage')) || 0;
    setCurrentPageState(currentPage);
  }, []);

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const products = data.allProducts;

  const productsPerPage = 12;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const renderProducts = () => {
  const startIndex = currentPageState * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const filteredProducts = selectedCategory
  ? products.filter(product => product.category === selectedCategory)
  : products;

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return currentProducts.map((product) => (
      <Link href={`/product/${product.id}`} key={product.id}>
        <Box
          key={product.id}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
        >
          <Image src={product.image_url} alt={product.name} />
          <Box p="4">
            <Heading size="sm" fontWeight="light" fontFamily='brand' pb='2'>{product.name}</Heading>
            <hr></hr>
            <Flex direction='row' justify='space-between' alignItems='center' mt='2'>
              <Text fontSize="md" fontWeight="bold" color="black">
                R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,})}
              </Text>
              <Button color='black' size="xs" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                Adicionar ao Carrinho
              </Button>
            </Flex>
          </Box>
        </Box>
      </Link>
    ));
  };

  
  const handlePageChange = ({ selected }) => {
    setCurrentPageState(selected);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPageState(0);
  };

  return (
    <HStack w="full" justify="center" bg='#f0f0f5' pt='8'>
      <Flex direction="column" alignItems="flex-start" spacing={4} align="center" maxW='container.xl' px='4'>
        <Flex w="full" direction="row" alignItems="center" pb='4' justify="space-between">
          <HStack>
            <Button
              variant="ghost" 
              minW='auto'
              color='#737380'
              borderRadius={ 0 }
              borderBottom={selectedCategory === null ? '4px solid orange' : 'none'}
              _hover={{
                borderBottom: '4px solid orange',
              }}
              _active={{
                bg: 'ghost !important',
                color: 'black !important',
                fontWeight: 'black !important',
              }}
              _focus={{
                bg: 'ghost !important',
                color: 'black !important',
                fontWeight: 'black !important',
              }}
              onClick={() => handleCategoryChange(null)}
            > 
              TODOS OS PRODUTOS
            </Button>

            <Button
              variant="ghost" 
              minW='auto'
              color='#737380'
              borderRadius={ 0 }
              borderBottom={selectedCategory === 'mugs' ? '4px solid orange' : 'none'}
              _hover={{
                borderBottom: '4px solid orange',
              }}
              _active={{
                bg: 'ghost',
                color: 'black',
                fontWeight: 'black',
              }}
              _focus={{
                bg: 'ghost',
                color: 'black',
                fontWeight: 'black',
              }}
              onClick={() => handleCategoryChange('mugs')}
            > 
              CANECAS
            </Button>

            <Button
              variant="ghost" 
              minW='auto'
              color='#737380'
              borderRadius={ 0 }
              borderBottom={selectedCategory === 't-shirts' ? '4px solid orange' : 'none'}
              _hover={{
                borderBottom: '4px solid orange',
              }}
              _active={{
                bg: 'ghost',
                color: 'black',
                fontWeight: 'black',
              }}
              _focus={{
                bg: 'ghost',
                color: 'black',
                fontWeight: 'black',
              }}
              onClick={() => handleCategoryChange('t-shirts')}
            > 
              T-SHIRTS
            </Button>
          </HStack>
          <HStack>
            <Flex direction="row" alignItems="center" mr='-2'>
              <OrderBy />
            </Flex>
          </HStack>  
        </Flex>      
        <Flex direction='row' w='full'justify='end' pb='8'>
          <HStack>
            <Box>  
              <Paginate
                pageCount={pageCount}
                currentPageState={currentPageState}
                handlePageChange={handlePageChange}
                previousClassName='previousNum'
                nextClassName='nextNum'
              />
            </Box>
            <Box ml='2'>
              <Paginate
                pageCount={pageCount}
                currentPageState={currentPageState}
                handlePageChange={handlePageChange}
                pageClassName={'numbers'}
              />
            </Box>
          </HStack>
        </Flex> 

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridGap="4">
          {renderProducts()}
        </Box>
      
        <Flex direction='row' w='full'justify='end' pt='16' pb='6'>
          <HStack>
            <Box>  
              <Paginate
                pageCount={pageCount}
                currentPageState={currentPageState}
                handlePageChange={handlePageChange}
                previousClassName='previousNum'
                nextClassName='nextNum'
              />
            </Box>
            <Box ml='2'>
              <Paginate
                pageCount={pageCount}
                currentPageState={currentPageState}
                handlePageChange={handlePageChange}
                pageClassName={'numbers'}
              />
            </Box>
          </HStack>
        </Flex> 
      </Flex>
    </HStack>
  );
};

export default Test;