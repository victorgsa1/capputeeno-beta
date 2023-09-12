import { extendTheme } from '@chakra-ui/react'

const customTheme = {
    fonts: {
        brand: 'Saira, sans-serif',
    }
};

const theme = extendTheme(customTheme);

export default theme;