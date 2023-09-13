import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    product(id: $productId) {
      id
      name
      description
      image_url
      price_in_cents
      category
    }
  }
`;

function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId },
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const product = data.product;

  return (
    <div>
      <Header />
      <SingleProduct product={product} />
    </div>
  );
}

export default ProductDetails;