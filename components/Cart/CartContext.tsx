import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartItemCount: number;
  setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }) {
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
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
