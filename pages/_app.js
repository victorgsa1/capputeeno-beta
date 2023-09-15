// pages/_app.js
import { ApolloProvider } from '@apollo/client';
import client from '../client';
import {createGlobalStyle} from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { CartProvider } from '../components/Cart/CartContext';
import { ProductProvider } from '../components/Product/ProductContext';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500&display=swap');
  * {
    font-family: 'Saira', sans-serif !important;
  } 
  body {
    background-color: #f0f0f5 !important;
    padding: 0;
    margin: 0;
  }
`;

function MyApp({ Component, pageProps }) {
  return ( 
    
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <ProductProvider>
          <CartProvider>
            <GlobalStyles/>
            <Component {...pageProps} />
          </CartProvider>
          </ProductProvider>
        </ApolloProvider>
      </ChakraProvider> 
  )
}

export default MyApp;