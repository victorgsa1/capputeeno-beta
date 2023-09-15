import React, { createContext, useContext, useState } from 'react';
import ProductType from '../../pages/api/type';

  interface ProductContextType {
    products: ProductType[];
    setProducts: (products: ProductType[]) => void;
  }
  
  const ProductContext = createContext<ProductContextType | undefined>(undefined);
  

  export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext deve ser usado dentro de um ProductProvider');
    }
    return context;
  };


  export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
  
    const updateSearchResults = (results) => {
      setSearchResults(results);
    };
  
    const contextValue = {
      products,
      setProducts,
      searchResults,
      updateSearchResults,
    };
  
    return (
      <ProductContext.Provider value={contextValue}>
        {children}
      </ProductContext.Provider>
    );
  };