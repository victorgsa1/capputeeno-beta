import { Flex, Heading, Image, Text } from "@chakra-ui/react";

export function Header() {
    return (
        <Flex p="5" align="center" gap="3">
            <Image src="Icon.svg" color="gray.500" alt="Icone blob.g"/>
            <Flex direction="column">
                <Heading>blob.g</Heading>
                <Text>Noticias do Mundo bla bla</Text>
            </Flex>
        </Flex>
    )
}