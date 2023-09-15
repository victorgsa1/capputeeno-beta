import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
  updateHeader: () => void;
  updateCartItemCount: (newCount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const updateHeader = () => {
    // Calcule a contagem total de itens no carrinho
    const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // Atualize o estado do cabeçalho com a nova contagem
    setCartItemCount(totalItemCount);
  };

  const updateCartItemCount = (newCount: number) => {
    setCartItemCount(newCount);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount, updateHeader, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
