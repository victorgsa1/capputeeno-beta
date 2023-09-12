import { Image, Flex, HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import ChakraInput from "../Input/Input";
import { FiShoppingBag } from 'react-icons/fi'

export default function Header() {
    return (
            <HStack w="full" h="10vh" justify="center">
                <HStack w="full" maxW='container.xl' px="4" justify="space-between">
                    <Link href={'/'}>
                        <Image src="capputeeno.svg"></Image>
                    </Link>
                    <HStack flex="1" justify="flex-end" alignItems="center" spacing='12'>
                        <ChakraInput w="full" />
                        <Link href={'/cart'}>
                            <Icon fontSize='2xl'>
                            <FiShoppingBag />
                            </Icon>
                        </Link>
                    </HStack>
                </HStack>
            </HStack>
    )
}