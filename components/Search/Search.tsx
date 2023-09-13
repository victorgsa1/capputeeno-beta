import React from 'react'
import { FormControl, InputGroupProps, Input, FormHelperText, Image, InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

export default function Search() {
  return (
    <FormControl maxW="460px" w="full">
      <InputGroup maxW="460px">
        <InputRightElement pointerEvents='none'>
          <Icon fontSize='2xl'>
            <FiSearch/>
          </Icon>
        </InputRightElement>
      <Input 
        type='text' 
        focusBorderColor='gray.100'
        variant='filled'
        borderRadius="md"
        placeholder='Procurando por algo específico?'
        _placeholder={{ fontSize: "14px",}}  
      />
      </InputGroup>
    </FormControl>
  )
}
