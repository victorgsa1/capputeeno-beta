// pages/_app.js
import { ApolloProvider } from '@apollo/client';
import client from '../client';
import {createGlobalStyle} from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Saira&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap');
   body {
    padding: 0;
    margin: 0;
  }
`;

function MyApp({ Component, pageProps }) {
  return ( 
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <GlobalStyles/>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider> 
  )
}

export default MyApp;