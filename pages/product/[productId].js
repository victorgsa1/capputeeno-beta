import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Test from '../test';
import { Image } from '@chakra-ui/react';

function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query; 

  return (
    <div>
      <Header/>
    </div>
  );
}

export default ProductDetails;