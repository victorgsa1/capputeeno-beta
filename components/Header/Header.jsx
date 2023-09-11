import { Image, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import ChakraInput from "../Input/Input";

export default function Header() {
    return (
            <HStack w="full" h="10vh" justify="center">
                <HStack w="full" maxW="container.lg" px="4" justify="space-between">
                    <Link href={'/'}>
                        <Image src="capputeeno.svg"></Image>
                    </Link>
                    <ChakraInput/> 
                    <Link href={'/cart'}>Cart (0)</Link>
                </HStack>
            </HStack>
    )
}
