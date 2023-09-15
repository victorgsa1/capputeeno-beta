import React, { useState } from "react";
import { Image, Flex, HStack, Icon, Badge } from "@chakra-ui/react";
import Link from "next/link";
import Search from "../Search/Search";
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from "../Cart/CartContext";
import products from '../../pages/test'

export default function Header() {
    const { cartItemCount } = useCart();
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const handleSearch = (text) => {
        setSearchText(text);
      };
      
    const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
        )
    : [];
    return (
        <HStack w="full" h="8vh" bg='white' justify="center">
            <HStack w="full" maxW='container.xl' px="4" justify="space-between">
                <Link href={'/'}>
                    <Image src="/capputeeno.svg"></Image>
                </Link>
                <HStack flex="1" justify="flex-end" alignItems="center" spacing='12'>
                    <Search onSearch={handleSearch}  onSearchTextChange={handleSearchTextChange}/>
                    <ul>
                        {filteredProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
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
