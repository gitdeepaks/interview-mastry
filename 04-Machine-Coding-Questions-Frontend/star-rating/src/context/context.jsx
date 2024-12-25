import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer, shoppingCartReducer } from "./reducer";

const ShoppingCart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, { products: [] });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
  });

  async function fetchProducts() {
    try {
      const response = await fetch("/products.json"); // Correct path to public directory
      const data = await response.json();
      if (data && data.products) {
        dispatch({
          type: "FETCH_PRODUCT",
          payload: data.products,
        });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to run only once

  return (
    <ShoppingCart.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};

export const ShoppingCartState = () => {
  return useContext(ShoppingCart);
};

export default Context;
