import { extendTheme } from '@chakra-ui/react'

const customTheme = {
    fonts: {
        brand: 'Saira, sans-serif',
    },
    color: {
        bgbrand: '#f0f0f5',
    }
};

const theme = extendTheme(customTheme);

export default theme;