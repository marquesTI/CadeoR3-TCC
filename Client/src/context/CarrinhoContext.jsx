import { createContext, useContext, useState, useEffect } from "react";

// Criação do contexto
const CarrinhoContext = createContext();

// Função para acessar o contexto
export const useCart = () => useContext(CarrinhoContext);

// Componente provedor do contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Inicializa o estado do carrinho a partir do localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Efeito para salvar o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CarrinhoContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
