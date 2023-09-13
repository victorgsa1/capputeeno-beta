import React from 'react';
import { Box, Image, Heading, Text, Button, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';

function SingleProduct({ product }) {
  return (
    <HStack w='full' justify="center" bg='#f0f0f5' pt='8'>
        <Flex direction="column" alignItems="flex-start" align="center" maxW='container.xl'>
            <Flex direction="row">
                <HStack justify="space-between" p="4">
                    <Link href={`/`}>
                        <Button colorScheme="black" size="sm" variant="outline">
                            Voltar
                        </Button>
                    </Link>
                </HStack>
            </Flex>
            <Flex direction='row' px="4" pt='8'>
                    <Image src={product.image_url} alt={product.name} borderRadius='md'/>
                <Box ml='8'>
                    <Heading size="md" fontFamily="brand" fontWeight="light" pb="2">
                    {product.name}
                    </Heading>
                    <hr />
                    <Text fontSize="md" fontWeight="bold" color="black" pt="2">
                    R$ {(product.price_in_cents / 100).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        Categoria: {product.category}
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt="2">
                        Descrição: {product.description}
                    </Text>
                    <Button mt="4" colorScheme="black" size="sm" variant="outline">
                        Adicionar ao Carrinho
                    </Button>
                </Box>
            </Flex>
        </Flex>
    </HStack>
  );
}

export default SingleProduct;
