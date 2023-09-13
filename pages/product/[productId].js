import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import { useQuery, gql } from '@apollo/client';

const GET_ALL_PRODUCTS = gql`
  query {
    allProducts {
      id
      name
      description
      image_url
      category
      price_in_cents
    }
  }
`;

function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query;

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const allProducts = data.allProducts;

  const selectedProduct = allProducts.find(product => product.id === productId);

  return (
    <>
      <Header />
      <SingleProduct product={selectedProduct} />
    </>
  );
}

export default ProductDetails;