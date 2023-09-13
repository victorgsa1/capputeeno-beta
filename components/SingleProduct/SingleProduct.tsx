import React from 'react';
import { Box, Image, Heading, Text, Button, Flex, HStack, Grid, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi'
import Backward from '../Backward/Backward';

function SingleProduct({ product }) {
  return (
    <HStack w='full' justify="center" bg='#f0f0f5' pt='8'>
        <Flex direction="column" alignItems="flex-start" align="center" maxW='container.xl'>
            <Link href={`/`}>
                <Flex direction="row" justify="space-between" p="4">
                    <Backward />
                    <Text ml='2'>
                        Voltar
                    </Text>
                </Flex>
            </Link>
            <Flex direction='row' px="4" pt='4'>
                <Grid
                    templateColumns={['1fr', '1fr', '1fr', '6fr 3fr']} 
                    gap={4}
                >
                    <Box >
                        <Image src={product.image_url} alt={product.name} borderRadius='md' />
                    </Box>
                    <Box ml={['0', '-40']}>
                        <Flex direction='column' h='full'>    
                            <Text fontSize="md" fontWeight='400' color="gray.500" mb='2'>
                                Caneca
                            </Text>
                            <Heading size="lg" fontWeight="300" pb="2" color='gray.800'>
                                {product.name}
                            </Heading>
                            <Text fontSize="20px" fontWeight="600" color="black" mb='6'>
                                R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                })}
                            </Text>
                            <Text fontSize='sm' mb='16'>
                                *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.
                            </Text>
                            <Text fontSize="sm" color="gray.500" mt="2">
                                <Text textTransform="uppercase" fontSize='md' fontWeight='500' color='#737380'>Descrição</Text> {product.description}
                            </Text>
                            <Button 
                                bg='#115D8C' 
                                color='white' 
                                borderRadius='sm' 
                                size="sm" 
                                variant="solid" 
                                w='full' 
                                alignSelf='flex-end' 
                                mt='auto' 
                                h='10'
                                _hover={{
                                    bg: 'blue.800',
                                  }}
                            >
                                <Icon fontSize='22px' mr='2'>
                                    <FiShoppingBag />
                                </Icon>
                                <Text textTransform='uppercase' fontWeight='500' fontSize='16px'>
                                    Adicionar ao Carrinho
                                </Text>
                            </Button>
                        </Flex>
                    </Box>
                </Grid>
            </Flex>
        </Flex>
    </HStack>
  );
}

export default SingleProduct;