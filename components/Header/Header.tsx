import React from "react";
import { Image, Flex, HStack, Icon, Badge } from "@chakra-ui/react";
import Link from "next/link";
import Search from "../Search/Search";
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from "../Cart/CartContext";

export default function Header() {
    const { cartItemCount } = useCart();
    return (
        <HStack w="full" h="8vh" bg='white' justify="center">
            <HStack w="full" maxW='container.xl' px="4" justify="space-between">
                <Link href={'/'}>
                    <Image src="/capputeeno.svg"></Image>
                </Link>
                <HStack flex="1" justify="flex-end" alignItems="center" spacing='12'>
                    <Search />
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
            </HStack>
        </HStack>
    )
}
