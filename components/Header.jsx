import { Image, Flex } from "@chakra-ui/react";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
    return (
        <Flex ml='40' mr='40' p='4' bgColor='white' align='center' gap='4'>
            <Link href={'/'}>
                <Image src="capputeeno.svg"></Image>
            </Link>

            <Link href={'/search'}>Search</Link>
            
            <Link href={'/cart'}>Cart (0)</Link>
        </Flex>
    );
}
