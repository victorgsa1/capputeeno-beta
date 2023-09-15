import React from 'react';
import { Image, Grid, HStack, Icon, Badge, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Search from "../Search/Search";
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from "../Cart/CartContext";

export default function Header() {
    
    const { cartItemCount } = useCart();
    return (
        <HStack w="full" h={['14vh',' 12vh', '8vh']} bg='white' justify="center">
            <HStack w="full" maxW='container.xl' px="4" justify="space-between">
                <Grid templateColumns={['1fr', '1fr', '1fr', '4fr 12fr']} w='full'>
                    <Flex justify={[ 'center', 'center', 'start' ]} pb='4'>
                        <Link href={'/'}>
                            <Image src="/capputeeno.svg"></Image>
                        </Link>
                    </Flex>
                    <HStack flex="1" justify="flex-end" alignItems="center" spacing='12'>
                        <Search/>
                        <Link href={'/cart'}>
                            <Icon fontSize='2xl'>
                                <FiShoppingBag />
                            </Icon>
                            {cartItemCount > 0 && (
                                <Badge 
                                    borderRadius="full"
                                    bg="red.500"
                                    color="white"
                                    fontSize="xs"
                                    fontWeight="bold"
                                    px='6px'
                                    position="relative"
                                    top="10px"
                                    left="-10px"
                                >
                                    {cartItemCount}
                                </Badge>
                            )}
                        </Link>
                    </HStack>
                </Grid>
            </HStack>
        </HStack>
    )
}
