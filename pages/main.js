import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { Box, Heading, Text, Stack, Image, Button, HStack, Flex} from '@chakra-ui/react';
import OrderBy from '../components/OrderBy/OrderBy';
import Paginate from '../components/Paginate/Paginate';
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

const Main = () => {
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
  
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPageState, setCurrentPageState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setSortedProducts] = useState([]);

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

  const allProducts = data.allProducts;

  const productsPerPage = 12;
  const pageCount = Math.ceil(allProducts.length / productsPerPage);

  const renderProducts = () => {
    const startIndex = currentPageState * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    let sortedProductsToRender = [...allProducts];

    if (selectedSort === 'price_high_low') {
      sortedProductsToRender.sort((a, b) => b.price_in_cents - a.price_in_cents);
    } else if (selectedSort === 'price_low_high') {
      sortedProductsToRender.sort((a, b) => a.price_in_cents - b.price_in_cents);
    }
  
    const filteredProducts = selectedCategory
      ? sortedProductsToRender.filter(product => product.category === selectedCategory)
      : sortedProductsToRender;
  
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
    <HStack w="full" justify="center" bg='#f0f0f5' pt='8' overflowY='hidden'>
      <Flex w='full' maxW='container.xl' direction="column" alignItems="flex-start" spacing={4} align="center" px='4'>
        <Flex w="full" direction={['column', 'row', 'row',]} alignItems="center" pb='4' justify="space-between">
          <HStack w='full'>
            <Button
              variant="ghost" 
              color='#737380'
              borderRadius={ 0 }
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
              <Text fontSize={['sm', 'sm', 'md']} borderBottom={selectedCategory === null ? '4px solid orange' : 'none'} 
              _hover={{
                borderBottom: '4px solid orange',
              }}>
                TODOS OS PRODUTOS
              </Text>
            </Button>

            <Button
              variant="ghost" 
              minW='auto'
              color='#737380'
              borderRadius={ 0 }
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
              <Text fontSize={['sm', 'sm', 'md']} borderBottom={selectedCategory === 'mugs' ? '4px solid orange' : 'none'}
              _hover={{
                borderBottom: '4px solid orange',
              }}>
                CANECAS
              </Text>
            </Button>

            <Button
              variant="ghost" 
              minW='auto'
              color='#737380'
              borderRadius={ 0 }
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
              <Text fontSize={['sm', 'sm', 'md']} borderBottom={selectedCategory === 't-shirts' ? '4px solid orange' : 'none'}
              _hover={{
                borderBottom: '4px solid orange',
              }}>
                T-SHIRTS
              </Text>
            </Button>
          </HStack>
          <HStack w={['full', 'full', ' ', ' ']} justify={['start', 'flex-end', 'flex-end']}>
            <Flex direction="row"  mr='-2'>
              <OrderBy selectedSort={selectedSort} setSelectedSort={setSelectedSort} products={allProducts} setSortedProducts={setSortedProducts} />
            </Flex>
          </HStack>  
        </Flex>      
        <Flex direction='row' w='full' justify='end' pb='8'>
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

        <Box display="grid" gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gridGap="4" h='120vh' maxH='75vh' overflowY='auto'>
          {renderProducts()}
        </Box>
      </Flex>
    </HStack>
  );
};

export default Main;